import React from 'react';
import { useNavigate } from 'react-router-dom';

const OlahIstvanPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div style={{ minHeight: '100vh', background: '#0f172a', color: 'white', fontFamily: 'Roboto, sans-serif', lineHeight: '1.6' }}>
      {}
      <div style={{ background: '#1e3a8a', padding: '20px', textAlign: 'center', borderBottom: '4px solid #fcd34d', position: 'sticky', top: 0, zIndex: 100 }}>
        <h1 style={{ color: '#fcd34d', margin: 0, fontSize: '1.5rem', textTransform: 'uppercase' }}>Oláh István és a Mechwart Történelme</h1>
        <button 
          onClick={() => navigate('/hub')} 
          style={{ marginTop: '10px', padding: '8px 25px', background: '#fcd34d', color: '#1e3a8a', border: 'none', borderRadius: '20px', fontWeight: 'bold', cursor: 'pointer' }}
        >
          VISSZA A MENÜBE
        </button>
      </div>

      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '40px' }}>
        <section style={sectionStyle}>
          <h2 style={titleStyle}>Oláh István (1890–1944) Élettörténete és Emlékezete</h2>
          <h3 style={{ color: '#3b82f6' }}>Középiskolai rajztanár, festőművész, és a haza hős katonája</h3>
          
          <div style={contentBoxStyle}>
            <h4>1. Családi Gyökerek és Személyes Háttér</h4>
            <p><strong>Születés és család:</strong> Oláh István 1890. március 5-én született a Szabolcs megyei Tiszadobon. Református családból származott, édesapja id. Oláh István, édesanyja Zákány Borbála volt.</p>
            <p><strong>Saját családalapítás:</strong> A háború után Debrecenben telepedett le, ahol 1922. augusztus 12-én házasságot kötött a római katolikus vallású Sári Idával (aki 1894-ben született). A család a debreceni Bethlen utca 60. szám alatt élt.</p>
            <p><strong>Gyermekek:</strong> Feleségével 22 éven át éltek boldog házasságban, melyből két leánygyermekük született: Éva és Györgyike.</p>

            <h4>2. A Nagy Háború Pokla és a Hősies Helytállás</h4>
            <p>Szakmai és civil élete a legszebb éveiben tört derékba az első világháború kitörésével.</p>
            <p><strong>Szolgálat:</strong> Tartalékos hadnagyként (Leutnant i.d.R.) szolgált a császári és királyi 19. (és 103.) gyalogezred kötelékében. Kivételes bátorsággal harcolt a Kárpátokban, Oliciniec-nél és Milno előtt.</p>
            <p><strong>A brody-i ütközet (1915–16):</strong> Egy itteni harc során olyan súlyosan megsérült, hogy az oroszok halottnak hitték és a csatatéren hagyták, miközben századát fogságba ejtették. Ebből is felépült.</p>
            <p><strong>A sorsfordító sebesülés (1917):</strong> 1917. február 27-én Volhíniában (Antonowska kolónia) az arcvonalban egy aknarobbanás következtében súlyos, csonkolásos sérülést szenvedett. A találat a jobb kezét érte: elvesztette hüvelyk- és mutatóujját, jelentős szövet- és anyagveszteséggel.</p>
            <p><strong>Felépülés és kitüntetések:</strong> A bécsi 2. számú tartalékkórházban ápolták hónapokig. Parancsnoka hivatalos jellemzésében "kiválóan használható, kötelességtudó és rendkívül bátor tisztként" írta le. Helytállásáért Katonai Érdemkereszttel és német Vaskereszttel is kitüntették, majd hadrokkanttá nyilvánították.</p>

            <h4>3. Az Akaraterő Diadala: A Balkezes Művész</h4>
            <p>Egy rajztanár és festő számára a domináns kéz elvesztése a pálya végét jelenthetné, ám ő emberfeletti akaraterővel újraalkotta önmagát.</p>
            <p><strong>Újratanult művészet:</strong> Miután a háborúban elvesztette jobb kézfejét, elképesztő precizitással megtanult a balkezével festeni és rajzolni.</p>
            <p><strong>Festészet és grafika:</strong> Olajfestményei – mint a Hernádparti nyárfák (1923), a Dűlő út (1928) és a Debreceni tanya (1937) –, valamint egy idős férfit ábrázoló 1930-as akvarellje ékes bizonyítékai finom ecsetkezelésének és portréfestői tehetségének. Diákjai számára fametszetes cserkészmeghívót és rézkarcos emléklapot is készített.</p>
            <p><strong>Elismertség:</strong> Választmányi tagja volt a debreceni grafikusok központjának, az Ajtósi Dürer Céhnek. 1942-ben a budapesti Műcsarnokban rendezett kiállításon nagy kitüntetésben részesült.</p>
            <p><strong>Iparművészet és tervezés:</strong> Aktívan formálta Debrecen arculatát. 1929-ben ő tervezte a hősök fasorának emléktábláit. 1934-ben Haranghy Jenő iparművésszel közösen részt vett az "Angol Királynő" szálloda belső átalakításában, de tervezett "Magyaros előszobát" is.</p>

            <h4>4. A Megbecsült Debreceni Tanár és Közéleti Szereplő</h4>
            <p><strong>Oktatói munka:</strong> Okleveles középiskolai rajztanárként 1923-tól volt a debreceni Állami Fa- és Fémipari Szakiskola (a későbbi Mechwart András Gépipari Technikum) hivatalosan kinevezett, megbecsült tanára.</p>
            <p><strong>Órarend és tantárgyak:</strong> Az 1927/28-as tanévben heti 23 órát tanított. Órarendjében szerepelt a Mértan (heti 8 óra), a Szabadkézi rajz (heti 11 óra), és lenyűgöző módon, sérülése ellenére, Tornát (testnevelést) is tartott a fiúknak (heti 4 óra).</p>
            <p><strong>Honvédelmi nevelés:</strong> Frontot megjárt veteránként hiteles példakép volt a diákok számára. Az 1930-as évek végén "emléklapos főhadnagyként" és testnevelőként hivatalosan is részt vett a diákok leventekiképzésében.</p>

            <h4>5. A Tragikus Végkifejlet</h4>
            <p><strong>Hősi halál:</strong> 1944. szeptember 1-jén, 55 éves korában Debrecent súlyos légitámadás (bombázás) érte. Az iskola épületét bombatalálat érte, az óvóhely beomlott, és a kiváló tanár a romok között vesztette életét.</p>
            <p><strong>Nyughelye:</strong> Földi maradványait 1944. szeptember 4-én helyezték örök nyugalomra a Debreceni Köztemetőben (XII. A-C-SAROK. 2.).</p>
          </div>
        </section>
        <section style={sectionStyle}>
          <h2 style={titleStyle}>Az Iskola Történelmi Mérföldkövei</h2>
          
          <div style={cardStyle}>
            <h3>1. Alapítás és a kezdeti évek (1872–1914)</h3>
            <p><strong>Gyökerek:</strong> A magyar iparoktatás eszmei atyja Eötvös József volt. Az első hazai gépészeti felső ipartanoda 1872-ben nyílt Kassán.</p>
            <p><strong>A debreceni indítás:</strong> 20 év várakozás után, 1908. június 13-án Kossuth Ferenc miniszter rendelte el a debreceni fémipari szakiskola megalapítását.</p>
            <p><strong>Célkitűzés:</strong> Szakképzett iparossegédek nevelése (gép-, épület-, műlakatos és kovácsipar).</p>
            <p><strong>Szigor:</strong> Heti 50-57 tanítási óra, ahol az idő 87%-át a rajz és a műhelygyakorlat tette ki.</p>
          </div>

          <div style={cardStyle}>
            <h3>2. Világháborúk és újjáépítés (1914–1949)</h3>
            <p><strong>I. világháború:</strong> Az iskolában hadikórház működött. 1919-ben a román csapatok szinte minden gépet elszállítottak.</p>
            <p><strong>Túlélés:</strong> 1941-től az intézmény felső ipariskolává alakult.</p>
            <p><strong>II. világháború:</strong> 1944. szeptember 1-jén az épület súlyos bombatalálatot kapott. A háború után harmadszor is nulláról kellett újrakezdeni mindent.</p>
          </div>

          <div style={cardStyle}>
            <h3>3. A "Technikumi" Aranykor és Névadás (1950–1970)</h3>
            <p><strong>Névfelvétel:</strong> Az iskola 1955-ben vette fel Mechwart András nevét.</p>
            <p><strong>Stabilitás:</strong> Magas társadalmi presztízs jellemezte az iskolát, a végzettek "technikus" oklevelet kaptak.</p>
          </div>

          <div style={cardStyle}>
            <h3>4. Szakközépiskolai reformok és Innováció (1970–1990)</h3>
            <p>A 70-es években szakközépiskolává alakult az intézmény. 1985-ben sikerült visszaállítani az ötéves technikusképzést.</p>
            <p><strong>Fejlesztések:</strong> Új tornaterem épült, és megjelentek az első számítógépek (1938), valamint a CNC technológia oktatása.</p>
          </div>

          <div style={cardStyle}>
            <h3>5. Modernizáció és Világbanki Projekt (1990–2010)</h3>
            <p><strong>Informatikai robbanás:</strong> Az informatika kiemelt szakmacsoporttá vált. Az iskola csatlakozott a Világbanki modellhez, ami jelentős eszközfejlesztést hozott.</p>
            <p><strong>Nemzetközi kapcsolatok:</strong> Két tanítási nyelvű (német) osztályok indultak, és az iskola CISCO Hálózati Akadémia lett.</p>
            <p><strong>Kiválóság:</strong> A tanulók rendszeresen az élmezőnyben végeznek az OSZTV és EuroSkills/WorldSkills versenyeken.</p>
          </div>

          <div style={cardStyle}>
            <h3>6. A jelenkor (2013-tól)</h3>
            <p><strong>Fenntartóváltás:</strong> Az iskola a Debreceni Szakképzési Centrumhoz (DSZC) került.</p>
            <p><strong>Mai státusz:</strong> Fő profilja a gépészet és az informatika. 2018-ban az iskola megkapta a "Debrecen Város Közoktatásáért" díjat.</p>
          </div>
        </section>

      </div>
    </div>
  );
};

const sectionStyle: React.CSSProperties = { marginBottom: '60px' };
const titleStyle: React.CSSProperties = { color: '#fcd34d', borderBottom: '3px solid #3b82f6', paddingBottom: '10px', textTransform: 'uppercase' };
const contentBoxStyle: React.CSSProperties = { background: 'rgba(30, 41, 59, 0.5)', padding: '25px', borderRadius: '15px' };
const cardStyle: React.CSSProperties = { background: '#1e293b', padding: '20px', borderRadius: '15px', margin: '15px 0', borderLeft: '6px solid #fcd34d' };

export default OlahIstvanPage;