import axios from "axios";

const API_URL = "/api/produtos";

// Lista todos os produtos
const listar = async () => {
  try {
    const { data } = await axios.get(API_URL);
    return data;
  } catch (error) {
    console.error("Erro ao listar produtos:", error);
    throw error;
  }
};

// Obtém um produto por ID (para visualização ou edição)
const obter = async (id) => {
  try {
    const { data } = await axios.get(`${API_URL}/${id}`);
    return data;
  } catch (error) {
    console.error(`Erro ao obter o produto com ID ${id}:`, error);
    throw error;
  }
};

// Cria um novo produto, sem enviar o campo ID
const criar = async (produto) => {
  try {
    const { id, ...produtoSemId } = produto; // Remove o ID, se existir
    const { data } = await axios.post(API_URL, produtoSemId, {
      headers: { 'Content-Type': 'application/json' }
    });
    return data;
  } catch (error) {
    console.error("Erro ao criar produto:", error);
    console.log("Detalhes do erro:", error.response?.data);
    throw error;
  }
};

// Atualiza um produto existente por ID
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

// Exclui um produto por ID
const excluir = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
  } catch (error) {
    console.error(`Erro ao excluir o produto com ID ${id}:`, error);
    throw error;
  }
};

// Exporta todas as funções para uso no app
export default {
  listar,
  obter,
  criar,
  atualizar,
  excluir,
};
