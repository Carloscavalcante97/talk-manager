const validator = (req, res, prx) => {
  if (!req.body.email) {
    return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  }
  if (!req.body.password) {
    res.status(400).json({ message: 'O campo "password" é obrigatório' });
  }
  if (!/^(.+)@(.+)\.(.+)/.test(req.body.email)) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  if (req.body.password.length < 6) {
    return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
  prx();
};

module.exports = validator;