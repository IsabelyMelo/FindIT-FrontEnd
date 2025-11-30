import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import authService from '../services/auth';
import '../css/style.css';
import '../css/footer.css';

const Home = () => {
  const navigate = useNavigate();
  const [tipoUsuario, setTipoUsuario] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const checkAuth = () => {
      if (!authService.isLoggedIn()) {
        navigate('/login');
        return;
      }

      const user = authService.getCurrentUser();
      if (user) {
        setIsLoggedIn(true);
        setTipoUsuario(user.tipo || (user.isAdmin ? 'admin' : 'user'));
        setUserName(user.nome);
        
        localStorage.setItem("loggedIn", "true");
        localStorage.setItem("tipoUsuario", user.tipo || (user.isAdmin ? 'admin' : 'user'));
      } else {
        const loggedIn = localStorage.getItem("loggedIn") === "true";
        const userType = localStorage.getItem("tipoUsuario");
        const userData = localStorage.getItem("userData");
        
        if (loggedIn && userData) {
          const user = JSON.parse(userData);
          setIsLoggedIn(true);
          setTipoUsuario(userType);
          setUserName(user.nome);
          authService.currentUser = user; 
        } else {
          navigate('/login');
        }
      }
    };

    checkAuth();
  }, [navigate]);

  const handleLogout = () => {
    authService.logout();
    navigate('/login');
  };

  if (!isLoggedIn) {
    return (
      <div className="loading-container">
        <div className="loading">Carregando...</div>
      </div>
    );
  }

  return (
    <main>

      {tipoUsuario === "admin" && (
        <section className="admin-section">
          <div className="container">
            <img src="./public/img/Findit-logo.png" alt="Logo FindIt" className="home-logo" />

            <div className="admin-actions">
              <div className="action-card">
                <Link to="/cadastrar-item" className="btn btn-admin"><h3>CADASTRAR ITEM ENCONTRADO</h3></Link>
              </div>
              <div className="action-card">
                <Link to="/itens" className="btn btn-admin"><h3>BUSCAR ITEM PERDIDO</h3></Link>
              </div>
              <div className="action-card">
                <Link to="/gerenciar-itens" className="btn btn-admin"><h3>GERENCIAR ITENS</h3></Link>
              </div>
              <div className="action-card">
                <button onClick={handleLogout} className="btn btn-logout"><h3>LOGOUT</h3></button>
              </div>
            </div>
          </div>
        </section>
      )}

      {tipoUsuario === "user" && (
        <section className="user-section">
          <div className="container">

            <img src="/public/img/Findit-logo.png" alt="Logo FindIt" className="home-logo" />

            <div className="user-actions">

              <div className="action-card">
                <Link to="/itens" className="btn btn-user">
                  <h3>BUSCAR ITEM PERDIDO</h3>
                </Link>
              </div>

              <div className="action-card">
                <button onClick={handleLogout} className="btn btn-logout">
                  <h3>LOGOUT</h3>
                </button>
              </div>

            </div>
          </div>
        </section>
      )}

      <section className="hero-section">
        <div className="container hero-container">

          <div className="hero-text">
            <h2>Procure o que foi perdido aqui.</h2>
            <p>Encontre seu item perdido na Universidade Estadual de Minas Gerais na unidadede Divinópolis.</p>
            <Link to="/itens" className="btn btn-searchNow">PROCURE AGORA</Link>
          </div>

          <div className="hero-image">
            <img src="./public/img/uemg.png" alt="Universidade do Estado de Minas" />
          </div>

        </div>
      </section>

    </main>
  );
};

export default Home;
