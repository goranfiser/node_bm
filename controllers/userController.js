const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

class UserController {
  constructor(User) {
    this.User = User;
  }

  async register(req, res) {console.log(req.body);
    const { name, email, password } = req.body;

    try {
      // Check if user already exists
      let user = await this.User.findOne({ where: { email } });
      if (user) {
        return res.status(400).json({ message: 'User already exists' });
      }

      // Hash the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Create a new user record
      user = await this.User.create({
        name,
        email,
        password: hashedPassword,
      });

      // Generate a JWT token
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);

      res.status(201).json({ user, token });
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ message: 'Server Error' });
    }
  }

  async login(req, res) {
    const { email, password } = req.body;

    try {
      // Check if user exists
      const user = await this.User.findOne({ where: { email } });
      if (!user) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }

      // Check if password is correct
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }

      // Generate a JWT token
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);

      res.json({ user, token });
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ message: 'Server Error' });
    }
  }
}

module.exports = UserController;
