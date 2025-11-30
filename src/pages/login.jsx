import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import authService from '../services/auth';
import '../css/style.css';
import '../css/login.css';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
    
    if (name === 'email' && value && !authService.validateEmail(value)) {
      setErrors(prev => ({ ...prev, email: 'E-mail inválido' }));
    } else if (name === 'email' && value && authService.validateEmail(value)) {
      setErrors(prev => ({ ...prev, email: '' }));
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    const newErrors = {};
    if (!formData.email) {
      newErrors.email = "Email é obrigatório";
    } else if (!authService.validateEmail(formData.email)) {
      newErrors.email = "Por favor, insira um e-mail válido";
    }
    
    if (!formData.password) {
      newErrors.password = "Senha é obrigatória";
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setLoading(false);
      return;
    }

    try {
      await authService.handleLogin(formData.email, formData.password);
      navigate('/');
      
    } catch (error) {
      setErrors({ general: error.message });
      setPopupMessage(error.message || "Erro ao fazer login");
      setShowPopup(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* POPUP DE ERRO */}
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-box">
            <p>{popupMessage}</p>
            <button onClick={() => setShowPopup(false)}>OK</button>
          </div>
        </div>
      )}

      <main>
        <div className="container">
          <div className="auth-container">
            <form id="login-form" className="auth-form active" onSubmit={handleLogin}>
              <img 
                src="./public/img/Findit-logo.png" 
                alt="Logo FindIt" 
                style={{ width: '80px', display: 'block', margin: '48px auto' }}
              />
              <h2>Faça o login na sua conta</h2>

              {errors.general && (
                <div className="error-message general-error">
                  {errors.general}
                </div>
              )}

              <div className="form-group">
                <label htmlFor="login-email">E-mail</label>
                <input 
                  type="email" 
                  id="login-email" 
                  name="email" 
                  placeholder="exemplo@uemg.com" 
                  value={formData.email}
                  onChange={handleInputChange}
                  required 
                  disabled={loading}
                  className={errors.email ? 'error' : ''}
                />
                <div className="error-message" id="login-email-error">
                  {errors.email}
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="login-password">Senha</label>
                <input 
                  type="password" 
                  id="login-password" 
                  name="password" 
                  placeholder="Digite sua senha" 
                  value={formData.password}
                  onChange={handleInputChange}
                  required 
                  disabled={loading}
                  className={errors.password ? 'error' : ''}
                />
                <div className="error-message" id="login-password-error">
                  {errors.password}
                </div>
              </div>

              <button 
                type="submit" 
                className={`auth-btn ${loading ? 'loading' : ''}`}
                disabled={loading}
              >
                {loading ? "Entrando..." : "Entrar"}
              </button>
              
              <div className="auth-switch">
                Não é registrado? <Link to="/signup">Crie sua conta</Link>
              </div>
            </form>
          </div>
        </div>
      </main>
    </>
  );
};

export default Login;
