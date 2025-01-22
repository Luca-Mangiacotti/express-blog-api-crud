const express = require("express");
const validationId = require("../middlewares/validation_id");
const postsController = require("../controllers/posts_controller");

const router = express.Router();

// Middleware per verificare il parametro ID delle rotte
router.use("/:id", validationId);

// Index
router.get("/", postsController.index);

// Show
router.get("/:id", postsController.show);

// Store
router.post("/", postsController.store);

// Update
router.put("/:id", postsController.update);

// Modify
router.patch("/:id", postsController.modify);

// Delete
router.delete("/:id", postsController.destroy);

module.exports = router;