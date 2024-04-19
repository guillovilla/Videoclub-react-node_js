import './Note.css';

function Note(props) {
  
  return (
     
    <div>
      <p>Noter le film</p>
      <input className='input-star' onClick={(e)=> props.handleNote(e)} type="radio" name="rating" id="rs0" value="0"  defaultChecked/><label htmlFor="rs0"></label>
      <input className='input-star' onClick={(e)=> props.handleNote(e)} type="radio" name="rating" id="rs1" value="1" /><label className='label-etoile' htmlFor="rs1"></label>
      <input className='input-star' onClick={(e)=> props.handleNote(e)} type="radio" name="rating" id="rs2" value="2" /><label className='label-etoile' htmlFor="rs2"></label>
      <input className='input-star' onClick={(e)=> props.handleNote(e)} type="radio" name="rating" id="rs3" value="3" /><label className='label-etoile' htmlFor="rs3"></label>
      <input className='input-star' onClick={(e)=> props.handleNote(e)} type="radio" name="rating" id="rs4" value="4" /><label className='label-etoile' htmlFor="rs4"></label>
      <input className='input-star' onClick={(e)=> props.handleNote(e)} type="radio" name="rating" id="rs5" value="5" /><label className='label-etoile' htmlFor="rs5"></label>
      {props.handleNbVotes === 0 ? (
      <p> Aucune vote</p>
      ) : props.handleNbVotes === 1 ? (
      <p>Vote: {props.handleNbVotes}</p>
      ) : (
      <p>Votes: {props.handleNbVotes}</p>
      )}
      <p>Moyenne: {props.handleMoyenne}</p> 
    </div>
  );
}

export default Note;