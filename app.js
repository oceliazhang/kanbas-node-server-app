import "dotenv/config";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import Hello from "./hello.js";
import Lab5 from "./lab5.js";
import CourseRoutes from "./courses/routes.js";
import ModuleRoutes from "./modules/routes.js";
import UserRoutes from "./users/routes.js";
import session from "express-session";
//import session from "cookie-session";
const CONNECTION_STRING = process.env.DB_CONNECTION_STRING || 'mongodb://127.0.0.1:27017/kanbas';

mongoose.connect(CONNECTION_STRING);

const db = mongoose.connection;
db.on('connected', () => {
  console.log('Connected to MongoDB');
  console.log(`Database name: ${db.name}`);
});


const app = express();
app.use(
  cors({
    credentials: true,
    origin: process.env.NODE_ENV === "production" ? process.env.FRONTEND_URL : process.env.FRONTEND_URL_LOCAL,
    //origin: 'https://a6--gilded-khapse-a03d2c.netlify.app'
  })
);
app.options('*', cors());
const sessionOptions = {
  secret: "any string",
  resave: false,
  saveUninitialized: false,
};
if (process.env.NODE_ENV !== "development") {
  sessionOptions.proxy = true;
  sessionOptions.cookie = {
    sameSite: "none",
    secure: true,
  };
}
app.use(
  session(sessionOptions)
);

app.use(express.json());
UserRoutes(app);
ModuleRoutes(app);
CourseRoutes(app);
Lab5(app);
Hello(app);
app.listen(process.env.PORT || 4000);