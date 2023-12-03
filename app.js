import express from "express";
import Hello from "./hello.js";
import Lab5 from "./lab5.js";
import cors from "cors";
import CourseRoutes from "./courses/routes.js";
import ModuleRoutes from "./modules/routes.js";
import "dotenv/config";
//import session from "express-session";

import mongoose from "mongoose";
import UserRoutes from "./users/routes.js";
import session from "express-session";

//const DB_CONNECTION_STRING= 'mongodb+srv://zhangxinjia:Ocelia624%40@kanbas.fsqlno5.mongodb.net/?retryWrites=true&w=majority';
const CONNECTION_STRING = process.env.DB_CONNECTION_STRING || 'mongodb://127.0.0.1:27017/kanbas';
mongoose.connect(CONNECTION_STRING);

//mongoose.connect("mongodb://127.0.0.1:27017/kanbas");

const app = express();
app.use(
    cors({
      credentials: true,
      origin: "https://a6--gilded-khapse-a03d2c.netlify.app/"
    })
   );

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
  app.use(session(sessionOptions));
  
     
app.use(express.json());
UserRoutes(app);
CourseRoutes(app);
ModuleRoutes(app);
Lab5(app);
Hello(app);
//app.listen(4000);


app.listen(process.env.PORT || 4000);



