const express = require('express')
const fs = require('fs')
const path = require('path')

const router = express.Router()

const data = require('../notes.json')

router.get('/', (req,res,next) => {
    res.render('index', { title: "Welcome to Misha's quest book" })
})
router.get('/addnote', (req,res,next) => {
    res.render('addNote', { notes:data, title: "Leave a note for us" })
})
router.get('/notes', (req,res,next) => {
    res.render('notesList', { notes: data, title: "What other quests said about us" })
})

router.post('/addnote', (req,res,next) => {
    data.push({
        id: Math.random(),
        note: req.body.note,
        guest: req.body.userName
    })

    fs.writeFile(path.join(__dirname, '..', 'notes.json'),
        JSON.stringify(data, null, 2), () => {
        res.status(302).redirect('/notes')
    })
})

router.get('*', (reg, res) => {
    console.log('404')
    res.render('404')
   
})

module.exports = router