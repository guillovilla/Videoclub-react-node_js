import './Filtre.css';


function Filtre(props) {


  return (
  <div className='container'>
    <h2>Filtres</h2> 
    <div className='filtres'>
      
        <li className='filtre' onClick={(e) => { props.handleFiltre(e); props.handleTarget(e) }}>Année (plus récent)</li>
        <li className='filtre' onClick={(e) => { props.handleFiltre(e); props.handleTarget(e) }}>Année (plus ancien)</li>
        <li className='filtre' onClick={(e) => { props.handleFiltre(e); props.handleTarget(e) }}>Réalisateur (A-Z)</li>
        <li className='filtre' onClick={(e) => { props.handleFiltre(e); props.handleTarget(e) }}>Réalisateur (Z-A)</li>
        <li className='filtre' onClick={(e) => { props.handleFiltre(e); props.handleTarget(e) }}>Titre (A-Z)</li>
        <li className='filtre' onClick={(e) => { props.handleFiltre(e); props.handleTarget(e) }}>Titre (Z-A)</li>
      
    </div>
  </div>
  );
}
export default Filtre;

