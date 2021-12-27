const express = require('express')
const router = express.Router()
const Author = require('../models/author')

//tat ca tac gia
router.get('/',async(req,res)=>{
    let timkiemtg ={}
    if(req.query.name != null && req.query.name !== ''){
        timkiemtg.name = new RegExp(req.query.name,'i')
    }
    try{
        const authors = await Author.find(timkiemtg)
        res.render('authors/index',{authors:authors,timkiemtg:req.query})
    }catch{
        res.redirect('/')
    }
    
})



//them tac gia
router.get('/new',(req,res)=>{
    res.render('authors/new',{author:new Author})
})
router.post('/',async(req,res)=>{
    const author = new Author({
        name:req.body.name
    })
    try{
        const newAuthor = await author.save()
        res.redirect(`authors`)

    }catch{
        res.render('authors/new',{
            author :author
        })
        
    }})
module.exports = router