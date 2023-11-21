import express from "express";
import Hello from "./hello.js";
import Lab5 from "./lab5.js";
import cors from "cors";
import CourseRoutes from "./courses/routes.js";
import ModuleRoutes from "./modules/routes.js";
import "dotenv/config";
//import session from "express-session";


// Enable All CORS Requests for simplicity
app.use(cors());

// Or, to enable CORS for specific domains:
app.use(cors({
  origin: 'https://655c2ad3e3ebce294ae57455--gilded-khapse-a03d2c.netlify.app' // Replace with your Netlify app's URL
}));

// ... rest of your server code




const app = express();
app.use(cors());
app.use(express.json());
CourseRoutes(app);
ModuleRoutes(app);
Lab5(app);
Hello(app);
//app.listen(4000);

app.listen(process.env.PORT || 4000);



