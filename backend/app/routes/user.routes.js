module.exports = app => {
    const user = require("../controllers/user.controller.js");
  
    const router = require("express").Router();
  
    router.post("/create", user.create);
  
    router.post("/signIn", user.signIn);
  
    app.use('/api/user', router);
  };
  