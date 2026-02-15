const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const router = express.Router();

let users = [];

router.post("/register", async (req, res) => {
  const { email, password } = req.body;

  const userExists = users.find(user => user.email === email);

  if (userExists) {
    return res.status(400).json({ message: "Usuário já existe" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = {
    email,
    password: hashedPassword
  };

  users.push(newUser);

  res.status(201).json({ message: "Usuário criado com sucesso" });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = users.find(user => user.email === email);

  if (!user) {
    return res.status(400).json({ message: "Usuário não encontrado" });
  }

  const validPassword = await bcrypt.compare(password, user.password);

  if (!validPassword) {
    return res.status(401).json({ message: "Senha inválida" });
  }

  const token = jwt.sign(
    { email: user.email },
    process.env.SECRET,
    { expiresIn: "1h" }
  );

  res.json({ token });
});

module.exports = router;
