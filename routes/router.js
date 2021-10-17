const express = require('express');
const router = express.Router();
const Task = require('../models/Task')

router.get('/tasks',async(req,res)=>{
    try{
        const tasks = await Task.find({});
        
        res.status(200).send(tasks)
    }catch(e){
        res.status(404).json({msg:e})    
    }
})

router.get('/tasks/:id', async(req, res)=>{
    try{
        const id = req.params.id
        const task = await Task.findById(id)
        if(!task){
            res.send(404).json({msg:'No task found'})
            return
        }
        res.status(201).json({task})
    }catch(e){
        res.status(404).json({msg:e})  
    }
})

router.post('/tasks',async (req,res)=>{
    try{
        const task = await Task.create(req.body)
        res.status(201).json({task})
    }catch(e){
        res.status(404).json({msg:e})    
    }
    
})

router.patch('/tasks/:id',async(req,res)=>{
    try{
        const id = req.params.id
        const task  = await Task.findByIdAndUpdate(id, req.body, {new:true})
        if(!task){
            res.send(404).json({msg:'No task found'})
            return
        }
        res.status(200).json({task})
    }catch(e){
        res.status(404).json({msg:e}) 
    }   
})

router.delete("/tasks/:id",async(req,res)=>{
    try{
        const id = req.params.id
        const task = await Task.findByIdAndDelete(id)
        if(!task){
            res.send(404).json({msg:'No task found'})
            return
        }
        res.status(200).json({msg:"deleted item"})
    }catch(e){
        res.status(404).json({msg:e}) 
    }
})

module.exports = router;