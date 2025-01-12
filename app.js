const express = require("express");
const dbConnection = require("./config/dbConnection");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const clc = require("cli-color");
const router =require('./routes/routes')
// Middleware
app.use(express.json());
app.use(cors());

// Environment Configuration
dotenv.config();
const port = process.env.PORT || 5000;
app.use('/', router)
// Database Connection and Server Initialization
dbConnection()
  .then(() => {
    app.listen(port, () => {
      const portMessage = clc.redBright.bold.italic.blink(
        `✓ App is running on port: ${port}`
      );
      const envMessage = clc.yellowBright.bold.italic(
        `✓ Environment: development`
      );
      console.log(`${portMessage}\n${envMessage}`);
    });
  })
  .catch((err) => {
    console.error(
      clc.redBright.bold.italic("✘ Failed to connect to the database", err)
    );
  });
