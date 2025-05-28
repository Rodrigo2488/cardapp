import React, { useState, useRef } from 'react';
import html2canvas from 'html2canvas';
import './App.css';

function App() {
  const [cardName, setCardName] = useState('Nome da Carta');
  const [cardRace, setCardRace] = useState('Tipo/Raça');
  const [cardDescription, setCardDescription] = useState('Descrição da carta...');
  const [cardAttack, setCardAttack] = useState('1000');
  const [cardDefense, setCardDefense] = useState('1000');
  const [cardElement, setCardElement] = useState('magia');
  const [cardLevel, setCardLevel] = useState(5);
  const [cardImage, setCardImage] = useState(null);
  const [showAttackDefense, setShowAttackDefense] = useState(true);
  const [isSpellCard, setIsSpellCard] = useState(false);
  
  const cardRef = useRef(null);

  const elements = [
    { id: 'magia', name: 'Magia' },
    { id: 'planta', name: 'Planta' },
    { id: 'terra', name: 'Terra' },
    { id: 'agua', name: 'Água' },
    { id: 'metal', name: 'Metal' },
    { id: 'treva', name: 'Trevas' },
    { id: 'fogo', name: 'Fogo' },
    { id: 'luz', name: 'Luz' }
  ];

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setCardImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const downloadCardAsPNG = () => {
    if (cardRef.current) {
      html2canvas(cardRef.current, {
        useCORS: true,
        scale: 2,
        backgroundColor: null
      }).then(canvas => {
        const link = document.createElement('a');
        link.download = `${cardName.replace(/\s+/g, '-').toLowerCase()}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
      });
    }
  };

  return (
    <div className="app">
      <header className="header">
        <h1>eCard - Criador de Cartas</h1>
      </header>

      <main className="main-content">
        <div className="editor-container">
          <div className="card-editor">
            <h2>Editor de Carta</h2>
            
            <div className="form-group">
              <label htmlFor="cardName">Nome da Carta:</label>
              <input
                type="text"
                id="cardName"
                value={cardName}
                onChange={(e) => setCardName(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="cardRace">Tipo/Raça:</label>
              <input
                type="text"
                id="cardRace"
                value={cardRace}
                onChange={(e) => setCardRace(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="cardDescription">Descrição:</label>
              <textarea
                id="cardDescription"
                value={cardDescription}
                onChange={(e) => setCardDescription(e.target.value)}
                rows="4"
              ></textarea>
            </div>

            <div className="form-group">
              <label>Elemento:</label>
              <div className="element-selector">
                {elements.map((element) => (
                  <div 
                    key={element.id} 
                    className={`element-option ${cardElement === element.id ? 'selected' : ''}`}
                    onClick={() => setCardElement(element.id)}
                  >
                    <img 
                      src={`/assets/Elemento - ${element.id}.png`} 
                      alt={element.name} 
                      title={element.name}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="cardLevel">Nível (0-8):</label>
              <input
                type="range"
                id="cardLevel"
                min="0"
                max="8"
                value={cardLevel}
                onChange={(e) => {
                  const level = parseInt(e.target.value);
                  setCardLevel(level);
                  setIsSpellCard(level === 0);
                }}
              />
              <span>{cardLevel === 0 ? "0 (Carta mágica)" : cardLevel}</span>
            </div>

            <div className="form-group">
              <label htmlFor="cardImage">Imagem da Carta:</label>
              <input
                type="file"
                id="cardImage"
                accept="image/*"
                onChange={handleImageUpload}
              />
            </div>

            <div className="form-group checkbox-group">
              <label>
                <input
                  type="checkbox"
                  checked={showAttackDefense}
                  onChange={(e) => setShowAttackDefense(e.target.checked)}
                />
                Mostrar Ataque/Defesa
              </label>
            </div>

            {showAttackDefense && (
              <div className="form-row">
                <div className="form-group half">
                  <label htmlFor="cardAttack">Ataque:</label>
                  <input
                    type="number"
                    id="cardAttack"
                    value={cardAttack}
                    onChange={(e) => setCardAttack(e.target.value)}
                  />
                </div>
                <div className="form-group half">
                  <label htmlFor="cardDefense">Defesa:</label>
                  <input
                    type="number"
                    id="cardDefense"
                    value={cardDefense}
                    onChange={(e) => setCardDefense(e.target.value)}
                  />
                </div>
              </div>
            )}

            <button className="download-button" onClick={downloadCardAsPNG}>
              Baixar Carta (PNG)
            </button>
          </div>

          <div className="card-preview">
            <h2>Visualização</h2>
            <div className="card" ref={cardRef}>
              <div className={`card-frame ${cardElement}`}>
                <div className="card-header">
                  <div className="card-name">{cardName}</div>
                  <div className="card-element">
                    <img src={`/assets/Elemento - ${cardElement}.png`} alt={cardElement} />
                  </div>
                </div>
                
                <div className="card-level">
                  {cardLevel === 0 ? (
                    <div className="spell-card-text">Carta mágica</div>
                  ) : (
                    [...Array(cardLevel)].map((_, i) => (
                      <img 
                        key={i} 
                        src="/assets/Esfera de nível.png" 
                        alt="Nível" 
                        className="level-star"
                      />
                    ))
                  )}
                </div>
                
                <div className="card-image">
                  {cardImage ? (
                    <img src={cardImage} alt="Imagem da carta" />
                  ) : (
                    <div className="placeholder">Faça upload de uma imagem</div>
                  )}
                </div>
                
                <div className="card-info">
                  <div className="card-race">[{cardRace}]</div>
                  <div className="card-description">{cardDescription}</div>
                </div>
                
                {showAttackDefense && (
                  <div className="card-stats">
                    ATK/{cardAttack} DEF/{cardDefense}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="footer">
        <p>eCard - Criador de Cartas © 2025</p>
      </footer>
    </div>
  );
}

export default App;
