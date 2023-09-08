// const express = require('express')

module.exports.setFlash = function(req,res,next){
    // try{
        
        res.locals.flash = {
            'success':req.flash('success'),
            'error': req.flash('error')
        }
        next();
    // }
    // catch(err){
        // console.log(err);
    // }
}