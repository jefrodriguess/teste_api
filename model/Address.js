const mongoose = require("mongoose");

// Define o modelo
const addressSchema = mongoose.Schema(
  {
    cep: {
      type: String,
      required: true,
      unique: true, // Garante que o Cep seja unico registro
    },
    logradouro: {
      type: String,
      required: true,
    },
    bairro: {
      type: String,
      required: true,
    },
    cidade: {
      type: String,
      required: true,
    },
    estado: {
      type: String,
      required: true,
      MaxLength: 2, //Estado de ter até no maxímo 2 caracter Ex: SP
    },
  },
  {
    timeStamp: true, //regitra o horário de registro
  }
);

// Cria modelo
const Address = mongoose.model("Adress", addressSchema);

// Exporta o modelo para ser usado
module.exports = Address;
