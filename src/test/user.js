process.env.NODE_ENV = 'testing';
import mongoose from 'mongoose';
import chai from 'chai';
import chaiHttp from 'chai-http';

import server from '../index';
let should = chai.should();

import User from '../models/user.model';
/*
	I am not too good at write test cases but i tried. :)
*/ 
chai.use(chaiHttp);
//Our parent block
describe('Users', () => {
	beforeEach((done) => { //Before each test we empty the database
		User.remove({}, (err) => {
			done();
		});
	});
	/*
		* Test the /GET route
		*/
	describe('/Add User', () => {
		it('it should add the user', (done) => {
			const user = {
				firstName: "test",
				lastName: "test",
				email: "test",
				userName: "test",
				password: "test"
			}
			chai.request(server)
				.post(`${process.env.BASE_URL}/user/signUp`)
				.send(user)
				.end((err, res) => {
					res.should.have.status(200);
					// res.body.should.be.a('array');
					// res.body.length.should.be.eql(0);
					done();
				});
		});
	});

});
