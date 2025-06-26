import axios from "axios";

const API_URL = "/api/produtos";

const listar = async () => {
  try {
    const { data } = await axios.get(API_URL);
    return data;
  } catch (error) {
    console.error("Erro ao listar produtos:", error);
    throw error;
  }
};

const obter = async (id) => {
  try {
    const { data } = await axios.get(`${API_URL}/${id}`);
    return data;
  } catch (error) {
    console.error(`Erro ao obter o produto com ID ${id}:`, error);
    throw error;
  }
};

const criar = async (produto) => {
  try {
    const { data } = await axios.post(API_URL, produto, {
      headers: { 'Content-Type': 'application/json' }
    });
    return data;
  } catch (error) {
    console.error("Erro ao criar produto:", error);
    throw error;
  }
};

const atualizar = async (id, produto) => {
  try {
    const { data } = await axios.put(`${API_URL}/${id}`, produto, {
      headers: { 'Content-Type': 'application/json' }
    });
    return data;
  } catch (error) {
    console.error(`Erro ao atualizar o produto com ID ${id}:`, error);
    throw error;
  }
};

const excluir = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
  } catch (error) {
    console.error(`Erro ao excluir o produto com ID ${id}:`, error);
    throw error;
  }
};

export default {
  listar,
  obter,
  criar,
  atualizar,
  excluir,
};
