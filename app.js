
const express = require("express");
const postRoutes = require("./routes/post.routes");
const applicationRoutes = require("./routes/application.routes");
const mongoose = require("mongoose");
const app = express();
const {db} = require("./db/client")

app.use(express.json());

mongoose
    .connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("database connected");
})
.catch((err)=>{
    console.log(err);
});

app.use("/api/applications", applicationRoutes);
app.use("/api/posts", postRoutes);


app.post("/users", async (req, res) => {
  const { name, email } = req.body;
  const result = await db.insert(users).values({ name, email }).returning();
  res.status(201).json(result[0]);
});


app.listen(process.env.PORT,()=>{
    console.log('listening...');
});