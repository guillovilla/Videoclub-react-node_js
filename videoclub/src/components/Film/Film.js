import './Film.css';
import Note from  '../Note/Note';
import { useEffect, useState, useContext } from 'react';
import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';
import { AppContext } from '../App/App';

function Film() {

  const context = useContext(AppContext)
  
  let { id } = useParams();

    const urlFilm = `https://api-films-dsr0.onrender.com/api/films/${id}`;
    const [elFilm, setFilm] = useState([]);
    const [nbVotes, setNbVotes] = useState(0);
    const [moyenne, setMoyenne] = useState(0);
    const [aCommentaires, setACommentaires] = useState([]);
  
    useEffect(() => {
  
      fetch(urlFilm)
        .then((reponse) => reponse.json())
        .then((data) => {
          
          setFilm(data);
          const notes = data.notes || [];
          setNbVotes(notes.length);

          //si le film a ou n'a pas de notes
          if (notes.length > 0) {
            const totalVotes = notes.reduce((total, vote) => total + vote, 0);
            let moyenne = totalVotes / data.notes.length;
                moyenne = moyenne.toFixed(2);
          setMoyenne(moyenne);
          } else {
            setMoyenne(0);
          } 
        }); 
  
    }, [urlFilm]);
           
        async function soumettreNote(e){
          
          const inputValue = parseInt(e.target.value);
          let aNotes;
          if (!elFilm.notes){
            aNotes = [inputValue]
          } else {
            aNotes = elFilm.notes;
            aNotes.push(inputValue);
          }
          
          const oOptions = {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({notes: aNotes})
          }
          
          let putNote = await fetch(urlFilm, oOptions),
          getFilm = await fetch(urlFilm);
          
          Promise.all([putNote, getFilm])
        .then(reponse => reponse[1].json())
        .then((data) =>{
  
          setFilm(data);
          setNbVotes(data.notes.length);
          const totalVotes = data.notes.reduce((total, vote) => total + vote, 0);
          let moyenne = totalVotes / data.notes.length;
              moyenne = moyenne.toFixed(2);
          setMoyenne(moyenne);
        })
    }

    let blocAjoutCommantaire;

    if(context) {
      blocAjoutCommantaire =  <form onSubmit={soumettreCommentaire}>
                                <textarea name="textarea" placeholder='Ajouter votre commentaire' style={{width: 500}}></textarea>
                                <button>soumettre</button>
                              </form>
    }

    async function soumettreCommentaire(e){
      e.preventDefault(); 
      let aCommentaires;
      let elCommentaire = document.querySelector('textarea').value;
      if (!elFilm.commentaires){
        aCommentaires = [{ commentaires: elCommentaire, usager: context.usager}];
      } else {
        aCommentaires = elFilm.commentaires;
        aCommentaires.push({ commentaires: elCommentaire, usager: context.usager});
      }

      const oOptions = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({commentaires: aCommentaires})
      }
      
      let putCommentaires = await fetch(urlFilm, oOptions),
      getFilm = await fetch(urlFilm);
      
      Promise.all([putCommentaires, getFilm])
      .then(reponse => reponse[1].json())
      .then((data) =>{

        setACommentaires(data.commentaires);
        setFilm(data);
        e.target.reset();
      })
    }

    async function handleDelete() {
 
      try {
        const response = await fetch(urlFilm, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem("api-film")}`
          }
        });
  
        if (!response.ok) {
          throw new Error('La suppression a échoué');
        }
  
        window.location.href = "/liste-films"; 
  
      } catch (error) {
        console.error(error);
      } 
    }

    const transition = { duration: 0.5, ease: 'easeInOut' };

    const variant = {
      hidden: { opacity: 0, scale: 0.8 }, 
      visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } }, 
      exit: { opacity: 0, scale: 0.8, transition: { duration: 0.5 } }, 
    };
    
    
  return (
    <motion.main 
      key='accueil' 
      initial='hidden'
      animate='visible'
      exit= 'exit'
      variants={variant}>
      <div className='film-container'>
        <article className='single-film'>
          <img src={`../img/${elFilm.titreVignette}`} alt={elFilm.titre}  height={500}/>
          <div>
            <p className='p-single-film'>{elFilm.titre}</p>
            <p className='p-single-film'>{elFilm.realisation}</p>
            <p className='p-single-film'>{elFilm.annee}</p>
            <p className='p-single-film'>{elFilm.genres ? elFilm.genres.join(' - ') : ''}</p>
            <p className='p-single-film'>{elFilm.description}</p>
            
          </div>
            <div className='etoiles'>
                <Note handleNote={soumettreNote} handleMoyenne={moyenne} handleNbVotes={nbVotes} />
            </div>
          <div className='etoiles'>
          {elFilm.commentaires ? (
            <div>
              <h2>Commentaires: </h2>
              {context ? "" : <p>Vous devez être connecté pour commenter ce film !</p> } 
              {elFilm.commentaires.map((commentaire, index) => (
                <div key={index}>
                  <p>{commentaire.usager} dit : {commentaire.commentaires}</p>
                </div>
              ))}
            </div>
          ) : (
            <div>
            <h2>Commentaires: </h2>    
            <p>Soyez la première personne à commenter ce film</p> 
            </div>       
          )}
          </div>
          <div className='etoiles'>
          {context ? <button onClick={handleDelete}>Supprimer le film</button> : " "}
          </div>
        </article>
          {blocAjoutCommantaire}
      </div>
    </motion.main>
  );
}

export default Film;

