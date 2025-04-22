const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const user = require ('../models/usermodel.js')
const twilio = require('twilio');

const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

exports.register = async (req, res) => {
  try {
    const { name, email, password, phone, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const smsToken = Math.floor(100000 + Math.random() * 900000).toString();
    const smsTokenExpires = new Date(Date.now() + 5 * 60 * 1000);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      phone,
      role,
      smsToken,
      smsTokenExpires,
    });

    await client.messages.create({
      body: `Your verification code is ${smsToken}`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: phone,
    });

    res.status(201).json({ message: 'Verification code sent to phone.' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.verifyToken = async (req, res) => {
  try {
    const { phone, token } = req.body;
    const user = await User.findOne({ phone });

    if (!user || user.smsToken !== token || user.smsTokenExpires < Date.now()) {
      return res.status(400).json({ error: 'Invalid or expired token.' });
    }

    user.smsToken = undefined;
    user.smsTokenExpires = undefined;
    await user.save();

    const jwtToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.json({ token: jwtToken });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};