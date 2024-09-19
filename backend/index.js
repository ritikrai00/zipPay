const express = require("express");
const cors=require("cors")
const app = express();
app.use(cors())
app.use(express.json())

const {router, router2}=require("./routes/index");

app.use("/api/v1", router)
app.use("/api/v1", router2)

app.listen(3000)



