import { Router, response } from "express";
import {
    registerUser, 
    getUsers, 
    getUserByName,
    deleteAllUsers,
    deleteUserByName
} from '../controllers/user.controller'

import { Request, Response } from "express";
import { request } from "http";

const router = Router();

router.get('/:name', getUserByName)


// router.get('/:id', getUserById)

router.get('/', getUsers)

router.post('/register', registerUser);
router.delete('/', deleteAllUsers)
router.delete('/:name', deleteUserByName)




export default router;

