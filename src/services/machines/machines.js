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
      // Exemplo de payload: { nome: 'Torno CNC 203', descricao: 'Revisada', local: 'Setor B' }
      const response = await api.post(`/maquinas/${id}`, payload);
      return response.data;
    } catch (error) {
      console.error("Error updating machine:", error);
      throw error;
    }
  }
}

export default new MachinesService();
