import User from '../models/User.js';

export const getUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
}

export const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { firstName, lastName, occupation, location, picturePath } = req.body;
        const user = await User.findById(id);
        if (firstName) user.firstName = firstName;
        if (lastName) user.lastName = lastName;
        if (occupation) user.occupation = occupation;
        if (location) user.location = location;
        if (picturePath) user.picturePath = picturePath;
        await user.save();
        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
}

export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        await User.findByIdAndDelete(id);
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
}

export const getUserFriends = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);

        const friends = await Promise.all(
            user.friends.map((id) => User.findById(id))
        );
        const formated = friends.map(({ _id, firstName, lastName, occupation, location, picturePath}) => {
            return { _id, firstName, lastName, occupation, location, picturePath};
        });
        res.status(200).json(formated); 
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
}

export const addFriend = async (req, res) => {
    try {
        const { id, friendId } = req.params;
        const user = await User.findById(id);
        const friend = await User.findById(friendId);

        if (!user.friends.includes(friendId)) {
            user.friends.push(friendId);
            friend.friends.push(id);
        }
        await user.save();
        await friend.save();

        const friends = await Promise.all(
            user.friends.map((id) => User.findById(id))
        );

        const formated = friends.map(({ _id, firstName, lastName, occupation, location, picturePath}) => {
            return { _id, firstName, lastName, occupation, location, picturePath};
        });
        
        res.status(200).json(formated);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
}

export const removeFriend = async (req, res) => {
    try {
        const { id, friendId } = req.params;
        const user = await User.findById(id);
        const friend = await User.findById(friendId);

        if (user.friends.includes(friendId)) {
            user.friends = user.friends.filter((id) => id !== friendId)
            friend.friends = friend.friends.filter((id) => id !== id)
        }
        await user.save();
        await friend.save();

        const friends = await Promise.all(
            user.friends.map((id) => User.findById(id))
        );

        const formated = friends.map(({ _id, firstName, lastName, occupation, location, picturePath}) => {
            return { _id, firstName, lastName, occupation, location, picturePath};
        });

        res.status(200).json(formated);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
}