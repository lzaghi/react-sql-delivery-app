const validateLoginBody = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).send({ message: 'All fields must be filled' });
  }
  
  const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  const validEmail = emailRegex.test(email);
  if (!validEmail) {
    return res.status(401).send({ message: 'Invalid email' });
  }
  if (password.length < 6) {
    return res.status(401).send({ message: 'Invalid password' });
  }
  next();
};

module.exports = {
  validateLoginBody,
};