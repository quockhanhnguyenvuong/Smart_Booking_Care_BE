import express from "express";
import userController from "../controllers/userController";
import homeController from "../controllers/homeController";
import doctorController from "../controllers/doctorController";
import specialtyController from "../controllers/specialtyController";

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
  router.delete("/api/delete-user", userController.handleDeleteUser);

  router.get("/allcode", userController.getAllCode);
  router.get("/api/top-doctor-home", doctorController.getTopDoctorHome);

  router.get("/api/get-all-doctors", doctorController.getAllDoctors);
  router.post("/api/save-infor-doctors", doctorController.postInforDoctors);
  router.get("/api/get-detail-doctors", doctorController.getDetailDoctorById);

  router.post("/api/create-new-specialty", specialtyController.createSpecialty);
  router.get("/api/get-specialty", specialtyController.getAllSpecialty);

  return app.use("/", router);
};

module.exports = initWebRoutes;
