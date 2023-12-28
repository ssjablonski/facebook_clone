import express from 'express';
const router = express.Router();
import { deletePlan, getAllPlans, getPlanById, createPlan, updatePlan } from '../controllers/plans.js';

router.get("/", async (req, res) => {
    const plans = await getAllPlans();
    res.send(plans);
});

router.get("/:id", async (req, res) => {
    const plan = await getPlanById(req.params.id);
    res.send(plan);
});

router.delete("/:id", async (req, res) => {
    const plan = await deletePlan(req.params.id);
    res.send(`Plan with id ${req.params.id} deleted!`);
});

router.post("/add", async (req, res) => {
    const plan = await createPlan(req.body.name, req.body.description);
    res.send("Plan created!");
});

router.patch("/update/:id", async (req, res) => {
    const plan = await updatePlan(req.params.id, req.body.name, req.body.description);
    res.send(`Plan with id ${req.params.id} updated!`);
});

export { router };