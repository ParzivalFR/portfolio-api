const Category = require("../models/category.models");

exports.createCategory = (req, res, next) => {
  const category = new Category({
    title: req.body.title,
  });
  category
    .save()
    .then(() => res.status(201).json({ message: "Catégorie enregistrée !" }))
    .catch((error) => res.status(400).json({ error: error.message }));
};

exports.getAllCategories = (req, res, next) => {
  Category.find()
    .then((categories) => res.status(200).json(categories))
    .catch((error) => res.status(400).json({ error: error.message }));
};

exports.deleteCategory = (req, res, next) => {
  Category.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: "Catégorie supprimée !" }))
    .catch((error) => res.status(400).json({ error: error.message }));
};
