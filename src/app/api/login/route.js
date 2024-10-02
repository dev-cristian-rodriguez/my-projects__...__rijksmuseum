import { Client } from "pg";

export async function POST(request) {
  const client = new Client({
    connectionString: `${process.env.CONNECTION_STRING}`,
  });

  const requestBody = await request.json();

  try {
    await client.connect();

    const user = await client.query("SELECT * FROM users WHERE email = $1", [
      requestBody.email,
    ]);

    if (user.rowCount === 0) {
      await client.query(`INSERT INTO users(email, password) VALUES ($1, $2)`, [
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
