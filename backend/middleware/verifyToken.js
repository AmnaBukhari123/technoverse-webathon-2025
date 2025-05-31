const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized: Missing or invalid Authorization header' });
  }

  const token = authHeader.split(' ')[1];
  console.log('Token received:', token); 

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Decoded payload:', decoded); 
    req.user = decoded;
    next();
  } catch (err) {
    console.error('JWT Verify Error:', err); 
    return res.status(401).json({ message: 'Unauthorized: Invalid token' });
  }
};
