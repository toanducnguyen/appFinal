const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const app = express();
const port = 3001;

mongoose.connect("mongodb://127.0.0.1/exam-web64");

const orderModel = require("./Schema/order.schema")
const inventoriesModel = require("./Schema/inventories.schema");
const userModel = require("./Schema/user.schema")
const validateToken = require("./validateToken");

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

//2 + 3
app.get("/inventories", async (req, res) => {
  try {
    //const result = await inventoriesModel.find()
    const result = await inventoriesModel.find({ instock: { $lt: 100 } });
    res.send(result);
  } catch (error) {
    console.log(error);
  }
});

//4
app.post("/login", async (req, res) => {
  try {
    const findUser = await userModel.findOne({
      username: `${req.body.username}`,
      password: `${req.body.password}`,
    });
    if (findUser) {
      const token = jwt.sign(
        { username: `${findUser.username}`, id: `${findUser._id}` },
        "afjjsahjfhjkas"
      );
      findUser.token = token;
      findUser.save();
      res.send({ findUser: findUser, token: token });
    }
  } catch (error) {
    console.log(error);
  }
});

//5
app.get("/resource", validateToken, async (req, res) => {
  try {
    const result = await orderModel.find();
    res.send(result);
  } catch (error) {
    console.log(error);
  }
});

//6
app.get("/getorder/:id", async (req, res) => {
  try {
    const result = await orderModel.findById(Number(req.params.id));
    res.send(result);
  } catch (error) {
    console.log();
  }
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
