const { pgTable, serial, text, timestamp } = require("drizzle-orm/pg-core");

const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  password:text("password"),
  createdAt: timestamp("created_at").defaultNow(),
});




module.exports = {users}