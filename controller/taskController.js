const { tasks, users } = require("../model/index");

const db = require("../model/index.js");
const { QueryTypes } = require("sequelize");
const sequelize = db.sequelize;

exports.createTask = async (req, res) => {
  try {
    const { description, completed } = req.body;
    // Assuming req.user is an array, get the first user from the array
    const user = req.user && req.user[0];

    // Check if user is available and has an id property
    const ownerId = user && user.id;

    if (!ownerId) {
      return res
        .status(400)
        .send({ error: "User ID not provided or invalid." });
    }

    // Using Sequelize to create a task
    const task = await db.tasks.create({
      description,
      completed,
      userId: ownerId,
    });
    res.status(201).json({ task, message: "Task Created Successfully" });
  } catch (err) {
    console.error(err);
    res.status(400).send({ error: err.message || "Error creating task" });
  }
};

//Fetch all Tasks
exports.allTask = async (req, res) => {
  try {
    const allTasks = await tasks.findAll({
      include: {
        model: users,
        attributes: ["id", "email", "username"],
      },
    });
    console.log(allTasks);
    res.send("alltask fetch successfully");
  }
  catch (error) {
    res.send("error",error)
  }
  
}

//Fetch Single Task
exports.singleTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await tasks.findAll({
      where: {
        id: id,
      },
      include: {
        model: users,
      },
    });
    console.log(task);
    res.send("single task fetch successfully");
  }catch (err) {
      console.error(err);
      return res.status(500).send("Internal Server Error");
    
};
}

//Delete Task
exports.deleteTask = async (req, res) => {
  try {
    const id = req.params.id;
  await tasks.destroy({
    where: {
      id: id,
    },
  });
  res.send("deleted successfully");
  } catch (err) {
    console.error(err);
    return res.status(400).send("Error",err);
  }
  
}


//Edit and Update Task
exports.editTask = async (req, res) => {
  try {
    const userId = req.userId;
    const { description, completed } = req.body;
    const { id } = req.params;

    // Check if the task exists
    const task = await tasks.findByPk(id);
    if (!task) {
      return res.status(404).send("Task not found");
    }

    // Check if the user is the owner of the task
    if (task.userId !== userId) {
      return res.status(403).send("You cannot edit this task");
    }

    // Update the task
    await tasks.update(
      {
        description: description,
        completed: completed,
      },
      {
        where: {
          id: id,
        },
      }
    );

    return res.status(200).json({ message: "Task updated successfully" });
    
  } catch (err) {
    console.error(err);
    return res.status(500).send("Internal Server Error");
  }
};
