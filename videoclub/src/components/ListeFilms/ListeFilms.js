import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import TuileFilm from  '../TuileFilm/TuileFilm';
import Filtre from  '../Filtre/Filtre';
import { motion } from 'framer-motion';
import './ListeFilms.css';


function ListeFilms() {
  
  const urlListeFilms = 'https://api-films-dsr0.onrender.com/api/films';
  const [urlFiltre, setUrlFiltre] = useState(urlListeFilms);
  const [listeFilms, setListeFilms] = useState([]);

  const [estCharge, setEstCharge] = useState(false);
  
  useEffect(() => {

    fetch(urlFiltre)
      .then((reponse) => reponse.json())
      .then((data) => {

        setListeFilms(data);
        setEstCharge(true);

      }); 

  }, [urlFiltre]);

  const tuilesFilm = listeFilms.map((film, index) => {

    return <Link key={index} to={`/film/${film.id}`}><TuileFilm key={index} data={film}  handleInfo={urlFiltre} data-testid="tuile-film"  /></Link>
    
  });


  function filtre(e) {
    if(e.target.textContent === 'Réalisateur (A-Z)'){
      setUrlFiltre(`https://api-films-dsr0.onrender.com/api/films?tri=realisation&order-direction=asc`);
    }else if (e.target.textContent === 'Réalisateur (Z-A)'){
      setUrlFiltre(`https://api-films-dsr0.onrender.com/api/films?tri=realisation&order-direction=desc`);
    }else if (e.target.textContent === 'Titre (A-Z)'){
      setUrlFiltre(`https://api-films-dsr0.onrender.com/api/films?tri=titre&order-direction=asc`);
    }else if (e.target.textContent === 'Titre (Z-A)'){
      setUrlFiltre(`https://api-films-dsr0.onrender.com/api/films?tri=titre&order-direction=desc`);
    }else if (e.target.textContent === 'Année (plus récent)'){
      setUrlFiltre(`https://api-films-dsr0.onrender.com/api/films?tri=annee&order-direction=desc`);
    }else if (e.target.textContent === 'Année (plus ancien)'){
      setUrlFiltre(`https://api-films-dsr0.onrender.com/api/films?tri=annee&order-direction=asc`);
    }
}

//contrôle class .active
function classActive(e) {

  let elsFiltre = e.target.closest('.filtres').children;
  for (let i = 0; i < elsFiltre.length; i++) {
    elsFiltre[i].classList.remove('active');
  }   
  e.target.classList.add('active');
}

const transition = { duration: 0.5, ease: 'easeInOut' };
const variant = {
  hidden: { opacity: 0, y: 25 },
  visible: { opacity: 1, y: 0, transition},
  exit: { opacity: 0, y: 25, transition },
}

return (
  <main>

    <motion.div
      key="filtres"
      initial={{ opacity: 0, x: -25 }}
      animate={{ opacity: 1, x: 25, transition }}
      exit={{ opacity: 0, x: -25, transition }}
    >
    <Filtre handleFiltre={filtre} handleTarget={classActive} />
    </motion.div>
    
    {estCharge ? (
      <motion.div
        key="liste-film"
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={variant}
        className="grid-catalogue"
      >
        {tuilesFilm}
      </motion.div>
    ) : ( ' ' )}
  </main>
);
}

export default ListeFilms;