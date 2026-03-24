import React from 'react';
import { useNavigate } from 'react-router-dom';

// Definiáljuk, hogyan kell kinéznie egy hub fülnek
interface HubTab {
  id: number;
  icon: string; // Emoji az ikonhoz
  title: string;
  description: string;
  path: string; // Hova navigálna (csak a UI-hoz, logika nélkül)
}

const HubPage: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Kijelentkezéskor csak visszavisz a főoldalra a UI tesztelés miatt
    navigate('/');
  };

  // A "Legyen Ön is Milliomos" témához illő fülek
  const tabs: HubTab[] = [
    { 
      id: 1, 
      icon: '🎮', 
      title: 'A Játék Indítása', 
      description: 'Teszteld tudásod a Milliomosban!', 
      path: '/game' 
    },
    { 
      id: 2, 
      icon: '🏆', 
      title: 'Eredményeim', 
      description: 'Tekintsd meg eddigi pontszámaidat és nyereményeidet.', 
      path: '/results' 
    },
    { 
      id: 3, 
      icon: '✍️', 
      title: 'Kérdés Kreátor', 
      description: 'Hozz létre új kérdéseket a játékhoz!', 
      path: '/question-creator' 
    },
    { 
      id: 4, 
      icon: '💡', 
      title: 'Oláh István Fül', 
      description: 'Ismerd meg a játék legnehezebb kérdéseit.', 
      path: '/olah-istvan' // Fictív oldal, ide csak a UI miatt mutat
    },
  ];

  // Stílus definíciók a tisztább kódért
  const pageContainerStyle: React.CSSProperties = {
    backgroundColor: '#1a202c', // Sötét háttér a "show" érzésért
    minHeight: '100vh',
    padding: '40px',
    fontFamily: 'Roboto, sans-serif', // Modern betűtípus
    color: '#e2e8f0', // Világos szöveg
  };

  const headerStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '50px',
    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
    paddingBottom: '20px',
  };

  const titleStyle: React.CSSProperties = {
    margin: 0,
    fontSize: '2.5rem',
    fontWeight: 'bold',
    color: '#fcd34d', // Arany szín a Milliomos témához
  };

  const subtitleStyle: React.CSSProperties = {
    margin: '10px 0 0 0',
    fontSize: '1.1rem',
    color: '#cbd5e0',
  };

  const logoutButtonStyle: React.CSSProperties = {
    padding: '12px 25px',
    backgroundColor: '#ef4444', // Piros a veszély érzésért
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '1rem',
    transition: 'background-color 0.2s ease-in-out',
  };

  const gridContainerStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', // Nagyobb kártyák
    gap: '30px',
    marginTop: '30px',
  };

  const cardStyle: React.CSSProperties = {
    backgroundColor: '#2d3748', // Sötétebb kékesszürke a kártyáknak
    padding: '30px',
    borderRadius: '15px',
    boxShadow: '0 10px 15px rgba(0, 0, 0, 0.3)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    cursor: 'pointer',
    transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  };

  const iconStyle: React.CSSProperties = {
    fontSize: '3.5rem', // Nagyobb ikonok
    marginBottom: '20px',
  };

  const cardTitleStyle: React.CSSProperties = {
    margin: '0 0 10px 0',
    fontSize: '1.6rem',
    color: '#fcd34d', // Arany címek
  };

  const cardDescriptionStyle: React.CSSProperties = {
    margin: 0,
    color: '#a0aec0',
    fontSize: '1rem',
    lineHeight: '1.6',
  };

  return (
    <div style={pageContainerStyle}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* Fejléc */}
        <div style={headerStyle}>
          <div>
            <h1 style={titleStyle}>Milliomos Központ</h1>
            <p style={subtitleStyle}>Készen állsz a tudás próbájára?</p>
          </div>
          <button 
            onClick={handleLogout}
            style={logoutButtonStyle}
            onMouseOver={(e: React.MouseEvent<HTMLButtonElement>) => e.currentTarget.style.backgroundColor = '#dc2626'}
            onMouseOut={(e: React.MouseEvent<HTMLButtonElement>) => e.currentTarget.style.backgroundColor = '#ef4444'}
          >
            Kijelentkezés
          </button>
        </div>

        {/* Fülek / Kártyák */}
        <div style={gridContainerStyle}>
          {tabs.map((tab: HubTab) => (
            <div 
              key={tab.id}
              onClick={() => navigate(tab.path)} // UI navigáció
              style={cardStyle}
              onMouseOver={(e: React.MouseEvent<HTMLDivElement>) => {
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.boxShadow = '0 15px 25px rgba(0,0,0,0.5)';
              }}
              onMouseOut={(e: React.MouseEvent<HTMLDivElement>) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 10px 15px rgba(0,0,0,0.3)';
              }}
            >
              <div style={iconStyle}>{tab.icon}</div>
              <h3 style={cardTitleStyle}>{tab.title}</h3>
              <p style={cardDescriptionStyle}>
                {tab.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default HubPage;