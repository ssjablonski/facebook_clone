import express from 'express';
const router = express.Router();
import { addExcerciseToPlan, removeExcerciseFromPlan, createSession, deleteSession, addSetToExcercise, deleteSetFromExcercise } from '../controllers/plan.js';

router.patch("/add/:id/:eid", async (req, res) => {
    const plan = await addExcerciseToPlan(req.params.id, req.params.eid);
    res.send(`Excercise from plan with id ${req.params.id} added!`);
});

router.delete("/delete/:id/:eid", async (req, res) => {
    const plan = await removeExcerciseFromPlan(req.params.id, req.params.eid);
    res.send(`Excercise form plan with id ${req.params.id} deleted!`);
});

router.post("/session/add/:id", async (req, res) => {
    const session = await createSession(req.params.id);
    res.send(`Session for plan with id ${req.params.id} created!`);
});

router.delete("/session/delete/:id", async (req, res) => {
    const session = await deleteSession(req.params.id);
    res.send(`Session with id ${req.params.id} deleted!`);
});

router.post("/set/add/:id/:eid", async (req, res) => {
    const session = await addSetToExcercise(req.params.id, req.params.eid, req.body.weight, req.body.reps);
    res.send(`Set for excercise with id ${req.params.eid} added!`);
});

router.delete("/set/delete/:id", async (req, res) => {
    const session = await deleteSetFromExcercise(req.params.id);
    res.send(`Set with id ${req.params.id} deleted!`);
});

export { router };
