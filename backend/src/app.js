const express=require("express");
const cors=require("cors");
const helmet=require("helmet");
const morgan=require("morgan");
const notificationRoutes =
 require(
  "../src/routes/notificationRoutes.js"
 );
const cookieParser=require("cookie-parser");
const errorHandler=require("../src/middleware/errorMiddleware.js");
const testRoutes=require('../src/routes/testRoutes.js');
const authRoutes=require("../src/routes/authRoutes.js");
const profileRoutes=require("../src/routes/profileRoutes.js");
const companyRoutes=require("../src/routes/companyRoutes.js");
const jobRoutes=require("../src/routes/jobRoutes.js");
const aiRoutes =
 require("../src/routes/aiRoutes.js");
const applicationRoutes=require("../src/routes/applicationRoutes.js");
const {apiLimiter}=require("../src/middleware/rateLimit.js");
const mongoSanitize =
require(
  "express-mongo-sanitize"
);

const xss =
require("xss-clean");

const testRedis=require("../src/routes/testRedis.js");

const app=express();
app.use(helmet({
  crossOriginResourcePolicy:false
 }));


 app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);


app.use(
  "/api",
  apiLimiter
);
app.use(express.json());

app.use(cookieParser());  

app.use((req, res, next) => {
  Object.defineProperty(req, 'query', {
    value: req.query,
    writable: true,
    configurable: true,
    enumerable: true,
  });
  next();
});

app.use(
  mongoSanitize()
);
app.use(xss());




app.use(morgan("dev"));
//Test
app.use("/api/test",testRoutes);

//testRedis
app.use("/api/",testRedis);


//Auth Routes
app.use("/api/auth",authRoutes);


app.use(
 "/api/ai",
 aiRoutes
);

//Profile Routes
app.use("/api/profile", profileRoutes);

//Company Routes
app.use("/api/company",companyRoutes);

//Job Routes
app.use("/api/jobs",jobRoutes);

//application Routes

app.use(
 "/api/applications",
 applicationRoutes
);

app.use(
 "/api/notifications",
 notificationRoutes
);

//Global error handler
app.use(errorHandler);


module.exports=app;
