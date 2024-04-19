import './TuileFilm.css';


function TuileFilm(props) {

    //gestion d'affichage d'info dans la tuile
    const urlComplet = props.handleInfo;
    const url = new URL(urlComplet);
    const triValue = url.searchParams.get('tri');
    let propriete = 'titre';
    
    //reference: https://herewecode.io/blog/react-get-url-params/

    if (triValue === "annee") {
        propriete = "annee";
    } else if (triValue === "titre") {
        propriete = "titre";
    } else if (triValue === "realisation") {
        propriete = "realisation";
    }
  
  return (
    <article className="item">
        <h4 href="#0"></h4>
        <img src={`/img/${props.data.titreVignette}`} alt="img" width="50" />
        
        <div className="item__overlay">
            <h3 className='info-aficher'>{props.data[propriete]}</h3>
            <div className="item__body">
                <p>{props.data.titre}</p>
                <p>{props.data.description}</p><br></br>
            </div>
        </div>
    </article>
  );
}
//modal reference: https://css-irl.info/css-only-slide-up-caption-hover-effect/

export default TuileFilm;