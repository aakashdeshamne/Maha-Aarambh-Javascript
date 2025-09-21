// 2. File Uploads with Multer
// Scenario: Users need to be able to upload a profile picture. 
// These images should be saved to the server's filesystem.
// Task: Using a library like multer in Express.js, create an endpoint POST /upload/profile-picture. 
// This endpoint should:
// Accept multipart/form-data.
// Only allow image files (e.g., .jpg, .png, .gif).
// Limit the file size to 2MB.
// Save the uploaded file to a directory called ./uploads.
// Respond with the path to the saved file upon success.

const express=require('express');
const multer=require('multer');
const path=require('path');
const app=express();
const fs=require('fs');
const uploadDirectory='./uploads';

//filedirectore is existed no need to check and create

const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,uploadDirectory);
    },
    filename:function(req,file,cb){
        const uniquesuffix=Date.now()+"-"+Math.round(Math.random()*1E9);
        cb(null,file.fieldname+"-"+uniquesuffix+path.extname(file.originalname));
    },
    limits:{fileSize:2*1024*1024} //2MB
});

const filefilter=(req,res,file,cb)=>{
    const filetypes=/jpeg|jpg|png|gif/;
    const extname=filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype=filetypes.test(file.mimetype);
    if(mimetype && extname){
        return cb(null,true);
    }
    else{
        cb(new Error('Only image files are allowed!'));
    }
};

const upload=multer({storage:storage,fileFilter:filefilter,limits:{fileSize:2*1024*1024}}); 

app.post('/upload/profile_picture',upload.single('profilePrcture'),(req,res)=>{
    if(!req.file){
        return res.status(400).json({error:'No file uploaded or invalid file type'});
    }
    res.json({filepath:req.file.path});
});


