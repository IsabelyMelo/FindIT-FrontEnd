import React, { useState, useEffect } from 'react';
import '../css/style.css';
import '../css/footer.css';
import '../css/items.css';

const ItemCard = ({ item }) => {
  return (
    <div className="item-card" data-category={item.categoria}>
      <div className="item-image">
        <img 
          src={item.imagem || '/img/placeholder-item.jpg'} 
          alt={item.titulo}
          onError={(e) => {
            e.target.src = '/img/placeholder-item.jpg';
          }}
        />
      </div>
      
      <div className="item-info">
        <h3 className="item-name">{item.titulo}</h3>

        <p className="item-description">{item.descricao}</p>
        
       <div className="item-details-row">
        <span className={`item-category category-${item.categoria}`}>
          {item.categoria}
        </span>

        <span className="item-date">
          {new Date(item.dataEncontrado).toLocaleDateString('pt-BR')}
        </span>

        <span className="item-location">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
          </svg>
          {item.local}
       </span>
      </div>

        <button className="btn btn-primary claim-btn">
          É meu!
        </button>
      </div>
    </div>
  );
};

const ListItems = () => {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');

  const [visibleItems, setVisibleItems] = useState(6);

  useEffect(() => {
    const loadItems = async () => {
      try {
        setLoading(true);

        const response = await fetch('/data/items.json');
        const json = await response.json();

        // O JSON tem a chave "items"
        setItems(json.items);
        setFilteredItems(json.items);

      } catch (error) {
        console.error("Erro ao carregar itens:", error);
      } finally {
        setLoading(false);
      }
    };

    loadItems();
  }, []);

  // FILTROS
  useEffect(() => {
    let result = items;

    // Busca
    if (searchTerm) {
      result = result.filter(item =>
        item.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.descricao.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.local.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Categoria
    if (categoryFilter) {
      result = result.filter(item => item.categoria === categoryFilter);
    }

    // Ordenação
    if (dateFilter === 'recentes') {
      result = [...result].sort(
        (a, b) => new Date(b.dataEncontrado) - new Date(a.dataEncontrado)
      );
    } else if (dateFilter === 'antigos') {
      result = [...result].sort(
        (a, b) => new Date(a.dataEncontrado) - new Date(b.dataEncontrado)
      );
    }

    setFilteredItems(result);
    setVisibleItems(6);
  }, [searchTerm, categoryFilter, dateFilter, items]);

  const itemsToShow = filteredItems.slice(0, visibleItems);
  const hasMoreItems = visibleItems < filteredItems.length;

  return (
    <main>
      <div className="container">
        <div className="page-header">
          <h1>Últimos Itens Encontrados</h1>
          <p>Itens perdidos e encontrados na UEMG Divinópolis</p>
        </div>

        {/* BARRA DE BUSCA */}
        <div className="search-filters">
          <div className="search-bar">
            <input 
              type="text"
              placeholder="Buscar items"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            <button id="search-btn" className="btn">
              🔍
            </button>
          </div>

          <div className="filters">
            <select 
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className={categoryFilter ? "select-active" : ""}
            >
              <option value="">Todas as categorias</option>
              <option value="eletronico">Eletrônicos</option>
              <option value="material-escolar">Material Escolar</option>
              <option value="vestuario">Vestuário</option>
            </select>

            <select 
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className={dateFilter ? "select-active" : ""}
            >
              <option value="">Ordenar por data</option>
              <option value="recentes">Mais recentes</option>
              <option value="antigos">Mais antigos</option>
            </select>
          </div>
        </div>

        {/* LISTA DE ITENS */}
        <div className="items-grid">
          {loading ? (
            <div className="loading">Carregando itens...</div>
          ) : itemsToShow.length === 0 ? (
            <div className="no-items">Nenhum item encontrado.</div>
          ) : (
            itemsToShow.map(item => (
              <ItemCard key={item.id} item={item} />
            ))
          )}
        </div>

        {/* BOTÃO "CARREGAR MAIS" */}
        {hasMoreItems && (
          <div className="load-more-container">
            <button 
              className="btn btn-secondary"
              onClick={() => setVisibleItems(prev => prev + 6)}
            >
              Carregar Mais Itens
            </button>
          </div>
        )}
      </div>
    </main>
  );
};

export default ListItems;
