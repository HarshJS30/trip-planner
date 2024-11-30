const express = require('express')
const router = express.Router();
const {Plan} = require('../models/plan')

router.post('/', async (req, res) => {
    try {
      const newPlan = new Plan(req.body);
      await newPlan.save();
      res.status(201).json(newPlan);
    } catch (error) {
      console.error("Error:", error);
    }
  });
  

router.get('/', async(req,res)=>{
    try{
        const plans = await Plan.find();
        res.status(201).json(plans)
    }
    catch(error){
        res.status(400).json(error)
    }
})

router.get('/:id', async(req,res)=>{
    try{
        const plan = await Plan.findById(req.params.id)
        if(!plan){
            res.status(404).json({message:'Error, Not Found'})
        }
        res.status(200).json(plan)
    }
    catch(error){
        res.status(400).json(error)
    }
})

router.put('/:id', async(req,res)=>{
    try{
        const updatedPlan = await Plan.findByIdAndUpdate(req.params.id,req.body,{new:true})
        if (!updatedPlan){
            res.status(404).json({message:'error, not found'})
        }
        res.status(200).json(updatedPlan)
    }
    catch(error){
        res.status(400).json(error)
    }
})

router.delete('/:id',async(req,res)=>{
    try{
        const deletedPlan = await Plan.findByIdAndDelete(req.params.id)
        if(!deletedPlan){
            res.status(404).json({message:'Error!, not found'})
        }
        res.status(200).json({message:'Successfully Deleted'})
    }
    catch(error){
        res.status(400).json(error)
    }
})

module.exports=router;