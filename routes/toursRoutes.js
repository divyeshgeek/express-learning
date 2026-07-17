const express=require("express");
const {getAllTours,createTour,getTourById,updateTourById,deleteTourById,checkTourId,checkBody}=require("../controllers/tourController");

const router=express.Router();
router.param("id",checkTourId);
router.route("/").get(getAllTours).post(checkBody, createTour);
router.route("/:id").get(getTourById).patch(updateTourById).delete(deleteTourById);


module.exports=router;