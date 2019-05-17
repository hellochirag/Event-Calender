import express from 'express';

/*
    For authentication i have created both 
    Token base : In code i have used.
    Session-based : there is a file 'passport.js'. We can use it too for auth
*/

import auth from '../services/auth';
// CONTROLLERS
import eventController from '../controllers/event.controller';

const router = express.Router();

router.post("/", auth, eventController.createEvent); // Add Event
router.get("/", auth, eventController.getEvents); // Get Events
router.put("/:id", auth, eventController.updateEvent); // Update Event By Id
router.delete("/:id", auth, eventController.deleteEvent); // Delete Event By Id.

router.post("/:id/user", auth, eventController.addUserToEvent); // Add user to perticular Event
router.delete("/:id/user", auth, eventController.deleteUserToEvent); // Delete user to perticular Event
router.get("/inAdded", auth, eventController.inAdded); // Get Event You Added in

export default router;
