import express from 'express';
const router = express.Router();
import { getAllExercises, getExerciseById, deleteExercise, addExercise, updateExercise } from '../controllers/exercise.js';

router.get("/", async (req, res) => {
    const exercises = await getAllExercises();
    res.send(exercises);
});

router.get("/:id", async (req, res) => {
    const exercise = await getExerciseById(req.params.id);
    res.send(exercise);
});

router.delete("/delete/:id", async (req, res) => {
    const exercise = await deleteExercise(req.params.id);
    res.send(`Exercise with id ${req.params.id} deleted!`);
});

router.post("/add", async (req, res) => {
    const exercise = await addExercise(req.body.name, req.body.muscleGroup, req.body.description);
    res.send("Exercise created!");
});

router.patch("/update/:id", async (req, res) => {
    const exercise = await updateExercise(req.params.id, req.body.name, req.body.muscleGroup, req.body.description);
    res.send(`Exercise with id ${req.params.id} updated!`);
});



export { router };