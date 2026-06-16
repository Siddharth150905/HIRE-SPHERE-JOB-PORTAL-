const express=require("express");
const cors=require("cors");
const helmet=require("helmet");
const morgan=require("morgan");
const cookieParser=require("cookie-parser");
const errorHandler=require("../src/middleware/errorMiddleware.js");
const testRoutes=require('../src/routes/testRoutes.js');
const authRoutes=require("../src/routes/authRoutes.js");
const profileRoutes=require("../src/routes/profileRoutes.js");
const companyRoutes=require("../src/routes/companyRoutes.js");
const jobRoutes=require("../src/routes/jobRoutes.js");
const applicationRoutes=require("../src/routes/applicationRoutes.js");
const testRedis=require("../src/routes/testRedis.js");
const app=express();

app.use(express.json());
app.use(cookieParser());


app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(helmet());


app.use(morgan("dev"));
//Test
app.use("/api/test",testRoutes);

//testRedis
app.use("/api/",testRedis);


//Auth Routes
app.use("/api/auth",authRoutes);

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

//Global error handler
app.use(errorHandler);


module.exports=app;
