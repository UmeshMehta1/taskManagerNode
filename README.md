# taskManagerNode
# Task Manager Application README

Welcome to the TaskManager application. This application is built using Node.js, MySQL, and Sequelize. Follow the instructions below to set up and run the backend.

## Prerequisites
Make sure you have the following installed on your machine:

- Node.js: [Download and Install Node.js](https://nodejs.org/)
-Xampp:[Download] 
- Sequelize CLI: Install globally using `npm install -g sequelize-cli`

## Setup Instructions

1. **Clone the Repository:**

   ```
   git clone https://github.com/UmeshMehta1/taskManagerNode.git
   ```

2. **Navigate to the Project Directory:**

   ```
   cd taskManagerNode
   ```

3. **Install Dependencies:**

   ```
   npm install
   ```

4. **Configure Database:**

   - Create a MySQL database.
   - Update the database configuration in `config/config.json` with your database credentials.

5. **Run Migrations:**

   ```
   sequelize db:migrate
   ```

6. **Start the Application:**

   ```
   npm start
   ```

   This will start the backend server.


## Application Structure

- **`models/`**: Contains Sequelize models.
- **`middleware`**:
- **`config/`**: Contains Sequelize configuration.
- **`routes/`**: Define API routes.
- **`services/`**: Define API routes.
- **`controllers/`**: Implement route handlers.
