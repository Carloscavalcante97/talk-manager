const fs = require('fs').promises;
const path = require('path');

const PATH = path.resolve(__dirname, '../talker.json');

const readJsonData = async () => {
  const content = await fs.readFile(PATH, 'utf8');
  return JSON.parse(content);
};

const writeJsonData = async (data) => {
  const list = await readJsonData();
  const object = data;
  object.id = list.length + 1;
  await fs.writeFile(PATH, JSON.stringify([...list, object], null, 2));
  return object;
};

const editJsonData = async (id, data) => {
  const list = await readJsonData();
  const object = data;
  const objectFind = list.findIndex((talkerSearch) => talkerSearch.id === Number(id));
  if (objectFind === -1) return;
  object.id = Number(id);
  list[objectFind] = object;

  await fs.writeFile(PATH, JSON.stringify(list, null, 2));
  return object;
};
const deletJsonData = async (id) => {
  const list = await readJsonData();
  const object = list.findIndex((talkerSearch) => talkerSearch.id === Number(id));
  if (object === -1) return;
  list.splice(object, 1);
  await fs.writeFile(PATH, JSON.stringify(list, null, 2));
};
const searchJsonData = async (searchTerm) => {
  try {
    const object = await readJsonData();
    if (!searchTerm) {
      return object;
    }
    return object.filter((talker) => talker.name.includes(searchTerm));
  } catch (error) {
    console.error('Erro ao pesquisar no arquivo JSON:', error);
    throw error;
  }
};

module.exports = { writeJsonData, readJsonData, editJsonData, deletJsonData, searchJsonData };
