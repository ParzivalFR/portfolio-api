const express = require("express");
const router = express.Router();

const projectsCtrl = require("../controllers/projects.controllers");

const auth = require("../middlewares/auth.middlewares");
const { uploadImages } = require("../middlewares/multer.middlewares");

router.post("/", auth, uploadImages, projectsCtrl.createProject);
router.get("/", projectsCtrl.getAllProjects);
// router.delete("/", auth, projectsCtrl.deleteAllProjects);
router.get("/:id", projectsCtrl.getOneProject);
router.put("/:id", auth, uploadImages, projectsCtrl.updateProject);
router.delete("/:id", auth, projectsCtrl.deleteProject);

module.exports = router;
