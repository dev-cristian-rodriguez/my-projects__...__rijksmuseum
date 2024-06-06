import { Client } from "pg";

export async function GET(request) {
  const client = new Client({
    connectionString: process.env.CONNECTION_STRING,
  });

  try {
    await client.connect();

    const requestParams = new URL(request.url).searchParams;
    const email = requestParams.get("email");

    const user = await client.query(`SELECT * FROM users WHERE email = $1`, [
      email,
    ]);

    const getArtworks = await client.query(
      `SELECT * FROM art_works WHERE user_id = $1`,
      [user.rows[0].id]
    );

    return Response.json({ status: "fulfilled", result: getArtworks.rows });
  } catch (error) {
    return Response.json({ status: "rejected", message: error.message });
  } finally {
    await client.end();
  }
}

export async function POST(request) {
  const client = new Client({
    connectionString: process.env.CONNECTION_STRING,
  });

  const requestBody = await request.json();

  try {
    await client.connect();

    const user = await client.query("SELECT * FROM users WHERE email = $1", [
      requestBody.email,
    ]);

    const getArtworksOfUser = await client.query(
      `SELECT * FROM art_works WHERE user_id = $1`,
      [user.rows[0].id]
    );

    const values = [
      requestBody.id_original,
      requestBody.link,
      requestBody.title,
      requestBody.principal_or_first_maker,
      requestBody.image_url,
      user.rows[0].id,
    ];

    if (getArtworksOfUser.rowCount === 0) {
      await client.query(
        `INSERT INTO art_works(id_original, link, title, principal_or_first_maker, image_url, user_id) VALUES ($1, $2, $3, $4, $5, $6)`,
        values
      );
      return Response.json({
        status: "fulfilled",
        message: "First artwork created",
      });
    } else {
      const artWorkAlreadyExists = await client.query(
        `SELECT * FROM art_works WHERE id_original = $1 AND user_id = $2`,
        [requestBody.id_original, user.rows[0].id]
      );
      if (!artWorkAlreadyExists.rowCount) {
        await client.query(
          `INSERT INTO art_works(id_original, link, title, principal_or_first_maker, image_url, user_id) VALUES ($1, $2, $3, $4, $5, $6)`,
          values
        );
        return Response.json({
          status: "fulfilled",
          message: "Artwork created",
        });
      } else {
        return Response.json({
          status: "rejected",
          message: "Artwork already exists",
        });
      }
    }
  } catch (error) {
    return Response.json({ status: "rejected", message: error.message });
  } finally {
    await client.end();
  }
}

export async function DELETE(request) {
  const client = new Client({
    connectionString: process.env.CONNECTION_STRING,
  });

  try {
    await client.connect();

    const requestParams = new URL(request.url).searchParams;
    const email = requestParams.get("email");
    const art_work_id = requestParams.get("art_work_id");

    const user = await client.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    await client.query(
      `DELETE FROM art_works WHERE id_original = $1 AND user_id = $2`,
      [art_work_id, user.rows[0].id]
    );

    return Response.json({ status: "fulfilled", message: "Artwork deleted" });
  } catch (error) {
    return Response.json({ status: "rejected", message: error.message });
  } finally {
    await client.end();
  }
}
