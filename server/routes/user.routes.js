const express = require("express");
const Router = express.Router();
const userController = require("../controllers/user.controller");
const validateInput = require("../middleware/validation.middleware");
const {userRegisterSchema , userLoginSchema} = require("../utils/validation/user.validation");
Router.route("/register").post(validateInput(userRegisterSchema) , userController.register);
Router.route("/login").post(validateInput(userLoginSchema) , userController.login);
Router.route("/me").get(userController.currentUser);
Router.route("/logout").get(userController.logOut);
module.exports = Router