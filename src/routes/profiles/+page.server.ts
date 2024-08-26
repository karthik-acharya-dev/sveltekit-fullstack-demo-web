// import { error } from '@sveltejs/kit';
import { createPool, sql } from '@vercel/postgres'
import { POSTGRES_URL } from '$env/static/private'

export async function load() {
  const db = createPool({ connectionString: POSTGRES_URL })

  try {
    const { rows: names } = await db.query('SELECT * FROM names order by id')
    return {
      names: names,
    }
  } catch (error) {
      console.log(
        'Table does not exist, creating and seeding it with dummy data now...'
      )
      // Table is not created yet
      await seed()
      const { rows: names } = await db.query('SELECT * FROM names order by id')
      return {
        users: names
      }
    } 
}

async function seed() {
  const db = createPool({ connectionString: POSTGRES_URL })
  const client = await db.connect();
  const createTable = await client.sql`CREATE TABLE IF NOT EXISTS names (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL,
      "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
    `

  console.log(`Created "users" table`)

  const users = await Promise.all([
    client.sql`
          INSERT INTO names (name, email)
          VALUES ('Rohan', 'rohan@tcl.com')
          ON CONFLICT (email) DO NOTHING;
      `,
    client.sql`
          INSERT INTO names (name, email, image)
          VALUES ('Rebecca', 'rebecca@tcl.com')
          ON CONFLICT (email) DO NOTHING;
      `,
    client.sql`
          INSERT INTO names (name, email, image)
          VALUES ('Vivek', 'vivek@gmail.com')
          ON CONFLICT (email) DO NOTHING;
      `,
  ])
  console.log(`Seeded ${users.length} users`)

  return {
    createTable,
    users,
  }
}

async function updateUser(user: { id: any; name: any; email: any }) {
    console.log('user', user);
    const db = createPool({ connectionString: POSTGRES_URL })
    const client = await db.connect();

    const result = await client.sql`UPDATE names SET name = ${user.name}, email = ${user.email} WHERE id = ${user.id}`

    return {
      result
    }
}

/** @type {import('./$types').Actions} */
export const actions = {
	
  update: async ({ request }) => {
    const req = await request.formData();

    const id = req.get('id');
    const name = req.get('name');
    const email = req.get('email');

    const data = {
      id, name, email
    }

    let updateRes = {
      error : false, email : email, name, messsage : ''
    }

    try {
      const res = await updateUser(data);
      console.log('api request ran');
      console.log(res);


    } catch (error) {
        console.log('api request errored');
        console.log(error)
        updateRes.error = true;
        updateRes.messsage = (error as Error).message;
    }finally{
      return updateRes
    }
	},

  delete: async ({ request }) => {
    const data = await request.formData();
    const db = createPool({ connectionString: POSTGRES_URL })
    const client = await db.connect();

    const id = String(data.get('id'));

    const deleteUser = await client.sql`
    DELETE FROM names
    WHERE id = ${id};`
	
		return { deleted: true };
	},

	create: async ({request}) => {
		const data = await request.formData();
    const db = createPool({ connectionString: POSTGRES_URL })
    const client = await db.connect();

    const email = data.get('email');
		const name = data.get('name');

    const createUser = await client.sql`
          INSERT INTO names (name, email)
          VALUES (${String(name)}, ${String(email)})
          ON CONFLICT (email) DO NOTHING;
        `
    return { success: true };
	}
};