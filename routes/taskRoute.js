const { createTask, allTask, singleTask, deleteTask, editTask } = require("../controller/taskController");
const { isAuthenticated } = require("../middleware/isAuthenticated");

const router = require("express").Router()

router.route("/create").post(isAuthenticated, createTask)
router.route("/alltask").get(isAuthenticated, allTask)
router.route("/singletask/:id").get(isAuthenticated, singleTask)
router.route("/deletetask/:id").delete(isAuthenticated, deleteTask)
router.route("/edittask/:id").post(isAuthenticated, editTask)

module.exports = router;
