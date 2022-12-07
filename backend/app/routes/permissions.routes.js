module.exports = app => {
    const permissions = require("../controllers/permissions.controller.js");
  
    const router = require("express").Router();
  
    router.post("/create", permissions.create);

  
    app.use('/api/permissions', router);
  };
  