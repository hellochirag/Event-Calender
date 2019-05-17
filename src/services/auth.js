import jwt from 'jsonwebtoken';

// Token base Auth
export default (req, res, next) => {
	const { authorization } = req.headers;
	if (!authorization){
		return res.json({ isError: true, errorMessage: 'Tokem must be provided.' });
	}

	return jwt.verify(authorization, process.env.SECRET, function (err, decoded) {
		if (err) return res.json({ isError: true, errorMessage: err.message });
		req.user = decoded;
		next();
	});
};
