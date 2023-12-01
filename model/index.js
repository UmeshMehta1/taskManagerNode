// const seedAdmin = require("../adminSeeder");
const dbConfig = require("../db/db.js")
const { Sequelize, DataTypes } = require("sequelize");

// la sequelize yo config haru lag ani database connect gardey vaneko hae 
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  port : 3306, 
  // port : 7013,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});



const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// importing model files 
db.tasks = require("./taskModel.js")(sequelize, DataTypes);
db.users = require("./userModel.js")(sequelize, DataTypes);
sequelize
  .authenticate()
  .then(async () => {
    console.log("CONNECTED!!");
//    // check if admin exists or not
//  seedAdmin(db.users)
  })
  .catch((err) => {
    console.log("Error" + err);
  });
//RELATIONSHIPS

db.users.hasMany(db.tasks)
db.tasks.belongsTo(db.users)


db.sequelize.sync({ force: false }).then(() => {
  console.log("yes re-sync done");
});

module.exports = db;