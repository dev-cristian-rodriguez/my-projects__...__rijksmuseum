import { Client } from "pg";

export async function POST(request) {
  const client = new Client({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
  });

  const requestBody = await request.json();

  try {
    await client.connect();

    const user = await client.query("SELECT * FROM users WHERE email = $1", [
      requestBody.email,
    ]);


    if (user.rowCount === 0) {
      await client.query(`INSERt INTO users(email, password) VALUES ($1, $2)`, [
        requestBody.email,
        requestBody.password,
      ]);
      return Response.json({
        status: "fulfilled",
      });
    } else {
      return Response.json({
        status: "fulfilled",
      });
    }
  } catch (error) {
    return Response.json({ error: error.message });
  } finally {
    await client.end();
  }
}
