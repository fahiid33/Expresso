import { Router, response } from "express";
import {
    registerUser, 
    getUsers, 
    getUserByName,
    deleteAllUsers,
    deleteUserByName
} from '../controllers/user.controller'

const router = Router();

router.get('/:name', getUserByName)


// router.get('/:id', getUserById)

router.get('/', getUsers)

router.post('/register', registerUser);
router.delete('/', deleteAllUsers)
router.delete('/:name', deleteUserByName)




export default router;

