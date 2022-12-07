const db = require("../models");
const Permissions = db.permissions;

exports.create = (req, res) => {
  const { user_id, permissions } = req.body;
  const userPermission = {
    permissions,
    permissionId: user_id,
  };

  Permissions.create(userPermission)
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
