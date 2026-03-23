class LoginService {
  async login(email, password) {
    try {
      const ENV_USER = import.meta.env.VITE_REACT_APP_LOGIN_USER;
      const ENV_PASS = import.meta.env.VITE_REACT_APP_LOGIN_PASS;
      
      await new Promise((resolve) => setTimeout(resolve, 500));
      
      console.log("Tentativa de login:", { email });
      
      if (email === ENV_USER && password === ENV_PASS) {
        return {
          status: 200,
          data: {
            user: { email },
            token: "fake-jwt-token",
          },
        };
      }
      
      throw new Error("Credenciais inválidas");
      
    } catch (error) {
      console.error("Erro no login:", error);
      throw error;
    }
  }
}

export default new LoginService();