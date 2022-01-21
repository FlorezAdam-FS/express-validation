"use strict";

const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const request = require("request");

const router = express.Router();
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.engine("ejs", require("ejs").__express);

router.get("/", (req, res) => {
  res.render("index", { pagename: "index" });
});
router.get("/login", (req, res) => {
  res.render("login", { pagename: "login" });
});
router.get("/signup", (req, res) => {
  res.render("signup", { pagename: "signup" });
});
router.get("/about", (req, res) => {
  res.render("about", { pagename: "about" });
});
router.get("/projects", (req, res) => {
  res.render("projects", { pagename: "projects" });
});

router.post("/login", (req, res) => {
  let errors = [];
  // Validate Email
  if (req.body.email.trim() == "") {
    errors.push("email cannot be blank!");
  }
  // Validate Password
  if (req.body.password.trim() == "") {
    errors.push("password cannot be blank!");
  }
  // Validate Email format
  if (!/[a-z0-9]+@[a-z]+\.[a-z]{2,3}/.test(req.body.email)) {
    errors.push("email format is incorrect!");
  }
  if (
    !/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/.test(
      req.body.password
    )
  ) {
    errors.push("password format is incorrect!");
  }
  console.log(errors);

  res.render("index", { pagename: "index", errs: errors });
});

router.post("/signup", (req, res) => {
  let errors = [];
  console.log(req.body);
  // First Name
  if (req.body.firstName.trim() == "") {
    errors.push("First name cannot be blank");
  }
  if (!/^[a-zA-Z]+$/g.test(req.body.firstName.trim())) {
    errors.push("First name must consist of letters only!");
  }
  // Last Name
  if (req.body.lastName.trim() == "") {
    errors.push("Last name cannot be blank");
  }
  if (!/^[a-zA-Z]+$/g.test(req.body.lastName.trim())) {
    errors.push("Last name must consist of letters only!");
  }
  // Validate Email
  if (req.body.email.trim() == "") {
    errors.push("email cannot be blank!");
  }
  // Validate Password
  if (req.body.password.trim() == "") {
    errors.push("password cannot be blank!");
  }
  // Validate Email format
  if (!/[a-z0-9]+@[a-z]+\.[a-z]{2,3}/.test(req.body.email)) {
    errors.push("email format is incorrect!");
  }
  if (
    !/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/.test(
      req.body.password
    )
  ) {
    errors.push("password format is incorrect!");
  }
  // City
  if (req.body.city.trim() == "") {
    errors.push("City cannot be blank");
  }
  if (!/^[a-zA-Z]+$/g.test(req.body.city.trim())) {
    errors.push("City must consist of letters only!");
  }
  // State
  if (req.body.state.trim() == "") {
    errors.push("State cannot be blank");
  }
  if (!/^[a-zA-Z]+$/g.test(req.body.state.trim())) {
    errors.push("State must consist of letters only!");
  }
  // Zip
  if (req.body.zip.trim() == "") {
    errors.push("Zip cannot be blank");
  }
  if (!/\d{5}/.test(req.body.zip.trim())) {
    errors.push("Zip code cannot be more or less than 5 digits. Numbers only!");
  }
  // Age
  if (req.body.age.trim() == "") {
    errors.push("Age cannot be blank");
  }
  // Consent
  if (req.body.consent == undefined) {
    errors.push("Please check that you consented");
  }
  // Bio
  if (req.body.bio.trim() == "") {
    errors.push("Bio must not be empty");
  }

  console.log(errors);
  console.log(errors.length);
  console.log(req.body.firstName.length);

  res.render("index", {
    pagename: "index",
    errs: errors,
    name: req.body.firstName,
    gender: req.body.gender,
  });
});

app.use(express.static("views"));
app.use("/", router);

let server = app.listen("8080", () => {
  console.log("Server running on port 8080");
});
