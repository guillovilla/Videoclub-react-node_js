import { useState } from 'react';
import './FormFilm.css';
import { useNavigate } from "react-router-dom";


function FormFilm() {
    const genres = [
        "Action",
        "Aventure",
        "comedie",
        "Drame",
        "Fantasie",
        "Horreur",
        "Policier",
        "Science-fiction",
        "Thriller",
        "Western"
    ]
    const [formData, setFormData] = useState({
        titre:"",
        description:"",
        realisation:"",
        annee:"",
        genres:[],
        titreVignette:"vide.jpg",
    });

    const [formValidity, setFormValidity] = useState("invalid");
    // const navigate = useNavigate();
    // generar el mensje de erro


    function onFormDataChange(e) {
        const name = e.target.name;
        const value = e.target.value;

        if(name.startsWith("genre")) {

            const estCoche = e.target.checked;
            let genres = formData.genres || [];

        if(!estCoche && genres.includes(value)) {

            genres = genres.filter((genre, index)=>{
                return genre !== value
            })

        }else if(estCoche && !genres.includes(value)) {

            genres.push(value)

        }
        const donneeModifie = {...formData, "genres":genres};

        setFormData(donneeModifie);
    
        }else if(name === "titreVignette"){

            const nomFichier = e.target.files[0].name;
            const donneeModifie = {...formData, titreVignette: nomFichier};
            setFormData(donneeModifie);

        }else {
            
        const donneeModifie = {...formData, [name]:value};
        
        const estValide = e.target.form.checkValidity() ? "valid" : "invalid";
        setFormValidity(estValide)
        setFormData(donneeModifie);
        }

    }

    async function onFormSubmit(e) {
        e.preventDefault();
        
        if(formValidity === "invalid") {
            e.target.reportValidity();
            return;
        }

        const data = {
            method:"POST",
            headers: {
                "Content-Type":"application/json",
                autorization:`Bearer ${localStorage.getItem("api-film")}`
            },
            body: JSON.stringify(formData),

        };

        const request = await fetch("http://localhost:3301/api/films", data);
        const response = await request.json();

        if(request.status === 200) {
            console.log("super");
            setFormData({
                titre:"",
                description:"",
                realisation:"",
                annee:"",
                genres:[],
                titreVignette:"vide.jpg",
            });

            setFormValidity("invalid");
            // navigate("/");
        }else{
            const messageErreur = response.error;
            console.log("erreur", messageErreur)
        }


    }

  return (
    <main>
        <div className='form-ajout'>
            <p>form-film</p>
            <form className={formValidity} onSubmit={onFormSubmit}> 
                <div className='input-group'>
                    <label htmlFor='titre'>Titre</label>
                    <input type="text" id="titre" name="titre" value={formData.titre} onChange={onFormDataChange} required minLength={1} maxLength={150}></input>
                </div>
                <div className='input-group'>
                    <label htmlFor='description'>Description</label>
                    <textarea type="text" id="description" name="description" value={formData.description} onChange={onFormDataChange} required minLength={1} maxLength={500}></textarea>
                </div>
                <div className='input-group'>
                    <label htmlFor='annee'>Annee</label>
                    <input type="text" id="annee" name="annee" value={formData.annee} onChange={onFormDataChange} required></input>
                </div>
                <div className='input-group'>
                    <label htmlFor='realisation'>Realisation</label>
                    <input type="text" id="realisation" name="realisation" value={formData.realisation} onChange={onFormDataChange} required></input>
                </div>
                <div>
                    <p>Genres</p>
                    { 
                    genres.map((element,index)=>{
                        return (
                            <p key={index}> 
                                <input type="checkbox" 
                                id={element}
                                name={`genre-${element}`}
                                value={element}
                                onChange={onFormDataChange}
                                checked={formData.genres.includes(element)}
                                 />
                                <label htmlFor={element}>{element}</label>
                            </p>
                        )

                    })
                    }
                </div>
                <div> 
                    <label htmlFor="titreVignette"> Vignette </label>
                    <input type="file" 
                    name="titreVignette" 
                    id="titreVignette" 
                    accept=".jpg,.jpge,.png" 
                    onChange={onFormDataChange} 
                    />
                </div>
                <input type="submit" value="Envoyer" disabled={formValidity === "invalid" ? "disabled" : ""} />
            </form>
            {/* {<div className='message-erreur'>{}</div>} */}
        </div>
        </main>
  );

}

export default FormFilm;