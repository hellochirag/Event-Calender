import mongoose, { Schema } from 'mongoose';

const EventSchema = mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	startDatetime: {
		type: Date,
		required: true,
	},
	endDateTime: {
		type: Date,
		required: true,
	},
	usersInTheEvent: {
		type: [{ type: Schema.Types.ObjectId, ref: 'user', autopopulate: true }],
		default: [],
	},
	owner: {
		type: String,
		required: true,
	},
	location: {
		type: String,
		default: '',
	}
});

const Event = mongoose.model('events', EventSchema);

Event.createEvent = (newEvent) => {
	return new Promise((res, rej) => {
		Event(newEvent).save((err, data) => {
			if (err) rej(err);
			res(data);
		});
	});
};

Event.getEvent = (query) => {
	return new Promise((res, rej) => {
		Event.findOne(query, (err, data) => {
			if (err) rej(err);
			res(data);
		});
	});
};

Event.getEvents = (query) => {
	return new Promise((res, rej) => {
		Event.find(query, (err, data) => {
			if (err) rej(err);
			res(data);
		});
	});
};

Event.updateEvent = (conditions, update) => {
	return new Promise((res, rej) => {
		Event.findOneAndUpdate(conditions, update, { "new": true }, (err, data) => {
			if (err) rej(err);
			res(data);
		});
	});
};

Event.deleteEvent = (query) => {
	return new Promise((res, rej) => {
		Event.remove(query, (err, data) => {
			if (err) rej(err);
			res(data);
		});
	});
};

export default Event;
