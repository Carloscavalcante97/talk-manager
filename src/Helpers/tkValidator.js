const validateName = (name) => {
  if (!name) {
    return 'O campo "name" é obrigatório';
  }
  if (name.length < 3) {
    return 'O "name" deve ter pelo menos 3 caracteres';
  }
};
    
const validateAge = (age) => {
  if (!age) {
    return 'O campo "age" é obrigatório';
  }
  if (age < 18 || (!Number.isInteger(age))) {
    return 'O campo "age" deve ser um número inteiro igual ou maior que 18';
  } 
};
    
const validateWatchedAt = (talk) => {
  if (!talk.watchedAt) {
    return 'O campo "watchedAt" é obrigatório';
  }
  if (!/\d{2}\/\d{2}\/\d{4}/.test(talk.watchedAt)) {
    return 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"';
  }
};
    
const validateRateNumber = (talk) => {
  if (!Number.isInteger(talk.rate) || !(talk.rate >= 1 && talk.rate <= 5)) {
    return 'O campo "rate" deve ser um número inteiro entre 1 e 5';
  }
};
    
const validateRate = (talk) => {
  if (talk.rate === undefined || talk.rate === null) {
    return 'O campo "rate" é obrigatório';
  }
  return validateRateNumber(talk);
};
    
const validateTalk = (talk) => {
  if (!talk) {
    return 'O campo "talk" é obrigatório';
  }
  let errorMessage = validateWatchedAt(talk);
  if (errorMessage) return errorMessage;
  errorMessage = validateRate(talk);
  if (errorMessage) return errorMessage;
};
    
const tkValidator = (req, res, next) => {
  let errorMessage = validateName(req.body.name);
  if (errorMessage) return res.status(400).json({ message: errorMessage });
  errorMessage = validateAge(req.body.age);
  if (errorMessage) return res.status(400).json({ message: errorMessage });
  errorMessage = validateTalk(req.body.talk);
  if (errorMessage) return res.status(400).json({ message: errorMessage });
    
  next();
};
    
module.exports = tkValidator;
