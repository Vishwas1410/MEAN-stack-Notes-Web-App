import express from "express";
import AuthController from "../controllers/AuthController";
import { validateUser } from "../middleware/authenticate";
import NoteController from "../controllers/NoteController";
import UserController from "../controllers/UserController";
import TaskController from "../controllers/TaskController";

const router = express.Router();

//Auth Routes

router.post('/auth/login',AuthController.login);
router.post('/auth/googlelogin',AuthController.googleLogin);
router.post('/auth/register',AuthController.register);
router.get('/auth/me',validateUser,AuthController.me);
router.get('/auth/logout',validateUser,AuthController.logout);
router.get('/users',validateUser,UserController.getAllUsers);

//Notes Routes

router.get('/notes',validateUser,NoteController.getAllNotes);
router.get('/deletednotes',validateUser,NoteController.getDeletedNotes);
router.get('/notes/:id',validateUser,NoteController.getNotes);
router.get('/notes/:id/delete',validateUser,NoteController.deleteNotes);
router.get('/pinnednotes',validateUser,NoteController.pinnedNotes);
router.patch('/notes/:id/update',validateUser,NoteController.updateNote)
router.post('/notes',validateUser,NoteController.addNotes);

//Tasks Routes

router.patch('/tasks/:id/updatetask',validateUser,TaskController.updateTask)
router.patch('/tasks/:id/updatetaskprogress',validateUser,TaskController.taskProgress)
router.get('/completedtasks',validateUser,TaskController.completedTasks);
router.get('/tasks/:id/delete',validateUser,TaskController.deleteTasks);
router.get('/tasks/:id',validateUser,TaskController.getTasks);
router.get('/tasks',validateUser,TaskController.getAllTasks);
router.post('/tasks',validateUser,TaskController.addTask);








export default router;