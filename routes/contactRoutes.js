import express from "express";
import { getContacts, getContact, createContact, updateContact, deleteContact } from "../controllers/contactController.js";
import { protect } from "../middlewares/auth.js";

const router = express.Router();

router.use(protect);

router.route('/')
    .get(getContacts)
    .post(createContact);

router.route('/:id')
    .get(getContact)
    .put(updateContact)
    .delete(deleteContact);

export default router;