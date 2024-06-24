const express = require('express')
const router = express.Router()
const MenuItem = require('../models/menu')

router.get('/', async(req, res) => {
    try {
        const response = await MenuItem.find()
        console.log('data is fetched.')
        res.status(200).json(response)
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Interanal server error." })
    }
})
router.post('/', async(req, res) => {
    try {
        const data = req.body
        const newData = new MenuItem(data)
        const response = await newData.save()
        console.log('data saved.')
        res.status(200).json(response)

    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Internal server error" })
    }
})
router.get('/:taste', async(req, res) => {
    try {
        const taste = req.params.taste
        if (taste == 'sour' || taste == 'sweet' || taste == 'spicy') {
            const response = await MenuItem.find({ taste: taste })
            console.log('data fetched.')
            res.status(200).json(response)
        } else {
            console.log('invalid taste.')
            res.status(404).json('data not found')
        }

    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Internal server error" })
    }
})
router.put('/:id', async(req, res) => {
    try {
        const menuId = req.params.id
        const updatedMenuData = req.body
        const response = await MenuItem.findByIdAndUpdate(menuId, updatedMenuData, {
            new: true,
            runValidators: true
        })
        if (!response) {
            return res.status(404).json({ error: "Data not found!" })
        }
        console.log('menu updsated successfully.')
        res.status(200).json(response)
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Internal server error" })
    }
})
router.delete('/:id', async(req, res) => {
    const menuId = req.params.id
    const response = await MenuItem.findByIdAndDelete(menuId)
    if (!response) {
        return res.status(404).json({ error: "MenuItem not found." })
    }
    console.log("data deleted successfully.")
    res.status(200).json(response)
})
module.exports = router