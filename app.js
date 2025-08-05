
const express = require("express");
const postRoutes = require("./routes/post.routes");
const applicationRoutes = require("./routes/application.routes");
const mongoose = require("mongoose");
const app = express();

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


app.listen(process.env.PORT,()=>{
    console.log('listening...');
});