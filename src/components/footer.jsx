import React from 'react';
import '../css/footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-simple">
      <div className="footer-contact-info">
        <h2 className="footer-title">Entre em contato conosco</h2>

        <div className="contact-links">
          <a 
            href="https://uemg.br/divinopolis" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="contact-link"
          >
          <img 
              src="/public/img/site.png" 
              alt="Ícone de site" 
              className="contact-img"
            />            
            https://uemg.br/divinopolis
          </a>

          <a 
            href="tel:+553732293578" 
            className="contact-link"
          >
             <img 
              src="/public/img/telephone.png" 
              alt="Ícone de site" 
              className="contact-img"
            />          
            (37) 3229-3578
          </a>
        </div>
      </div>

      <div className="footer-copyright">
        <p>© {currentYear} UEMG</p>
      </div>
    </footer>
  );
};

export default Footer;