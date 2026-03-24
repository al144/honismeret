import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Segédfüggvény a kaszinós ragyogás generálásához
const getGlow = (color: string, intensity: 'low' | 'high' = 'low') => {
  const spread = intensity === 'high' ? '30px' : '15px';
  return `0 0 ${spread} ${color}, inset 0 0 10px rgba(255,255,255,0.1)`;
};

const GamePage: React.FC = () => {
  const navigate = useNavigate();
  // Állapot csak a hover effektek demonstrálására a UI-ban
  const [hoveredAnswer, setHoveredAnswer] = useState<number | null>(null);

  // --- SZÍNPALETTA (Casino Vibe) ---
  const colors = {
    backgroundDark: '#020617', // Majdnem fekete kék
    backgroundLight: '#1e3a8a', // Mélykék a fény középpontjában
    gold: '#fbbf24',            // A nyeremény színe
    goldHighlight: '#fef08a',   // Fényes arany
    blueAccent: '#3b82f6',      // Elektromos kék
    textLight: '#e2e8f0',
    cardBg: 'linear-gradient(145deg, #0f172a, #172554)', // Metálos kék átmenet
  };

  // --- STÍLUSOK ---
  const pageContainerStyle: React.CSSProperties = {
    minHeight: '100vh',
    // Radiális átmenet: középen világosabb, széleken sötét, fókuszálja a tekintetet
    background: `radial-gradient(circle at center, ${colors.backgroundLight} 0%, ${colors.backgroundDark} 80%)`,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '20px',
    fontFamily: 'Roboto, sans-serif',
    color: colors.textLight,
    overflow: 'hidden', // Hogy a fények ne lógjanak ki
  };

  // A felső sáv (Lifelines + Kijelentkezés)
  const topBarStyle: React.CSSProperties = {
    width: '100%',
    maxWidth: '1000px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 20px',
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: '0 0 20px 20px',
    backdropFilter: 'blur(5px)',
    borderBottom: `1px solid ${colors.blueAccent}`,
  };

  const lifelineStyle: React.CSSProperties = {
    fontSize: '1.5rem',
    marginRight: '15px',
    cursor: 'pointer',
    filter: `drop-shadow(0 0 5px ${colors.blueAccent})`, // Ikonok ragyogása
    transition: 'transform 0.2s',
  };

  const exitButtonStyle: React.CSSProperties = {
    padding: '8px 20px',
    backgroundColor: 'transparent',
    border: `1px solid ${colors.gold}`,
    color: colors.gold,
    borderRadius: '20px',
    cursor: 'pointer',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    boxShadow: getGlow(colors.gold, 'low'),
  };

  // A fő játéktér elrendezése
  const mainContentAreaStyle: React.CSSProperties = {
    display: 'flex',
    width: '100%',
    maxWidth: '1200px',
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: '40px',
    marginTop: '20px',
  };

  // Pénzlétra (oldalsáv)
  const ladderContainerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column-reverse', // Lentről felfelé építkezünk
    gap: '5px',
    padding: '20px',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    borderRadius: '15px',
    border: `1px solid ${colors.blueAccent}`,
    boxShadow: getGlow(colors.blueAccent, 'low'),
    height: 'fit-content',
  };

  // Kérdés doboz (A Fókuszpont)
  const questionBoxStyle: React.CSSProperties = {
    background: colors.cardBg,
    padding: '30px 40px',
    borderRadius: '20px',
    // Kettős keret a prémium hatásért: kék külső, arany belső ragyogás
    border: `2px solid ${colors.blueAccent}`,
    boxShadow: `0 0 40px rgba(59, 130, 246, 0.4), inset 0 0 20px rgba(251, 191, 36, 0.2)`,
    textAlign: 'center',
    fontSize: '1.8rem',
    fontWeight: 'bold',
    color: colors.textLight,
    width: '100%',
    maxWidth: '800px',
    marginBottom: '40px',
    position: 'relative', // A díszítő elemekhez
  };

  // Válaszok rácsa
  const answersGridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '20px',
    width: '100%',
    maxWidth: '800px',
  };

  // Egyedi válasz gomb stílus generátor
  const getAnswerStyle = (index: number, isHovered: boolean): React.CSSProperties => ({
    background: isHovered
      ? `linear-gradient(145deg, ${colors.blueAccent}, #1e40af)` // Hover: Világosabb, "aktív" kék
      : colors.cardBg, // Alap: Sötét metál
    padding: '20px 25px',
    borderRadius: '50px', // Klasszikus "kapszula" forma
    border: `2px solid ${isHovered ? colors.goldHighlight : '#475569'}`,
    // Hoverkor arany ragyogás, alapból gyenge kék fény
    boxShadow: isHovered ? getGlow(colors.gold, 'high') : getGlow(colors.blueAccent, 'low'),
    color: isHovered ? colors.goldHighlight : colors.textLight,
    fontSize: '1.3rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)', // Dinamikus animáció
    transform: isHovered ? 'scale(1.02)' : 'scale(1)', // Pici nagyítás hoverkor
  });

  const answerLetterStyle: React.CSSProperties = {
    color: colors.gold,
    marginRight: '15px',
    fontWeight: '900',
  };

  // Pénzlétra szintek
  const ladderLevels = [
    '5 000 Ft', '10 000 Ft', '25 000 Ft', '50 000 Ft', 
    '100 000 Ft', '250 000 Ft', '500 000 Ft', '1 000 000 Ft',
    '1 500 000 Ft', '3 000 000 Ft', '5 000 000 Ft', '10 000 000 Ft',
    '20 000 000 Ft', '40 000 000 Ft', '🔥 50 MILLIÓ FT 🔥'
  ];
  const currentLevelIndex = 4; // Példa: épp a 100 ezres kérdésnél tartunk

  return (
    <div style={pageContainerStyle}>
      
      {/* Felső sáv: Segítségek és Kilépés */}
      <div style={topBarStyle}>
        <div style={{ display: 'flex' }}>
          {/* A segítségek ikonjai - inaktív állapotban */}
          <span style={lifelineStyle} title="Felező">✂️</span>
          <span style={lifelineStyle} title="Közönség segítsége">👥</span>
          <span style={lifelineStyle} title="Telefonos segítség">📞</span>
        </div>
        <button onClick={() => navigate('/hub')} style={exitButtonStyle}>
          Feladom & Kilépés
        </button>
      </div>

      {/* Fő tartalom: Pénzlétra + Játéktér */}
      <div style={mainContentAreaStyle}>
        
        {/* Pénzlétra (Bal oldalon) */}
        <div style={ladderContainerStyle}>
          {ladderLevels.map((level, index) => {
            const isCurrent = index === currentLevelIndex;
            const isMilestone = index % 5 === 4; // Minden 5. szint mérföldkő
            const isPast = index < currentLevelIndex;

            return (
              <div 
                key={index} 
                style={{
                  padding: '8px 15px',
                  textAlign: 'right',
                  borderRadius: '4px',
                  // A színekkel játszunk a státusz alapján
                  color: isCurrent ? colors.goldHighlight : (isMilestone ? 'white' : (isPast ? '#64748b' : colors.gold)),
                  fontWeight: isCurrent || isMilestone ? 'bold' : 'normal',
                  backgroundColor: isCurrent ? 'rgba(251, 191, 36, 0.2)' : 'transparent',
                  border: isCurrent ? `1px solid ${colors.gold}` : 'none',
                  boxShadow: isCurrent ? getGlow(colors.gold, 'low') : 'none',
                  fontSize: isCurrent ? '1.1rem' : '0.9rem',
                  transition: 'all 0.3s',
                }}
              >
                <span style={{marginRight: '10px', opacity: 0.5}}>{index + 1}.</span> {level}
              </div>
            );
          })}
        </div>

        {/* Kérdés és Válaszok (Középen) */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
          
          {/* A Kérdés Doboz */}
          <div style={questionBoxStyle}>
            {/* Díszítő vonalak a "high-tech" érzésért */}
            <div style={{position: 'absolute', top: '50%', left: '-20px', width: '40px', height: '2px', background: colors.blueAccent, boxShadow: getGlow(colors.blueAccent)}}></div>
            <div style={{position: 'absolute', top: '50%', right: '-20px', width: '40px', height: '2px', background: colors.blueAccent, boxShadow: getGlow(colors.blueAccent)}}></div>
            
            Melyik évben alapították a debreceni Mechwart András Gépipari és Informatikai Technikum jogelődjét?
          </div>

          {/* Válaszok */}
          <div style={answersGridStyle}>
            {['1890', '1911', '1945', '1956'].map((answer, index) => {
               const letters = ['A', 'B', 'C', 'D'];
               return (
                <div 
                  key={index}
                  // Itt használjuk a dinamikus stílusgenerátort a hover state alapján
                  style={getAnswerStyle(index, hoveredAnswer === index)}
                  onMouseOver={() => setHoveredAnswer(index)}
                  onMouseOut={() => setHoveredAnswer(null)}
                  onClick={() => alert(`A(z) ${letters[index]} választ jelölted meg!`)} // UI teszt klikk
                >
                  <span style={answerLetterStyle}>{letters[index]}:</span> {answer}
                </div>
               );
            })}
          </div>
        </div>

      </div>

      {/* Alsó sáv (opcionális státusz) */}
      <div style={{marginTop: '20px', color: '#64748b', fontSize: '0.9rem'}}>
        Játék azonosító: #MCWRT-2024-PRO
      </div>
    </div>
  );
};

export default GamePage;