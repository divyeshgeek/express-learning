const express=require("express");
const morgan=require("morgan");
const fs=require("fs");
const app=express();
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


// app.get("/",(req,res)=>{
//     // res.send("Hello World");
//     res.status(200).json({
//         message:"Hello World",
//         app:"Express learning",
//         status:"success"
//     });
// });

// app.post("/",(req,res)=>{
//     res.status(200).json({
//         message:"This is a post request",
//         app:"Express learning",
//         status:"success"
//     });

// });
 

// ROUTES HANDLERS
const toursData=JSON.parse(fs.readFileSync(`${__dirname}/constant/tours-data.json`,"utf-8"));

const getAllTours=(req,res)=>{
    console.log(req.requestTime);
    res.status(200).json({
        status:"success",
        requestTime:req.requestTime,
        results:toursData.length,
        data:toursData
    });
};

const createTour=(req,res)=>{
    console.log(req.body);
    const newTour=Object.assign({id:toursData.length+1},req.body);
    toursData.push(newTour);
    fs.writeFileSync(`${__dirname}/constant/tours-data.json`,JSON.stringify(toursData));
    res.status(200).json({
        status:"success",
        data:newTour
    });
};

const getTourById=(req,res)=>{
    const id=req.params.id;
    const tour=toursData.find(tour=>tour.id===parseInt(id));
    if(!tour){
        return res.status(404).json({
            status:"fail",
            message:"Tour not found"
        });
    }
    res.status(200).json({
        status:"success",
        data:tour
    });
};

const updateTourById=(req,res)=>{
    const id=req.params.id;
    const tour=toursData.find(tour=>tour.id===parseInt(id));
    if(!tour){
        return res.status(404).json({
            status:"fail",
            message:"Tour not found"
        });
    }
    const updatedTour=Object.assign(tour,req.body);
    fs.writeFileSync(`${__dirname}/constant/tours-data.json`,JSON.stringify(toursData));
    res.status(200).json({
        status:"success",
        data:updatedTour
    });
};


const deleteTourById=(req,res)=>{
    const id=req.params.id;
    const tour=toursData.find(tour=>tour.id===parseInt(id));
    if(!tour){
        return res.status(404).json({
            status:"fail",
            message:"Tour not found"
        });
    }
    const index=toursData.indexOf(tour);
    toursData.splice(index,1);
    fs.writeFileSync(`${__dirname}/constant/tours-data.json`,JSON.stringify(toursData));
    res.status(200).json({
        status:"success",
        data:null
    });
};
 
// app.get("/api/v1/tours",getAllTours);
// app.post("/api/v1/tours",createTour);
// app.get("/api/v1/tours/:id",getTourById);
// app.patch("/api/v1/tours/:id",updateTourById);
// app.delete("/api/v1/tours/:id",deleteTourById);

//3) ROUTES

app.route("/api/v1/tours").get(getAllTours).post(createTour);
app.route("/api/v1/tours/:id").get(getTourById).patch(updateTourById).delete(deleteTourById);


//4) START SERVER
const port=3000;
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
});