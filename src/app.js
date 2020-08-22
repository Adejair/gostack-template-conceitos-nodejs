const express = require("express");
const cors = require("cors");

const { v4: uuid} = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.status(200).json(repositories);
});

app.post("/repositories", (request, response) => {
  const {title, url, techs} = request.body;

  const repositorie = {
    id: uuid(),
    title, 
    url,
    techs,
    likes: 0
  };

  repositories.push(repositorie);
  return response.status(200).json(repositorie);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const {title, url, techs} = request.body;
  const findRepositorieByIndex = repositories.findIndex(repositorie => repositorie.id === id);

  if(findRepositorieByIndex < 0) 
    return response.status(400).json({"error": "Repositorio não encontrado"});
  
  const repositorie = {
    id,
    title, 
    url,
    techs,
    likes: repositories[findRepositorieByIndex].likes
  };  

  repositories[findRepositorieByIndex] = repositorie;
  return response.status(200).json(repositorie);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const findRepositorieByIndex = repositories.findIndex(repositorie => repositorie.id === id);

  if(findRepositorieByIndex < 0) 
    return response.status(400).json({"error": "Repositorio não encontrado"});

  repositories.splice(findRepositorieByIndex, 1);
  return response.status(204).json();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;
  const findRepositorieByIndex = repositories.findIndex(repositorie => repositorie.id === id);

  if(findRepositorieByIndex < 0) 
    return response.status(400).json({"error": "Repositorio não encontrado"});
  
  repositories[findRepositorieByIndex].likes++;
  return response.status(200).json(repositories[findRepositorieByIndex]);
});

module.exports = app;
