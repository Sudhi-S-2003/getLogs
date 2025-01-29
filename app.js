const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const clc = require("cli-color");
const router = require('./routes/routes')
// Middleware
app.use(express.json());
app.use(cors());

// Environment Configuration
dotenv.config();
const port = process.env.PORT || 3001;
app.post('/', router)


app.listen(port, () => {
  const portMessage = clc.redBright.bold.italic.blink(
    `✓ App is running on port: ${port}`
  );
  const envMessage = clc.yellowBright.bold.italic(
    `✓ Environment: development`
  );
  console.log(`${portMessage}\n${envMessage}`);
});

