import express from "express";
import userController from "../controllers/userController";
import homeController from "../controllers/homeController";

let router = express.Router();

let initWebRoutes = (app) => {
  router.get("/", homeController.getHomePage);
  router.get("/about", homeController.getAboutPage);

  // API create new user
  router.get("/crud", homeController.getCRUD);
  router.post("/post-crud", homeController.postCRUD);

  //API read user
  router.get("/get-crud", homeController.displayGetCRUD);

  //API update user
  router.get("/edit-crud", homeController.getEditCRUD);
  router.post("/put-crud", homeController.putCRUD);

  //API delete user
  router.get("/delete-crud", homeController.deleteCRUD);

  router.post("/api/login", userController.handleLogin);
  router.get("/api/get-all-users", userController.handleGetAllUsers);

  router.post("/api/create-new-user", userController.handleCreateNewUser);
  router.put("/api/edit-user", userController.handleEditUser);
  router.post("/api/delete-user", userController.handleDeleteUser);

  return app.use("/", router);
};

module.exports = initWebRoutes;
