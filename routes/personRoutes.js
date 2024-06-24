const express = require('express')
const router = express.Router()
const Person = require('../models/person.js')
router.get('/', async(req, res) => {
    try {
        const response = await Person.find()
        console.log('data fetched.')
        res.status(200).json(response)
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error." })
    }
})
router.post('/', async(req, res) => {
    try {
        const data = req.body
            // Assuming the peson data contains

        // Creating a new person doqument using the mongoose models
        const newPerson = new Person(data)
        const response = await newPerson.save()
        console.log('data saved.')
        res.status(200).json(response)

        // newPerson.save((error, savedPerson) => {
        //     if (error) {
        //         console.log('Erron on saving persondata');
        //         res.status(500).json({ error: "Internal serverErrror" })
        //     } else {
        //         console.log("data saved successfully.");
        //         res.status(200).json(savedPerson)
        //     }
        // })
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error." })
    }
})
router.get('/:workType', async(req, res) => {
    try {
        const workType = req.params.workType;
        // extract the work type from the url parameter
        if (workType == 'chef' || workType == 'manager' || workType == 'waiter') {
            const response = await Person.find({ work: workType });
            console.log('response fetched.');
            res.status(200).json(response);
        } else {
            res.status(404).json({ error: 'Invalid work type' })
        }
    } catch (error) {
        console.log(error)
        res.status(404).json({ error: 'Internal server error.' })
    }
})
router.put('/:id', async(req, res) => {
    try {
        const personId = req.params.id;
        const updatedPersonData = req.body;
        const response = await Person.findByIdAndUpdate(personId, updatedPersonData, {
            new: true, //return tthe updated document
            runValidators: true
        })
        if (!response) {
            res.status(404).json({ error: 'person not found.' })
        }
        console.log('data updated.');
        res.status(200).json(response)
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error." })
    }
})
router.delete('/:id', async(req, res) => {
    try {
        const personId = req.params.id
        const response = await Person.findByIdAndDelete(personId)
        if (!response) {
            return res.status(404).json({ error: "Data not found!" })
        }
        console.log('Data deleted successFully.')
        res.status(200).json({ message: "Person deleted successfully" })
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error." })
    }
})
module.exports = router;