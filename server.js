const express = require("express");
const axios = require("axios");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Address = require("./model/Address");

// Carrega as variaveis de ambente do arquivo .env
dotenv.config();

//Cria uma instãncia do Express -> Servidor
const app = express();

app.use((req, res, next) => {
  res.header("Acess-Control-Allow-Origin", "*"); // Permite qualquer origem para req.
  res.header("Acess-Control-Allow-Methods", "GET", "POST"); //Permite apenas métodos GET e POST
  res.header("Acess-Control-Aloow-Headers", "Content-Type"); //Permite a cabeçalho nas req,
  next();
});

//JSON nas req. / Config do Expess
app.use(express.json());

app.get("/api/cep/:cep", async (req, res) => {
  const { cep } = req.params; //Extrai o Cep

  try {
    //Requisição GET para a API ViaCep, passando um Cep
    const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
    res.json(response.data); //Retorna da API a resposta conforme o CEP
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar o CEP!" }); //Em caso de erro
  }
});

// Obtem as variaveis do .env
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASS;

//Defini o link de conexão com o MongoDB
const mongoURI = `mongodb+srv://${dbUser}:${dbPassword}@cluster-api.r4sn2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster-API`;

const port = 3000;

mongoose
  .connect(mongoURI)
  .then(() => {
    console.log("Conectou ao Banco"); // Conecta ao banco de dados com Link gerado
    app.listen(port, () => {
      //Quando conexão bem sucedida
      console.log(`Servidor rodando em http://localhost:${port}`);
    });
  })
  .catch((err) => console.log("Erro ao conectar ao MongoDB, err"));
