const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const movieRoute = require("./routes/movies");
const listRoute = require("./routes/lists");
const cors = require('cors');

const port  = 8800

dotenv.config();
app.use(cors()); 

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
  })
  .then(() => console.log("DB Connection Successfull"))
  .catch((err) => {
    console.error(err);
  });

app.use(express.json());

app.use("/auth", authRoute);
app.use("/users", userRoute);
app.use("/movies", movieRoute);
app.use("/lists", listRoute);

app.get('/',(req,res)=>{
  res.send("Hello World ji kaise ho saare!!");
})

app.listen(port, () => {
  console.log(`Backend server is running ${port}!`);
});
