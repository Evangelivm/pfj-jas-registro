import { conn } from "@/app/libs/mysql";

// Crea un manejador de eventos SSE para enviar actualizaciones a los clientes
export default function handler(req, res) {
  // Establece el tipo de contenido como text/event-stream
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  // Realiza una consulta a la base de datos cada segundo y envía los resultados a los clientes
  const data = setInterval(() => {
    conn.query(
      "SELECT a.compañia, SUM( CASE WHEN b.participacion = 3 THEN 1 ELSE 0 END ) AS confirmados, SUM( CASE WHEN b.participacion = 2 THEN 1 ELSE 0 END ) AS contactados, SUM( CASE WHEN b.participacion = 1 THEN 1 ELSE 0 END ) AS cancelados, COUNT(*) AS total FROM participante a JOIN asistencia b ON a.id_part = b.id_part WHERE a.tipo = 'participante' GROUP BY a.compañia;",
      (error, results) => {
        if (error) {
          console.error(error);
          return;
        }
        // Envía los resultados a los clientes
        res.write(`data: ${JSON.stringify(results)}\n\n`);
      }
    );
  }, 1000);

  // Maneja el cierre de la conexión
  req.on("close", () => {
    clearInterval(data);
    console.log("La conexión SSE se ha cerrado");
  });
}
