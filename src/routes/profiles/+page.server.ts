import { createPool } from '@vercel/postgres';
import { POSTGRES_URL } from '$env/static/private';

const db = createPool({ connectionString: POSTGRES_URL });

export async function load() {
  try {
    const { rows: names } = await db.query('SELECT * FROM names');
    return {
      names: names,
    };
  } catch (error) {
    console.log('Table does not exist, creating and seeding it with dummy data now...');
    await seed();
    const { rows: names } = await db.query('SELECT * FROM names');
    return {
      names: names,
    };
  }
}

async function seed() {
  const client = await db.connect();
  await client.sql`
    CREATE TABLE IF NOT EXISTS names (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL,
      "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
  `;
  console.log(`Created "users" table`);

  const users = await Promise.all([
    client.sql`INSERT INTO names (name, email) VALUES ('Rohan', 'rohan@tcl.com') ON CONFLICT (email) DO NOTHING;`,
    client.sql`INSERT INTO names (name, email) VALUES ('Rebecca', 'rebecca@tcl.com') ON CONFLICT (email) DO NOTHING;`,
    client.sql`INSERT INTO names (name, email) VALUES ('Vivek', 'vivek@gmail.com') ON CONFLICT (email) DO NOTHING;`,
  ]);
  console.log(`Seeded ${users.length} users`);

  return { users };
}

export const actions = {
  delete: async ({ request }) => {
    const data = await request.formData();
    const id = data.get('id');

    try {
      await db.query`DELETE FROM names WHERE id = ${id};`;
      return { success: true };
    } catch (error) {
      return { error: 'Failed to delete user' };
    }
  },

  create: async ({ request }) => {
    const data = await request.formData();
    const name = data.get('name');
    const email = data.get('email');

    try {
      await db.query`
        INSERT INTO names (name, email)
        VALUES (${name}, ${email})
        ON CONFLICT (email) DO NOTHING;
      `;
      return { success: true };
    } catch (error) {
      return { error: 'Failed to create user' };
    }
  }
};
