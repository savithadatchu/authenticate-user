const db = require("../models");
const Roles = db.roles;

exports.create = (req, res) => {
  const { user_id, type } = req.body;
  const userrole = {
    type,
    roleId: user_id,
  };

  Roles.create(userrole)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message,
      });
    });
};
