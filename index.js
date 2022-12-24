const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
app.use(cors({ origin: true, credentials: true }));
var cookies = require("cookie-parser");

app.use(cookies());
mongoose.connect(
  "mongodb+srv://admin-ak:test123@cluster0.bvj44.mongodb.net/amazonDB",
  { useNewUrlParser: true }
);

const usercartSchema = {
  producttitle: String,
  quantity: Number,
  price: Number,
};

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  mycart: [usercartSchema],
});

//hashing
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
  }
  next();
});

//jwt token
userSchema.methods.generateAuthToken = async function () {
  try {
    let token = jwt.sign({ _id: this.id }, "mynameisankitkumarsinghnitpatna");

    return token;
  } catch (err) {}
};

const User = new mongoose.model("User", userSchema);
const Usercart = new mongoose.model("Usercart", usercartSchema);

const authenticate = async (req, res, next) => {
  const token = req.get("Authorization");

  const verifyToken = jwt.verify(token, "mynameisankitkumarsinghnitpatna");

  const founduser = await User.findOne({ _id: verifyToken._id });
  if (!founduser) {
    res.status(401).json({ message: "unauthenticated user" });
  } else {
    req.user = founduser;
    next();
  }
};

app.get("/userdata", authenticate, async (req, res) => {
  res.status(200).json({ username: req.user.name });
});

app.get("/usercartdata", authenticate, async (req, res) => {
  res.status(200).json({ user: req.user });
});

app.post("/usercartupdate", authenticate, async (req, res) => {
  const producttitle = req.body.prodname;
  const quantity = req.body.prodquantity;
  const price = req.body.prodprice;

  const user = req.user;
  const cart = req.user.mycart;

  const got = cart.filter((i) => i.producttitle == producttitle);
  if (got.length != 0) {
    res.status(422).json({ message: "Already exists" });
  } else {
    const item = new Usercart({ producttitle, price, quantity });
    cart.push(item);
    user.mycart = cart;
    await user
      .save()
      .then(() => {
        res.status(200).json({ message: "success" });
      })
      .catch((err) => {});
  }
});

app.post("/usercartdelete", authenticate, async (req, res) => {
  const producttitle = req.body.prodname;

  const user = req.user;
  const cart = req.user.mycart;

  const got = cart.filter((i) => i.producttitle != producttitle);
  user.mycart = got;
  await user
    .save()
    .then(() => {
      res.status(200).json({ message: "success" });
    })
    .catch((err) => {});
});

app.post("/userregistration", (req, res) => {
  const name = req.body.Newusername;
  const email = req.body.Newusermail;
  const password = req.body.Newuserpassword;

  User.findOne({ email: email })
    .then((userExist) => {
      if (userExist) {
        return res.status(422).json({ error: "Already exists" });
      }
      const user = new User({ name, email, password });

      user
        .save()
        .then(() => {
          res.status(200).json({ message: "success" });
        })
        .catch((err) => {
          res.status(500).json({ error: "failed" });
        });
    })
    .catch((err) => {});
});

app.post("/userlogin", async (req, res) => {
  const email = req.body.Usermail;
  const password = req.body.Userpassword;

  try {
    const userLogin = await User.findOne({ email: email });

    if (userLogin) {
      const isMatch = await bcrypt.compare(password, userLogin.password);

      let token = await userLogin.generateAuthToken();
      //console.log(token);

      if (!isMatch) {
        res.status(400).json({ error: "Invalid cred" });
      } else {
        res.status(200).json({ message: "success", token: token });
      }
    } else {
      res.status(422).json({ error: "Invalid cred" });
    }
  } catch (err) {}
});

//authenticate
if (process.env.NODE_ENV == "production") {
  app.use(express.static("client/build"));

  const path = require("path");

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

let port = process.env.PORT || 5000;

app.listen(port, function () {
  console.log("Server started successfully");
});
