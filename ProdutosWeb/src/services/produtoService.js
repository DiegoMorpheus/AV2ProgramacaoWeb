import axios from "axios";

const API_URL = "/api/produtos";

// Remove o campo "id" e campos nulos ou inválidos
const limparProduto = (produto) => {
  const { id, ...restante } = produto;
  const limpo = {};

  for (const chave in restante) {
    const valor = restante[chave];
    if (
      valor !== undefined &&
      valor !== null &&
      (typeof valor === "string" ? valor.trim() !== "" : true)
    ) {
      limpo[chave] = valor;
    }
  }

  return limpo;
};

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

// Obtém um produto por ID
const obter = async (id) => {
  try {
    const { data } = await axios.get(`${API_URL}/${id}`);
    return data;
  } catch (error) {
    console.error(`Erro ao obter o produto com ID ${id}:`, error);
    throw error;
  }
};

// Cria um novo produto
const criar = async (produto) => {
  try {
    if (!produto.nome || typeof produto.preco !== "number" || produto.preco < 0) {
      throw new Error("Dados inválidos: nome é obrigatório e preço deve ser um número não-negativo.");
    }

    const produtoPronto = limparProduto(produto);
    const { data } = await axios.post(API_URL, produtoPronto, {
      headers: { "Content-Type": "application/json" }
    });

    return data;
  } catch (error) {
    console.error("Erro ao criar produto:", error);
    console.log("Produto enviado:", produto);
    console.log("Resposta do servidor:", error.response?.data);
    throw error;
  }
};

// Atualiza um produto por ID
const atualizar = async (id, produto) => {
  try {
    if (!produto.nome || typeof produto.preco !== "number" || produto.preco < 0) {
      throw new Error("Dados inválidos: nome é obrigatório e preço deve ser um número não-negativo.");
    }

    const produtoPronto = limparProduto(produto);
    const { data } = await axios.put(`${API_URL}/${id}`, produtoPronto, {
      headers: { "Content-Type": "application/json" }
    });

    return data;
  } catch (error) {
    console.error(`Erro ao atualizar produto com ID ${id}:`, error);
    console.log("Produto enviado:", produto);
    console.log("Resposta do servidor:", error.response?.data);
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

export default {
  listar,
  obter,
  criar,
  atualizar,
  excluir,
};
