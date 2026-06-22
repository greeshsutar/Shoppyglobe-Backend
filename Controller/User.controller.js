async function signup(req, res) {
  try {
    const { firstname, lastname, email, password } = req.body;

    // validation
    if (!firstname || !lastname || !email || !password) {
      return res.status(400).send({ message: "All fields required" });
    }

    if (password.length < 6) {
      return res.status(400).send({ message: "Password must be at least 6 characters" });
    }

    // check existing user
    const existingUser = await loginModel.findOne({ email });

    if (existingUser) {
      return res.status(400).send({ message: "User already exists" });
    }

    // create user
    const user = await loginModel.create({
      firstname,
      lastname,
      email,
      password: await bcrypt.hash(password, 10),
    });

    return res.send({
      message: "Signup successful",
      user: {
        id: user._id,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email
      }
    });

  } catch (err) {
    console.error(err);
    return res.status(500).send({ message: "Signup error" });
  }
}


//login 
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

async function login(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send({ message: "Email and password required" });
    }

    const user = await loginModel.findOne({ email });

    if (!user) {
      return res.status(400).send({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).send({ message: "Invalid password" });
    }

    //  JWT ONLY HERE
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return res.send({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email
      }
    });

  } catch (err) {
    console.error(err);
    return res.status(500).send({ message: "Login error" });
  }
}