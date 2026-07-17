const fs=require("fs");
const toursData=JSON.parse(fs.readFileSync(`${__dirname}/../constant/tours-data.json`,"utf-8"));

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
    fs.writeFileSync(`${__dirname}/../constant/tours-data.json`,JSON.stringify(toursData));
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
    fs.writeFileSync(`${__dirname}/../constant/tours-data.json`,JSON.stringify(toursData));
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
    fs.writeFileSync(`${__dirname}/../constant/tours-data.json`,JSON.stringify(toursData));
    res.status(200).json({
        status:"success",
        data:null
    });
};

module.exports={
    getAllTours,
    createTour,
    getTourById,
    updateTourById,
    deleteTourById
};