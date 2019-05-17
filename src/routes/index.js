import express from 'express';
// routes
import userRoutes from './user.routes';
import eventRoutes from './event.routes';

const router = express.Router({ mergeParams: true });

// Middlewares to use for all requests
router.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
	res.header("Access-Control-Expose-Headers", "X-My-Custom-Header, X-Another-Custom-Header");
	req.isApi = true;
	next();
});

export default () => {
	router.use('/user', userRoutes);
	router.use('/event', eventRoutes);
	return router.use(process.env.BASE_URL, router);
}
