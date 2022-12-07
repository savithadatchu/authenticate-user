const db = require("../models");
const User = db.users;
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const privateKey = "0a6b944d-d2fb-46fc-a85e-0295c986cd9f";

exports.create = (req, res) => {
  const { password, email } = req.body;

  const hash = bcrypt.hashSync(password, saltRounds);

  const user = {
    password: hash,
    email
  };

  User.create(user)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ,
      });
    });
};

exports.signIn = (req, res) => {
  const { email, password } = req.body;

  User.findOne({ where: { email: email }, include: ["role","permission"] })
    .then((data) => {
      console.log(data)
      if (data?.password) {
        let password_hash = data.password;
        let password_validation = bcrypt.compareSync(password, password_hash);
        if (password_validation) {
          const token = jwt.sign(
            { user_id: data.id, role: data?.role?.type, permission: data?.permission?.permissions },
            privateKey,
            { algorithm: "HS256" }
          );
          res.statusCode = 200;
          res.json({ token });
        } else {
          res.status(401).send({
            message:
              "Invalid Password",
          });
        }
      }else{
        res.status(401).send({
          message:
            "Invalid Email",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message,
      });
    });
};
