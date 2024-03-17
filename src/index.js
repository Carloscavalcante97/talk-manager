const express = require('express');
const path = require('path');
const { readJsonData, writeJsonData,
  searchJsonData, editJsonData, deletJsonData } = require('./Helpers/ fsFiles');
const validator = require('./Helpers/loginValidator');
const generateToken = require('./Helpers/tokenGenerator');
const tkValidator = require('./Helpers/tkValidator');
const authentication = require('./Helpers/authentication');

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
const PORT = process.env.PORT || '3001';
const PATH = path.resolve(__dirname, './talker.json');

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', async (_req, res) => {
  const talkerList = await readJsonData(PATH);
  if (!talkerList) return res.status(200).json([]);
  res.status(200).json(talkerList);
});

app.get('/talker/:id', async (req, res) => {
  const talkerList = await readJsonData(PATH);
  const { id } = req.params;

  const talkerListId = talkerList.find((e) => e.id === Number(id));
  if (!talkerListId) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  res.status(200).json(talkerListId);
});

app.post('/talker', authentication, tkValidator, async (req, res) => {
  const object = await writeJsonData(req.body);
  res.status(201).json(object);
});
app.post('/login', validator, async (_req, res) => {
  res.status(HTTP_OK_STATUS).json({ token: generateToken() });
});

app.put('/talker/:id', authentication, tkValidator, async (req, res) => {
  const object = await editJsonData(req.params.id, req.body);
  if (!object) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  res.status(HTTP_OK_STATUS).json(object);
});
app.delete('/talker/:id', authentication, async (req, res) => {
  const { id } = req.params;
  await deletJsonData(id);
  res.status(204).end();
});

app.get('/talker/search', authentication, async (req, res) => {
  res.status(HTTP_OK_STATUS).json(await searchJsonData(req.query.q));
});

app.listen(PORT, () => {
  console.log('Online');
});