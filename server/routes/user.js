import express from 'express';
const router = express.Router();
import { getAllUsers, getUserById, deleteUser, createUser, addFriend, deleteFriend} from '../controllers/user.js';

router.get("/", async (req, res) => {
    const users = await getAllUsers();
    res.send(users);
});

router.get("/:id", async (req, res) => {
    const user = await getUserById(req.params.id);
    res.send(user);
});

router.delete("/:id", async (req, res) => {
    const user = await deleteUser(req.params.id);
    res.send(`User with id ${req.params.id} deleted!`);
});

router.post("/add", async (req, res) => {
    const user = await createUser(req.body.username, req.body.password);
    res.send("User created!");
});

router.patch("/pass/:id", async (req, res) => {
    const user = await updateUser(req.params.id, req.body.username, req.body.password);
    res.send(`User's password with id ${req.params.id} updated!`);
});

router.patch("/friends/:id/:friendId", async (req, res) => {
    const user = await addFriend(req.params.id, req.params.friendId);
    res.send(`User friends with id ${req.params.id} updated!`);
});

router.patch("/friends/delete/:id/:friendId", async (req, res) => {
    const user = await deleteFriend(req.params.id, req.params.friendId);
    res.send(`User friends with id ${req.params.id} updated!`);
});



export { router };
