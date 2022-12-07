module.exports = app => {
    const roles = require("../controllers/roles.controller.js");
  
    const router = require("express").Router();
  
    router.post("/create", roles.create);

  
    app.use('/api/roles', router);
  };
  