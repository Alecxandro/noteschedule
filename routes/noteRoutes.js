import express from "express";
import { getNotes, getNote, createNote, updateNote, deleteNote } from "../controllers/noteController.js";
import { protect } from "../middlewares/auth.js";

const router = express.Router();

router.use(protect);

router.route('/').get(getNotes).post(createNote);

router.route('/:id').get(getNote).put(updateNote).delete(deleteNote);

export default router;
