import React, { useState } from 'react';
import './App.css';
import pixQrCode from './assets/pix.jpg'; 

const BibleVerse = () => {
  const [verse, setVerse] = useState(null); // Inicializado como null
  const [loading, setLoading] = useState(false);

  const fetchRandomVerse = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://bible-api.com/data/almeida/random');
      const data = await response.json();

      const book = data.random_verse.book;
      const chapter = data.random_verse.chapter;
      const verseNumber = data.random_verse.verse;
      const textFromVerse = data.random_verse.text;

      // Atualizando o estado como um objeto
      setVerse({
        reference: `${book} ${chapter}:${verseNumber}`,
        text: textFromVerse,
      });
    } catch (error) {
      setVerse({
        reference: 'Erro',
        text: 'Erro ao buscar o versículo. Por favor, tente novamente.',
      });
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const shareOnWhatsApp = () => {
    if (verse) {
      const message = `${verse.reference} - ${verse.text}`;
      const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`;
      window.open(url, '_blank');
    }
  };

  const copyCNPJ = () => {
    const cnpj = '23.773.094/0001-37';
    const cnpjWithoutSpecialChars = cnpj.replace(/[^\d]/g, ''); // Remove . e /
    navigator.clipboard.writeText(cnpjWithoutSpecialChars)
      .then(() => {
        alert('CNPJ copiado: ' + cnpjWithoutSpecialChars);
      })
      .catch(err => {
        console.error('Erro ao copiar CNPJ: ', err);
      });
  };

  return (
   <>
   
   <div className="container">
      <h1>Versículo Diário</h1>
      <button onClick={fetchRandomVerse} disabled={loading}>
        {loading ? 'Carregando...' : 'Gerar Versículo'}
      </button>
      {verse && (
        <div>
          <h2>{verse.reference}</h2>
          <p>{verse.text}</p>
          <button className="whatsapp-button" onClick={shareOnWhatsApp}>
            <i className="fab fa-whatsapp fa-xl"></i> Compartilhar no WhatsApp
          </button>
        </div>
      )}

<div className="pix-donation">
            <h3>Faça uma doação via Pix</h3>
            <img
              src={pixQrCode} alt="QR Code Pix"
              className="pix-qr-code"
            />
          </div>
          <div className="cnpj">
        <h4>
          CNPJ: 23.773.094/0001-37 
          <br /><br />
          <button onClick={copyCNPJ} className='copy-button'>
            Copiar CNPJ
          </button>
        </h4>
      </div>
     
    </div>
    <footer className="footer">
        <p>Desenvolvido por Igreja Evangélica Restitui</p>
      </footer>
   </>
    
  );
};

export default BibleVerse;
