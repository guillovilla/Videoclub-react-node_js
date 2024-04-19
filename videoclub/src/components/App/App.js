import React,  { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Accueil from '../Accueil/Accueil';
import Entete from '../Entete/Entete';
import ListeFilms from '../ListeFilms/ListeFilms';
import FormFilm from '../FormFilm/FormFilm';
import Film from '../Film/Film';
import Admin from '../Admin/Admin';
import './App.css';
import { AnimatePresence } from 'framer-motion';
import { jwtDecode } from 'jwt-decode';
import PrivateRoute from '../PrivateRoute/PrivateRoute';




export const AppContext = React.createContext();

function App() {
  const location = useLocation();
  const [logging, setLogging] = useState( {estLog: false, usager : ''});
  //Variable contenant l'état de connexion
  const [estConnecte, setConnexion] = useState(false);

  //Vérification de la validité
  useEffect(() => {
      if (localStorage.getItem("api-film")) {
          //On vérifie à chaque changement dans la page si notre jeton est valide
          setConnexion(jetonValide());
      }
  }, []);

  async function login(e) {
      //Si on est connecté et qu'on appuie sur le bouton
      e.preventDefault();
      const form = e.target;
      if (form.dataset.connexion == "false") {
          const body = {
              courriel: form.courriel.value,
              mdp: form.mdp.value,
          };

          // console.log(body);
          const data = {
              method: "POST",
              headers: {
                  "Content-Type": "application/json",
              },
              body: JSON.stringify(body),
          };
          const reponse = await fetch("http://localhost:3301/api/utilisateurs/connexion", data);
          const token = await reponse.json();

          if (reponse.status === 200) {
              localStorage.setItem("api-film", token);
              setConnexion(true);
          }
          form.reset();
      } else {
          setConnexion(false);
          localStorage.removeItem("api-film");
          return;
      }
  }

  function jetonValide() {
    try{
        const token = localStorage.getItem("api-film");
        const decode = jwtDecode(token);
        if(Date.now() < decode.exp * 1000) {
          return true;
        }else{
          localStorage.removeItem("api-film");
          return false;
        }
    }catch(erreur){
      console.log(erreur);
      return false;
    }
  }

  return (
    <AppContext.Provider value={estConnecte}>
      {/* <Router> */}
        <Entete  handleLogin={login} />

        <AnimatePresence mode="wait">

          <Routes location={location} key={location.key}>
            <Route element={<PrivateRoute />}> 
              <Route path="/admin/ajout-film" element={<FormFilm />}></Route>
              <Route path="/admin" element={<Admin />} ></Route>
            </Route>
            <Route path="/" element={<Accueil />} />
            <Route path="/liste-films" element={<ListeFilms />} />
            <Route path="/film/:id" element={<Film />} />
          </Routes>

        </AnimatePresence>

      {/* </Router> */}
    </AppContext.Provider>
  );
}

export default App;
