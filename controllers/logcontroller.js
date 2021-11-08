const express = require("express");
const router = express.Router();
const { log } = require("../models");
let validateJWT = require("../middleware/validate-jwt");













router.post("/", validateJWT, async (req, res) => {
    const { description, definition, result, } = req.body.log;
    const { id } = req.user;
    const logEntry = {
        description,
        definition,
        result,
        owner_id: id
    };
    try {
        const newLog = await log.create(logEntry);
        res.status(201).json({
            message: "Item successfully created",
            description: newLog,
        });
    } catch (err) {
        res.status(500).json({
            message: "Failed to register Submission"});
    }
});

//Get all logs section
router.get("/", validateJWT, async (req, res) => {
    try {
        const logs = await log.findAll();
        res.status(201).json(logs);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

router.get("/id", validateJWT, async (req, res) => {
    const logId = req.params.id;
    const ownerid = req.user.id;

    try {
        const query = {
            where: {
                id: logId,
                userId: ownerid,
            },
        };
        await log.find(query);
        res.status(201).json({ message: "Item has been deleted" });
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

//delete log by id
router.delete("/:id", validateJWT,  async (req, res) => {
    const logId = req.params.id;
    const ownerid = req.user.id;

    try {
        const query = {
            where: {
                id: logId,
                userId: ownerid,
            },
        };
        await log.destroy(query);
        res.status(201).json({ message: "Item has been deleted" });
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

router.put("/:logId", validateJWT, async (req, res) => {
    const { description, definition, result } = req.body.log;
    const logId = req.params.logId;
    const { id } = req.user;
    
    const query = {
        where: {
            id: logId,
        },
    };

    const newNewLog = {
        description: description,
        definition: definition,
        result: result,
        owner_id: id
        
    };

    try {
        const updatedLog = await log.update(newNewLog, query);
        res.status(200).json({updatedLog, message: "Item has been updated" });
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

module.exports = router;