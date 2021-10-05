const express = require('express');
const router = express.Router();
const {Notes} = require('../models');
const validateSession = require('../middleware/ValidateSession');

router.get('/practice', (req, res) => res.send('Hey!! This is a practice route'));

//CREATE Notes & RATING
router.post('/create/:id', validateSession, async (req, res) => {
    const {date, title, entry}= req.body;
    try {
        let newNote = await Notes.create({date, title, entry, userId: req.user.id, bookId: req.params.id});
        res.status(200).json({
            note: newNote,
            message: 'Notes added to book!'
        })
    } catch (error) {
        res.status(500).json({
            message: 'Failed to add note!'
        })
    }
});

// GET ALL NOTES (http://localhost:4000/notes/)
router.get('/', (req, res) => {
    Notes.findAll ()
    .then(notes => res.status(200).json(notes))
    .catch(err => res.status(500).json({ error: err}))
});

//GET Notes BY USER (http://localhost:4000/notes/mine (plus the token id))
router.get("/mine", validateSession, (req, res) => {
    let userId = req.user.id
    Notes.findAll ({
        where: { userId: userId }
    })
        .then(notes => res.status(200).json(notes))
        .catch(err => res.status(500).json({ error: err }))
});


//Notes UPDATE (http://localhost:4000/notes/update/2 (put entry number to update!))

router.put("/:id", (req, res) => {
    const query = req.params.id;

    Notes.update(req.body,
        { where: { id: query } })
        .then((notesUpdate) => {
            Notes.findOne({
                where: {
                    id: query
                }
            })
                .then((locatedUpdatedNotes) => {
                    res.status(200).json({
                        notes: locatedUpdatedNotes,
                        message: "Comment updated successful",
                        notesChanged: notesUpdate,
                    });
                });
        })

        .catch((err) => res.json(err));
});



//Notes DELETE (http://localhost:4000/delete/9 (put entry number to delete!))

// 
router.delete('/:id', (req, res) => {
    Notes.destroy({
        where: { id: req.params.id }
    })
        .then(notes => res.status(200).json(notes))
        .catch(err => res.json(err))

})
module.exports = router;