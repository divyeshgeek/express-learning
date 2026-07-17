const express=require("express");
const morgan=require("morgan");
const app=express();
const toursRouter=require("./routes/toursRoutes");
const usersRouter=require("./routes/usersRoutes");

//1) MIDDLEWARES
app.use(morgan("dev"));
app.use(express.json());
app.use((req,res,next)=>{
    console.log("Hello from the middleware");
    next();
});
app.use((req,res,next)=>{
    req.requestTime=new Date().toISOString();
    next();
});

//3) ROUTES

app.use("/api/v1/tours",toursRouter);
app.use("/api/v1/users",usersRouter);


//4) START SERVER
const port=3000;
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
});