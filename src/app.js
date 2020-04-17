const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;
  
  const repo = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0,
  };
  repositories.push(repo);
  
  response.json(repo);

});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, url, techs} = request.body;

  const index  = repositories.findIndex(repository => repository.id === id);

  if (index < 0) {
    return response.status(400).json({ error: 'Repository not Found'});
  }

  const repository = Object.assign(repositories[index], {
    title,
    url,
    techs,
  });
  
  repositories[index] = repository;

  return response.json(repositories[index]);

});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const index  = repositories.findIndex(repository => repository.id === id);

  if (index < 0) {
    return response.status(400).json({ error: 'Repository not Found'});
  }

  repositories.splice(index, 1);

  response.status(204).send();

});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;
  
  const index  = repositories.findIndex(repository => repository.id === id);

  if (index < 0) {
    return response.status(400).json({ error: 'Repository not Found'});
  }

  repositories[index].likes ++;
  
  response.json(repositories[index]);
});

module.exports = app;
