require("dotenv").config();
require("express-async-errors");

//extra security packages

const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");
const rateLimiter = require("express-rate-limit");

const express = require("express");
const app = express();

// connectDB
const connectDB = require("./db/connect");
const authenticateUser = require("./middleware/authentication");

// routers
const authRouter = require("./routes/auth");
const taskRouter = require("./routes/tasks");

// API
app.get("/multiply", (req, res) => {
  const result = req.query.first * req.query.second;
  if (result.isNaN) {
    result = "NaN";
  } else if (result == null) {
    result = "null";
  }
  res.json({ result: result });
});

// error handler
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

// security
app.set("trust proxy", 1);
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 10000,
  })
);
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(xss());

app.use(express.static("public"));

// routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/tasks", authenticateUser, taskRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

// server listening on port
const port = process.env.PORT || 3000;

// ORIGINAL START

// const start = async () => {
//   try {
//     console.log(
//       "MONGO_URI using:",
//       (process.env.MONGO_URI || "").replace(/:\/\/.*?:.*?@/, "://<redacted>@")
//     );
//     await connectDB(process.env.MONGO_URI);
//     app.listen(port, () =>
//       console.log(`Server is listening on port ${port}...`)
//     );
//   } catch (error) {
//     console.log(error);
//   }
// };

let mongoURL = process.env.MONGO_URI;
if (process.env.NODE_ENV == "test") {
  mongoURL = process.env.MONGO_URI_TEST;
}
// FIRST FOR TESTING START WITH mongoURL

// const start = async () => {
//   try {
//     console.log(
//       "MONGO_URI using:",
//       // (process.env.MONGO_URI || "")
//       //   .replace(
//       //     /:\/\/.*?:.*?@/,
//       //     "://<redacted>@"
//       //   )
//       (mongoURL || "").replace(/:\/\/.*?:.*?@/, "://<redacted>@")
//     );
//     // await connectDB(process.env.MONGO_URI);
//     await connectDB(mongoURL);
//     app.listen(port, () =>
//       console.log(`Server is listening on port ${port}...`)
//     );
//   } catch (error) {
//     console.log(error);
//   }
// };

// SECOND FOR TESTING START
const start = () => {
  try {
    require("./db/connect")(mongoURL);
    return app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();

module.exports = { app };

// start();

// const store = MongoStore.create({ mongoUrl: mongoURL });
