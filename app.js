import express from "express";
import { errorMiddlewares } from "./middleware/errorMiddlewares.js";
import dotenv from "dotenv"
import githubRouter from "./controllers/GitHub-auth.js"
import userTypeRouter from "./routes/UserType.js"
import session from "express-session";
import cookieParser from "cookie-parser";
import passport from "passport";
import cors from "cors"
import UserRouter from "./routes/User.js"
import googleRouter from "./controllers/Google-auth.js"



//  env file import 
dotenv.config({
    path: "./config/config.env",
  });

const app = express();

app.use(cors())


app.use(cookieParser());

app.use(express.json());


//passport logic
app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: process.env.SESSION_SECRET,
    cookie: {
      secure:true,
        sameSite:"none",
        httpOnly:true
    }
  })
);
app.use(
  cors({
    credentials: true,
    origin:'*',  //je bdlna frontend url se
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.enable("trust proxy");

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function (user, cb) {
  cb(null, user);
});
passport.deserializeUser(function (obj, cb) {
  cb(null, obj);
});


app.use('/auth/github', githubRouter);
app.use('/auth/google', googleRouter)
app.use("/api/v1", UserRouter)
app.use("/api/v1/usertype",userTypeRouter)
app.use(errorMiddlewares)


export default app;
