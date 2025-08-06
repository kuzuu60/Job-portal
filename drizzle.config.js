const { defineConfig } = require("drizzle-kit");
const dotenv = require("dotenv");

dotenv.config();

module.exports = defineConfig({
  schema: "./db/schema.js",
  out: "./migration",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
});
