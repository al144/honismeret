import React from 'react';
import { useNavigate } from 'react-router-dom';

const OlahIstvanPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div style={{ minHeight: '100vh', background: '#0f172a', color: 'white', fontFamily: 'Roboto, sans-serif', lineHeight: '1.6' }}>
      {/* Fix fejléc */}
      <div style={{ background: '#1e3a8a', padding: '30px', textAlign: 'center', borderBottom: '4px solid #fcd34d', position: 'sticky', top: 0, zIndex: 100 }}>
        <h1 style={{ color: '#fcd34d', margin: 0, textTransform: 'uppercase', fontSize: '1.8rem' }}>Oláh István és a Mechwart történelme</h1>
        <button 
          style={{ marginTop: '15px', padding: '10px 25px', background: '#fcd34d', color: '#1e3a8a', border: 'none', borderRadius: '20px', fontWeight: 'bold', cursor: 'pointer' }}
          onClick={() => navigate('/hub')}
        >
          VISSZA A MENÜBE
        </button>
      </div>

      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '40px' }}>
        
        {/* 1. SZEKCIÓ: Oláh István élete */}
        <section style={sectionStyle}>
          <h2 style={titleStyle}>1. Oláh István (1890–1944) Élettörténete</h2>
          <p><strong>Családi háttér:</strong> 1890. március 5-én született Tiszadobon. Református családból származott, édesapja id. Oláh István, édesanyja Zákány Borbála volt. A háború után Debrecenben telepedett le, felesége Sári Ida volt, két leányuk született: Éva és Györgyike.</p>
          <p><strong>Katonai hős:</strong> Tartalékos hadnagyként szolgált az I. világháborúban a 19. gyalogezrednél. Kivételes bátorságáért megkapta az Ezüst Katonai Érdemérmet és a Károly-csapatkeresztet.</p>
          <p><strong>A tanár és művész:</strong> A debreceni Felsőipari Iskola rajztanára volt. Művészetét a mély emberábrázolás jellemezte, legismertebb művei közé tartozik az önarcképe és a "Katonák a lövészárokban" című alkotása.</p>
        </section>

        {/* 2. SZEKCIÓ: Az iskola történelme */}
        <section style={sectionStyle}>
          <h2 style={titleStyle}>2. Az Iskola Hat Korszaka</h2>
          
          <div style={cardStyle}>
            <h3>I. Alapítás és a kezdetek (1911–1919)</h3>
            <p>1911-ben alakult meg a Felsőipari Iskola, hogy kiszolgálja Debrecen ipari fejlődését. Az első világháború alatt az épület hadikórházként is funkcionált.</p>
          </div>

          <div style={cardStyle}>
            <h3>II. A két világháború között (1920–1944)</h3>
            <p>Ebben az időszakban vált az iskola a régió meghatározó szakmai központjává. Ekkor tanított itt Oláh István is.</p>
          </div>

          <div style={cardStyle}>
            <h3>III. Újjáépítés és Államosítás (1945–1954)</h3>
            <p>A II. világháborús pusztítás után az oktatás hamar újraindult, de a rendszer változásával az iskola állami irányítás alá került.</p>
          </div>

          <div style={cardStyle}>
            <h3>IV. A névadó és a Gépipari korszak (1955–1989)</h3>
            <p><strong>1955-ben vette fel az intézmény Mechwart András nevét.</strong> Megjelent a CNC technológia oktatása és az új tornaterem építése.</p>
          </div>

          <div style={cardStyle}>
            <h3>V. Modernizáció (1990–2012)</h3>
            <p>Az informatika kiemelt szakmacsoporttá vált. Az iskola csatlakozott a Világbanki modellhez és a CISCO Hálózati Akadémiához.</p>
          </div>

          <div style={cardStyle}>
            <h3>VI. A jelenkor (2013-tól)</h3>
            <p>A Debreceni Szakképzési Centrum (DSZC) tagintézményeként az ország egyik vezető technikumává vált, elnyerve a "Debrecen Város Közoktatásáért" kitüntetést is.</p>
          </div>
        </section>

        {/* 3. SZEKCIÓ: Mechwart András munkássága */}
        <section style={sectionStyle}>
          <h2 style={titleStyle}>3. Mechwart András (1834–1907)</h2>
          <p>A magyarországi gépgyártás fejedelme, a Ganz gyár igazgatója. Legnagyobb technikai vívmánya a <strong>hengerszék</strong> tökéletesítése volt, amely forradalmasította a malomipart világszerte. Nevéhez fűződik a fűnyírógép és a gőzeke fejlesztése is.</p>
        </section>

      </div>
    </div>
  );
};

// Segédstílusok
const sectionStyle: React.CSSProperties = {
  marginBottom: '60px',
  padding: '20px',
  background: 'rgba(30, 41, 59, 0.3)',
  borderRadius: '20px'
};

const titleStyle: React.CSSProperties = {
  color: '#fcd34d',
  borderBottom: '2px solid #3b82f6',
  paddingBottom: '10px',
  textTransform: 'uppercase',
  letterSpacing: '1px'
};

const cardStyle: React.CSSProperties = {
  background: '#1e293b',
  padding: '20px',
  borderRadius: '15px',
  margin: '15px 0',
  borderLeft: '6px solid #fcd34d',
  boxShadow: '0 4px 10px rgba(0,0,0,0.2)'
};

export default OlahIstvanPage;