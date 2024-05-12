const Project = require("../models/projects.models");
const fs = require("fs");
const cloudinary = require("cloudinary").v2;

// Get all projects
exports.getAllProjects = (req, res) => {
  Project.find()
    .then((projects) => res.status(200).json(projects))
    .catch((error) => res.status(400).json({ error }));
};

// Get one project
exports.getOneProject = (req, res) => {
  Project.findOne({ _id: req.params.id })
    .then((project) => res.status(200).json(project))
    .catch((error) => res.status(404).json({ error }));
};

/// Create a project
exports.createProject = (req, res) => {
  if (!req.body.cover || !req.body.images)
    return res.status(400).json({ message: "Aucune image envoyée !" });
  if (!req.body.userId)
    return res.status(400).json({ message: "Aucun utilisateur trouvé !" });

  const project = new Project({
    ...req.body,
  });
  project
    .save()
    .then(() => res.status(201).json({ message: "Project created!" }))
    .catch((error) => res.status(400).json({ error }));
};

// Delete One Project
exports.deleteProject = (req, res) => {
  Project.findOne({ _id: req.params.id })
    .then((project) => {
      // Vérifiez si l'utilisateur qui fait la demande est le créateur du projet
      if (req.body.userId !== project.userId) {
        return res.status(403).json({ message: "Accès refusé !" });
      }

      const deleteImage = async (publicId) => {
        await cloudinary.uploader.destroy(publicId);
      };

      const coverPublicId = project.cover.split("/").pop().split(".")[0];
      deleteImage(coverPublicId);

      project.images.forEach((image) => {
        const imagePublicId = image.split("/").pop().split(".")[0];
        deleteImage(imagePublicId);
      });

      Project.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: "Project deleted!" }))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(404).json({ error }));
};

// Modify a project
exports.updateProject = (req, res) => {
  Project.findOne({ _id: req.params.id })
    .then((project) => {
      // Vérifiez si l'utilisateur qui fait la demande est le créateur du projet
      if (req.body.userId !== project.userId) {
        return res.status(403).json({ message: "Accès refusé !" });
      }

      const updateProject = async () => {
        await Project.updateOne({ _id: req.params.id }, { ...req.body });
        res.status(200).json({ message: "Project updated!" });
      };

      if (req.body.cover !== project.cover) {
        const deleteImage = async (publicId) => {
          await cloudinary.uploader.destroy(publicId);
        };

        const coverPublicId = project.cover.split("/").pop().split(".")[0];
        deleteImage(coverPublicId);

        project.images.forEach((image) => {
          const imagePublicId = image.split("/").pop().split(".")[0];
          deleteImage(imagePublicId);
        });

        updateProject();
      } else {
        updateProject();
      }
    })
    .catch((error) => res.status(404).json({ error }));
};
