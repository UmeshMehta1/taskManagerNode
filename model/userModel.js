module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull : false
    },
    username: {
      type: DataTypes.STRING,
      allowNull:false
    }

  
  });
  return User;
};