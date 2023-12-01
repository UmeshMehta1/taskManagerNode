// taskModel.js
module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define(
    "task",
    {
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      completed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      // Define the foreign key userId with references to User model's id
      // userId: {
      //   type: DataTypes.INTEGER,
      //   allowNull: false,
      //   references: {
      //     model: "User",
      //     // key: "id", // This should be the primary key of the User model
      //   },
      // },
    },
  );
  return Task;
};
