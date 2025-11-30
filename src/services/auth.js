class AuthService {
  constructor() {
    this.currentUser = null;
    this.loadSession();
  }

  // Carrega sessão, se existir
  loadSession() {
    const storedUser = localStorage.getItem("userData");
    if (storedUser) {
      this.currentUser = JSON.parse(storedUser);
    }
  }

  // VALIDAÇÕES
  validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  validatePassword(password) {
    return password && password.length >= 6;
  }

  // LOGIN
  async handleLogin(email, password) {
    return new Promise((resolve, reject) => {
      if (!email || !this.validateEmail(email)) {
        reject(new Error("Por favor, insira um e-mail válido"));
        return;
      }

      if (!password) {
        reject(new Error("Por favor, insira sua senha"));
        return;
      }

      setTimeout(() => {
        const users = JSON.parse(localStorage.getItem("users") || "[]");
        const user = users.find(
          (u) => u.email === email && u.password === password
        );

        if (!user) {
          reject(new Error("E-mail ou senha incorretos"));
          return;
        }

        // Remove senha antes de salvar na sessão
        const { password: _, ...userWithoutPassword } = user;

        this.currentUser = userWithoutPassword;
        localStorage.setItem("userData", JSON.stringify(userWithoutPassword));
        localStorage.setItem("loggedIn", "true");

        resolve(userWithoutPassword);
      }, 800);
    });
  }

  // CADASTRO (não faz login automático)
  async handleCadastro(data) {
    return new Promise((resolve, reject) => {
      const { nome, email, password, confirmPassword, isAdmin } = data;

      if (!nome || nome.trim().length < 2) {
        reject(new Error("Nome deve ter pelo menos 2 caracteres"));
        return;
      }

      if (!email || !this.validateEmail(email)) {
        reject(new Error("Por favor, insira um e-mail válido"));
        return;
      }

      if (!password || !this.validatePassword(password)) {
        reject(new Error("Senha deve ter pelo menos 6 caracteres"));
        return;
      }

      if (password !== confirmPassword) {
        reject(new Error("As senhas não coincidem"));
        return;
      }

      setTimeout(() => {
        const users = JSON.parse(localStorage.getItem("users") || "[]");

        if (users.some((u) => u.email === email)) {
          reject(new Error("E-mail já cadastrado"));
          return;
        }

        const newUser = {
          id: Date.now(),
          nome,
          email,
          password,
          isAdmin: isAdmin || false,
          dataCadastro: new Date().toISOString(),
        };

        users.push(newUser);
        localStorage.setItem("users", JSON.stringify(users));

        resolve({ success: true });
      }, 900);
    });
  }

  // CONTROLE DE SESSÃO
  isLoggedIn() {
    return localStorage.getItem("loggedIn") === "true";
  }

  getCurrentUser() {
    const data = localStorage.getItem("userData");
    if (!data) return null;

    try {
      return JSON.parse(data);
    } catch {
      return null;
    }
  }

  logout() {
    this.currentUser = null;
    localStorage.removeItem("userData");
    localStorage.removeItem("loggedIn");
  }
}

// Instância única
const authService = new AuthService();
export default authService;
