import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/home'
import Login from './pages/login'
import Signup from './pages/signup'
import ListItems from './pages/list-items'
import Footer from './components/footer'
import './css/style.css'

// Layout básico para páginas com footer
const Layout = ({ children }) => {
  return (
    <div className="App">
      <main>
        {children}
      </main>
      <Footer />
    </div>
  )
}

// Componente para página não encontrada
const NotFound = () => (
  <div style={{ padding: '2rem', textAlign: 'center' }}>
    <h2>Página não encontrada</h2>
    <p>A página que você está procurando não existe.</p>
    <a href="/">Voltar para Home</a>
  </div>
)

// Configuração principal do React
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Páginas com layout completo (footer) */}
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/itens" element={<Layout><ListItems /></Layout>} />
        
        {/* Páginas de desenvolvimento */}
        <Route path="/cadastrar-item" element={<Layout><div style={{padding: '2rem', textAlign: 'center'}}>Página de Cadastro de Itens - Em Desenvolvimento</div></Layout>} />
        <Route path="/gerenciar-itens" element={<Layout><div style={{padding: '2rem', textAlign: 'center'}}>Página de Gerenciamento - Em Desenvolvimento</div></Layout>} />
        
        {/* Páginas sem footer */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        
        {/* Rota para 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)