/*
	Thi function create connection string according to Development environment
*/ 

import mongoose from 'mongoose';
mongoose.Promise = global.Promise;
module.exports = {
	makeConnectionString: function (cb) {
		var connectionString = 'mongodb://';
		if (process.env.DB_USER && process.env.DB_PASSWORD) {
			connectionString += process.env.DB_USER;
			connectionString += ':';
			connectionString += process.env.DB_PASSWORD;
			connectionString += '@';
		}
		if (!process.env.DB_HOST) {
			throw new Error('The field host is required.');
		}
		connectionString += process.env.DB_HOST;
		if (process.env.DB_PORT) {
			connectionString += ':';
			connectionString += process.env.DB_PORT;
		}
		connectionString += '/';
		connectionString += process.env.DB_NAME;

		return connectionString;
	}
};
