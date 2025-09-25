const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const productsRoute = require("./routes/products");
const ordersRoute = require("./routes/orders");

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req, res) => res.send("Server is Running"));

app.use("/api/products", productsRoute);
app.use("/api/orders", ordersRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Sever  running on http://localhost:${PORT}`)
);
