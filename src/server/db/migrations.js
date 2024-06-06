const { Client } = require("pg");
const { config } = require("dotenv");

config();

async function migrations() {
  const client = new Client({
    connectionString: process.env.CONNECTION_STRING,
  });

  try {
    console.log("Creating tables...");

    // Tables
    const users = `
              CREATE TABLE users(
                id serial PRIMARY KEY,
                email text,
                password text
              );
            `;

    const art_works = `
              CREATE TABLE art_works (
                id serial PRIMARY KEY,
                id_original text,
                link text,
                title text,
                principal_or_first_maker text,
                image_url text,
                user_id integer REFERENCES users(id)
              );
            `;

    await client.connect();

    await client.query(users);
    await client.query(art_works);

    console.log("Successfully created tables");
  } catch (error) {
    console.log("Error creating tables", error);
  } finally {
    await client.end();
  }
}

migrations();
