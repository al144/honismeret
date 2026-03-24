import React from 'react';
import { useNavigate } from 'react-router-dom';

const OlahIstvanPage: React.FC = () => {
  const navigate = useNavigate();

  // --- STÍLUSOK ---
  const pageStyle: React.CSSProperties = {
    backgroundColor: '#0f172a',
    minHeight: '100vh',
    padding: '60px 20px',
    fontFamily: '"Merriweather", "Georgia", serif',
    color: '#e2e8f0',
    lineHeight: '1.8',
  };

  const containerStyle: React.CSSProperties = {
    maxWidth: '900px',
    margin: '0 auto',
  };

  const headerStyle: React.CSSProperties = {
    textAlign: 'center',
    marginBottom: '60px',
    borderBottom: '1px solid #334155',
    paddingBottom: '30px',
  };

  const titleStyle: React.CSSProperties = {
    color: '#fcd34d',
    fontSize: '2.8rem',
    fontWeight: 'bold',
    margin: '0 0 10px 0',
    letterSpacing: '2px',
    textTransform: 'uppercase',
  };

  const subtitleStyle: React.CSSProperties = {
    color: '#94a3b8',
    fontSize: '1.3rem',
    fontStyle: 'italic',
    margin: 0,
  };

  const cardStyle: React.CSSProperties = {
    backgroundColor: '#1e293b',
    borderRadius: '16px',
    padding: '50px',
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5)',
    borderLeft: '4px solid #fcd34d',
    marginBottom: '40px',
  };

  const sectionTitleStyle: React.CSSProperties = {
    color: '#fcd34d',
    fontSize: '1.8rem',
    borderBottom: '1px dotted #475569',
    paddingBottom: '10px',
    marginBottom: '25px',
    marginTop: '0',
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
  };

  const paragraphStyle: React.CSSProperties = {
    fontSize: '1.15rem',
    color: '#cbd5e0',
    textAlign: 'justify',
    marginBottom: '20px',
  };

  const highlightStyle: React.CSSProperties = {
    color: '#ffffff',
    fontWeight: 'bold',
    backgroundColor: 'rgba(252, 211, 77, 0.1)',
    padding: '0 4px',
    borderRadius: '4px',
  };

  const buttonStyle: React.CSSProperties = {
    display: 'inline-block',
    marginBottom: '40px',
    padding: '10px 25px',
    backgroundColor: 'transparent',
    color: '#fcd34d',
    border: '1px solid #fcd34d',
    borderRadius: '30px',
    fontSize: '0.9rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    transition: 'all 0.3s ease',
  };

  const listStyle: React.CSSProperties = {
    paddingLeft: '20px',
    marginBottom: '25px',
    color: '#cbd5e0',
    fontSize: '1.15rem',
  };

  return (
    <div style={pageStyle}>
      <div style={containerStyle}>
        
        {/* Vissza gomb */}
        <button 
          onClick={() => navigate('/hub')}
          style={buttonStyle}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = '#fcd34d';
            e.currentTarget.style.color = '#0f172a';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.color = '#fcd34d';
          }}
        >
          ← Vissza a Központba
        </button>

        {/* Fejléc */}
        <header style={headerStyle}>
          <h1 style={titleStyle}>Oláh István</h1>
          <p style={subtitleStyle}>(1890 – 1944)</p>
          <p style={{ color: '#64748b', fontSize: '1.2rem', marginTop: '15px', textTransform: 'uppercase', letterSpacing: '3px' }}>
            Középiskolai rajztanár, festőművész, és a haza hős katonája [cite: 1, 2]
          </p>
        </header>

        {/* 1. Családi Gyökerek */}
        <div style={cardStyle}>
          <h2 style={sectionTitleStyle}><span>I.</span> Családi Gyökerek és Személyes Háttér</h2>
          <p style={paragraphStyle}>
            Oláh István <span style={highlightStyle}>1890. március 5-én született a Szabolcs megyei Tiszadobon</span>[cite: 4]. Református családból származott, édesapja id. Oláh István, édesanyja Zákány Borbála volt[cite: 4, 5].
          </p>
          <p style={paragraphStyle}>
            A háború után Debrecenben telepedett le, ahol 1922. augusztus 12-én házasságot kötött a római katolikus vallású Sári Idával[cite: 6]. A család a debreceni Bethlen utca 60. szám alatt élt[cite: 7]. Feleségével 22 éven át éltek boldog házasságban, melyből két leánygyermekük született: Éva és Györgyike[cite: 8].
          </p>
        </div>

        {/* 2. A Nagy Háború */}
        <div style={cardStyle}>
          <h2 style={sectionTitleStyle}><span>II.</span> A Nagy Háború Pokla és a Hősies Helytállás</h2>
          <p style={paragraphStyle}>
            Szakmai és civil élete a legszebb éveiben tört derékba az első világháború kitörésével[cite: 10]. Tartalékos hadnagyként (Leutnant i.d.R.) szolgált a császári és királyi 19. (és 103.) gyalogezred kötelékében[cite: 11]. Kivételes bátorsággal harcolt a Kárpátokban, Oliciniec-nél és Milno előtt[cite: 12].
          </p>
          <ul style={listStyle}>
            <li>Az 1915–16-os brody-i ütközet során olyan súlyosan megsérült, hogy az oroszok halottnak hitték és a csatatéren hagyták[cite: 13]. Ebből azonban felépült[cite: 14].</li>
            <li>A sorsfordító sebesülés 1917. február 27-én érte Volhíniában: egy aknarobbanás következtében a <span style={highlightStyle}>jobb kezét érő találat miatt elvesztette hüvelyk- és mutatóujját</span>[cite: 15, 16].</li>
          </ul>
          <p style={paragraphStyle}>
            Parancsnoka hivatalos jellemzésében "kiválóan használható, kötelességtudó és rendkívül bátor tisztként" írta le[cite: 18]. Helytállásáért Katonai Érdemkereszttel és német Vaskereszttel is kitüntették[cite: 19].
          </p>
        </div>

        {/* 3. A Balkezes Művész */}
        <div style={cardStyle}>
          <h2 style={sectionTitleStyle}><span>III.</span> Az Akaraterő Diadala: A Balkezes Művész</h2>
          <p style={paragraphStyle}>
            Egy rajztanár és festő számára a domináns kéz elvesztése a pálya végét jelenthetné, ám ő emberfeletti akaraterővel újraalkotta önmagát[cite: 20]. Elképesztő precizitással <span style={highlightStyle}>megtanult a balkezével festeni és rajzolni</span>[cite: 21].
          </p>
          <p style={paragraphStyle}>
            Olajfestményei (pl. a <i>Hernádparti nyárfák</i>, <i>Dűlő út</i>) és akvarelljei ékes bizonyítékai portréfestői tehetségének[cite: 22]. Diákjai számára fametszeteket, rézkarcokat készített[cite: 23]. Választmányi tagja volt a debreceni grafikusok központjának, az Ajtósi Dürer Céhnek [cite: 24], és 1942-ben a budapesti Műcsarnokban is kitüntetésben részesült[cite: 25].
          </p>
          <p style={paragraphStyle}>
            Aktívan formálta Debrecen arculatát is: 1929-ben ő tervezte a hősök fasorának emléktábláit [cite: 26], és 1934-ben részt vett az "Angol Királynő" szálloda belső átalakításában[cite: 27].
          </p>
        </div>

        {/* 4. A Tanár */}
        <div style={cardStyle}>
          <h2 style={sectionTitleStyle}><span>IV.</span> A Megbecsült Debreceni Tanár</h2>
          <p style={paragraphStyle}>
            Okleveles középiskolai rajztanárként 1923-tól volt a debreceni Állami Fa- és Fémipari Szakiskola (a későbbi Mechwart András Gépipari Technikum) megbecsült tanára[cite: 29]. 
          </p>
          <ul style={listStyle}>
            <li>Az 1927/28-as tanévben heti 23 órát tanított: Mértant, Szabadkézi rajzot, és lenyűgöző módon, sérülése ellenére <span style={highlightStyle}>Tornát (testnevelést) is tartott</span>[cite: 30, 31].</li>
            <li>Rendes tanár, osztályfőnök, és a "rajzszertár őre" is volt[cite: 32].</li>
          </ul>
          <p style={paragraphStyle}>
            Frontot megjárt veteránként hiteles példakép volt a diákok számára, gyakran mondott ünnepi beszédeket, és az 1930-as évek végén "emléklapos főhadnagyként" részt vett a diákok leventekiképzésében is[cite: 34, 35].
          </p>
        </div>

        {/* 5. A Tragédia */}
        <div style={cardStyle} className="border-red-900">
          <h2 style={{...sectionTitleStyle, borderBottomColor: '#7f1d1d', color: '#fca5a5'}}>
            <span>V.</span> A Tragikus Végkifejlet
          </h2>
          <p style={paragraphStyle}>
            Oláh István életét végül az a háborús pusztítás követelte, amit egyszer már csodával határos módon túlélt[cite: 37]. <span style={highlightStyle}>1944. szeptember 1-jén</span>, 55 éves korában Debrecent súlyos légitámadás érte[cite: 38].
          </p>
          <p style={paragraphStyle}>
            Az iskola épületét bombatalálat érte, az óvóhely beomlott, és a kiváló tanár a romok között vesztette életét[cite: 39]. Földi maradványait 1944. szeptember 4-én helyezték örök nyugalomra a Debreceni Köztemetőben[cite: 40]. Sírja ma is áll, ahol később elhunyt feleségével együtt nyugszik békében[cite: 41].
          </p>
        </div>

      </div>
    </div>
  );
};

export default OlahIstvanPage;