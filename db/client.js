const { drizzle } =  require("drizzle-orm/node-postgres");
const { Pool } =  require("pg");
const schema =  require("./schema");

const pool = new Pool({
  connectionString: "postgres://postgres:database123@localhost:5432/postgres",
});


const db = drizzle(pool, { schema });

module.exports = {db,pool};
