const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const movieRoute = require("./routes/movies");
const listRoute = require("./routes/lists");

const port = process.env.PORT || 4000;

dotenv.config();

const corsOptions = {
    origin: 'https://yogeshrajawat.netlify.app', // Allow frontend origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allowed methods
    credentials: true, // Allow cookies/auth headers
    allowedHeaders: 'Content-Type,Authorization', // Allowed headers
};

app.use(cors(corsOptions)); // Enable CORS with options
app.options('*', cors(corsOptions)); // Handle preflight requests

mongoose
    .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
    })
    .then(() => console.log("DB Connection Successful"))
    .catch((err) => {
        console.error(err);
    });

app.use(express.json());

app.use("/auth", authRoute);
app.use("/users", userRoute);
app.use("/movies", movieRoute);
app.use("/lists", listRoute);

app.get("/", (req, res) => {
    res.send("Hello World ji kaise ho saare!!");
});

app.listen(8800, () => {
    console.log(`Backend server is running on port 8800`);
});
