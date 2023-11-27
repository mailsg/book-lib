const express = require("express");
const bookControllers = require("../controllers/books");

const router = express.Router();

router.get("/", bookControllers.getBooks);
router.post("/", bookControllers.postBook);

router.get("/:id", bookControllers.getBookById);
router.put("/:id", bookControllers.putBookById);
router.delete("/:id", bookControllers.deleteBookById);

exports.routes = router;