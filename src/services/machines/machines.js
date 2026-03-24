import api from "../../plugin/api";

class MachinesService {
  async getMachines() {
    try {
      const response = await api.get("/maquinas");
      return response.data;
    } catch (error) {
      console.error("Error fetching machines:", error);
      throw error;
    }
  }

  async updateMachine(id, payload) {
    try {
      const response = await api.put(`/maquinas/${id}`, payload);
      return response.data;
    } catch (error) {
      if (!error.response) {
        throw new Error("Sem conexão com o servidor. Verifique sua rede.");
      }

      throw new Error(
        error.response?.data?.message ??
          `Erro ${error.response.status} ao atualizar a máquina.`,
      );
    }
  }
}

export default new MachinesService();
