import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import authService from '../services/auth';
import '../css/style.css';
import '../css/login.css';

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    confirmEmail: '',
    password: '',
    confirmPassword: '',
    isAdmin: false
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // limpa erro daquele campo ao digitar
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }

    // valida email
    if (name === 'email' && value) {
      setErrors(prev => ({
        ...prev,
        email: authService.validateEmail(value) ? '' : 'E-mail inválido'
      }));
    }

    // valida password
    if (name === 'password' && value) {
      setErrors(prev => ({
        ...prev,
        password: authService.validatePassword(value)
          ? ''
          : 'Senha deve ter pelo menos 6 caracteres'
      }));
    }

    // emails iguais?
    if ((name === 'email' || name === 'confirmEmail') && formData.confirmEmail) {
      setErrors(prev => ({
        ...prev,
        confirmEmail:
          (name === 'email' && value !== formData.confirmEmail) ||
          (name === 'confirmEmail' && value !== formData.email)
            ? 'Os emails não coincidem'
            : ''
      }));
    }

    // senhas iguais?
    if ((name === 'password' || name === 'confirmPassword') && formData.confirmPassword) {
      setErrors(prev => ({
        ...prev,
        confirmPassword:
          (name === 'password' && value !== formData.confirmPassword) ||
          (name === 'confirmPassword' && value !== formData.password)
            ? 'As senhas não coincidem'
            : ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.nome || formData.nome.trim().length < 2) {
      newErrors.nome = "Nome deve ter pelo menos 2 caracteres";
    }

    if (!formData.email) {
      newErrors.email = "Email é obrigatório";
    } else if (!authService.validateEmail(formData.email)) {
      newErrors.email = "Por favor, insira um e-mail válido";
    }

    if (!formData.confirmEmail) {
      newErrors.confirmEmail = "Confirmação de email é obrigatória";
    } else if (formData.email !== formData.confirmEmail) {
      newErrors.confirmEmail = "Os emails não coincidem!";
    }

    if (!formData.password) {
      newErrors.password = "Senha é obrigatória";
    } else if (!authService.validatePassword(formData.password)) {
      newErrors.password = "A senha deve ter pelo menos 6 caracteres";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Confirmação de senha é obrigatória";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "As senhas não coincidem!";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    if (!validateForm()) {
      setLoading(false);

      setPopupMessage("Preencha todos os campos corretamente!");
       setShowPopup(true);
      return;
    }

    try {
      const userData = {
        nome: formData.nome.trim(),
        email: formData.email,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
        isAdmin: formData.isAdmin
      };

      await authService.handleCadastro(userData);

      navigate('/login', {
        state: {
          message: 'Cadastro realizado com sucesso! Agora faça login.',
          preFilledEmail: formData.email
        }
      });

    } catch (error) {
      console.log("ERRO AO CADASTRAR:", error);

      const msg = error?.message || "Erro inesperado ao cadastrar.";
      setErrors({ general: msg });

      setPopupMessage(msg);
      setShowPopup(true);
    }

    setLoading(false);
  };

  return (
    <>
      {/* === POPUP === */}
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
            <form id="cadastro-form" className="auth-form active" onSubmit={handleSignup}>

              <img
                src="/img/Findit-logo.png"
                alt="Logo FindIt"
                style={{ width: '80px', display: 'block', margin: '48px auto' }}
              />

              <h2>Faça o cadastro da sua conta</h2>

              {errors.general && (
                <div className="error-message general-error">
                  {errors.general}
                </div>
              )}

              <div className="form-group">
                <label htmlFor="cadastro-nome">Nome Completo</label>
                <input
                  type="text"
                  id="cadastro-nome"
                  name="nome"
                  value={formData.nome}
                  onChange={handleInputChange}
                  disabled={loading}
                  className={errors.nome ? 'error' : ''}
                  placeholder="Seu nome completo"
                />
                <div className="error-message">{errors.nome}</div>
              </div>

              <div className="form-group">
                <label htmlFor="cadastro-email">E-mail</label>
                <input
                  type="email"
                  id="cadastro-email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  disabled={loading}
                  className={errors.email ? 'error' : ''}
                  placeholder="exemplo@uemg.com"
                />
                <div className="error-message">{errors.email}</div>
              </div>

              <div className="form-group">
                <label htmlFor="cadastro-email-conf">Confirmar E-mail</label>
                <input
                  type="email"
                  id="cadastro-email-conf"
                  name="confirmEmail"
                  value={formData.confirmEmail}
                  onChange={handleInputChange}
                  disabled={loading}
                  className={errors.confirmEmail ? 'error' : ''}
                  placeholder="confirme seu e-mail"
                />
                <div className="error-message">{errors.confirmEmail}</div>
              </div>

              <div className="form-group">
                <label htmlFor="cadastro-password">Senha</label>
                <input
                  type="password"
                  id="cadastro-password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  disabled={loading}
                  className={errors.password ? 'error' : ''}
                  placeholder="mínimo 6 caracteres"
                />
                <div className="error-message">{errors.password}</div>
              </div>

              <div className="form-group">
                <label htmlFor="cadastro-confirm-password">Confirmar Senha</label>
                <input
                  type="password"
                  id="cadastro-confirm-password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  disabled={loading}
                  className={errors.confirmPassword ? 'error' : ''}
                  placeholder="digite a senha novamente"
                />
                <div className="error-message">{errors.confirmPassword}</div>
              </div>

              <div className="form-group checkbox-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    id="cadastro-admin"
                    name="isAdmin"
                    checked={formData.isAdmin}
                    onChange={handleInputChange}
                    disabled={loading}
                  />
                  <span className="checkmark"></span>
                  Sou administrador
                </label>

                <small className="checkbox-help">
                  Marque esta opção se você é um administrador do sistema
                </small>
              </div>

              <button
                type="submit"
                className={`auth-btn ${loading ? 'loading' : ''}`}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="spinner"></span>
                    Cadastrando...
                  </>
                ) : (
                  'Registrar-se'
                )}
              </button>

              <div className="auth-switch">
                Já tem conta? <Link to="/login">Faça login</Link>
              </div>

            </form>
          </div>
        </div>
      </main>
    </>
  );
};

export default Signup;
