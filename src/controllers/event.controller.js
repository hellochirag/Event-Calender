//Models
import EventModel from '../models/event.model';

const EventControllers = {
	createEvent: async (req, res) => {

		if (new Date(req.body.endDatetime) - new Date(req.body.startDatetime) <= 0) {
			return res.json({ isError: true, errorMessage: 'End date should be bigger that start date' });
		}
		const event = {
			name: req.body.name,
			startDatetime: new Date(req.body.startDatetime),
			endDateTime: new Date(req.body.endDateTime),
			owner: req.user.id,
			location: req.body.location || '',
		};
		let newEvent = {};
		try {
			newEvent = await EventModel.createEvent(event);
		} catch (error) {
			return res.json({ isError: true, errorMessage: error.message });
		}

		res.status(200).json({
			isError: false,
			data: newEvent,
			message: 'Event added successfully.',
		});
	},

	addUserToEvent: async (req, res) => {
		let updateResponse = {};
		try {
			updateResponse = await EventModel.updateEvent({ _id: req.params.id, owner: req.user.id }, { $addToSet: { usersInTheEvent: req.body.userId } });
		} catch (error) {
			return res.json({ isError: true, errorMessage: error.message });
		}

		res.status(200).json({
			isError: false,
			data: updateResponse,
			message: 'Added successfully.',
		});
	},

	deleteUserToEvent: async (req, res) => {
		let updateResponse = {};
		try {
			updateResponse = await EventModel.updateEvent({ _id: req.params.id, owner: req.user.id }, { $pull: { usersInTheEvent: req.body.userId } });
		} catch (error) {
			return res.json({ isError: true, errorMessage: error.message });
		}

		res.status(200).json({
			isError: false,
			data: updateResponse,
			message: 'Added successfully.',
		});
	},

	updateEvent: async (req, res) => {
		let updateResponse = {};
		try {
			updateResponse = await EventModel.updateEvent({ _id: req.params.id, owner: req.user.id }, { ...req.body });
		} catch (error) {
			return res.json({ isError: true, errorMessage: error.message });
		}

		res.status(200).json({
			isError: false,
			data: updateResponse,
			message: 'Edited successfully.',
		});
	},

	deleteEvent: async (req, res) => {
		let updateResponse = {};
		try {
			updateResponse = await EventModel.deleteEvent({ _id: req.params.id, owner: req.user.id });
		} catch (error) {
			return res.json({ isError: true, errorMessage: error.message });
		}

		res.status(200).json({
			isError: false,
			data: updateResponse,
			message: 'Deleted successfully.',
		});
	},

	getEvents: async (req, res) => {
		let events = [];

		const where = { owner: req.user.id };

		if (req.query.name) {
			where['name'] = { $regex: req.query.name, $options: 'i' };
		}
		if (req.query.location) {
			where['location'] = { $regex: req.query.location, $options: 'i' };
		}
		if (req.query.startDate) {
			where['startDatetime'] = { $gt: new Date(req.query.startDate) };
		}
		if (req.query.endDate) {
			where['startDatetime'] = { $lt: new Date(req.query.endDate) };
		}
		if (req.query.startDate) {
			where['startDatetime'] = { $gt: new Date(req.query.startDate) };
		}
		if (req.query.isOnlyPast) {
			where['endDatetime'] = { $lt: new Date() };
		}

		try {
			events = await EventModel.getEvents(where);
		} catch (error) {
			return res.json({ isError: true, errorMessage: error.message });
		}

		res.status(200).json({
			isError: false,
			data: events,
			message: 'Fetched successfully.',
		});
	},

	inAdded: async (req, res) => {
		let events = [];

		const where = { usersInTheEvent: req.user.id };

		if (req.query.name) {
			where['name'] = { $regex: req.query.name, $options: 'i' };
		}
		if (req.query.location) {
			where['location'] = { $regex: req.query.location, $options: 'i' };
		}
		if (req.query.startDate) {
			where['startDatetime'] = { $gt: new Date(req.query.startDate) };
		}
		if (req.query.endDate) {
			where['startDatetime'] = { $lt: new Date(req.query.endDate) };
		}
		if (req.query.startDate) {
			where['startDatetime'] = { $gt: new Date(req.query.startDate) };
		}
		if (req.query.isOnlyPast) {
			where['endDatetime'] = { $lt: new Date() };
		}

		try {
			events = await EventModel.getEvents();
		} catch (error) {
			return res.json({ isError: true, errorMessage: error.message });
		}

		res.status(200).json({
			isError: false,
			data: events,
			message: 'Fetched successfully.',
		});
	},

};

export default EventControllers;
