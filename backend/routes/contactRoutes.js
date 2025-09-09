import express from "express";
import ContactsController from "../controllers/ContactsController.js";

const router = express.Router();

router.get("/", ContactsController.getContacts);
router.get("/:id", ContactsController.getContactById);
router.post("/", ContactsController.createContact);
router.put("/:id", ContactsController.updateContact);
router.delete("/:id", ContactsController.deleteContact);

export default router;
