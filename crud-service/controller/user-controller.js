import bodyParser from 'body-parser';
const {json} = bodyParser;
import User from '../model/user.js';

// Get all users
export const getUsers = async (request, response) => {
    try{
        const users = await User.find();
        response.status(200).json(users);
    }catch( error ){
        response.status(404).json({ message: error.message })
    }
}

// Save data of the user in database
export const addUser = async (request, response) => {
    const user = request.body;
    const newUser = new User(user);
    try{
        await newUser.save();
        response.status(201).json(newUser);
    } catch (error){
        response.status(409).json({ message: error.message});     
    }
}

// Get a user by id
export const getUserById = async (request, response) => {
    try{
        const user = await User.findById(request.params.id);
        response.status(200).json(user);
    }catch( error ){
        response.status(404).json({ message: error.message })
    }
}

// Save data of edited user in the database
export const editUser = async (request, response) => {
    let user = request.body;
    const editUser = new User(user);
    try{
        await User.updateOne({_id: request.params.id}, editUser);
        response.status(201).json(editUser);
    } catch (error){
        response.status(409).json({ message: error.message});     
    }
}

// deleting data of user from the database
export const deleteUser = async (request, response) => {
    try{
        await User.deleteOne({_id: request.params.id});
        response.status(201).json("User deleted Successfully");
    } catch (error){
        response.status(409).json({ message: error.message});     
    }
}

// for user page

// export const userPage = async (request, response) => {
//     const data = request.body;
//     console.log(data);
//     try{
//         const data =await User.findOne({email: request.params.email});
//         response.status(201).json(data);
//     } catch (error){
//         response.status(409).json({ message: error.message});
//     }
// }
// export const userPage = async (request, response) => {
//     try{
//         const data = await User.findOne({email: request.params.email});
//         response.status(200).json(data);
//     } catch (error){
//         response.status(404).json({ message: error.message});
//     }
// }
export const userPage = async (req, res) => {
    const { email } = req.query;
    try {
        const user = await UserModel.findOne({ email });
        if(!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
    }
}

