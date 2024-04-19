import { useContext } from 'react';
import { AppContext } from '../App/App';
import { NavLink } from 'react-router-dom';
import './Entete.css';

function Entete(props) {
  const context = useContext(AppContext)

  return (
    <header>
      <nav>
        <ul role="menubar">
            <li role="menuitem"><NavLink to="/">Video Club</NavLink></li>
            <li role="menuitem">{context ? <NavLink to="/admin/ajout-film">Ajouter un film</NavLink> : '' }</li>
            <li className='entete-text' role="menuitem"><NavLink to="/liste-films">Liste de films</NavLink></li>
            <li role="menuitem"> {context ? <NavLink to="/admin">Admin</NavLink> : '' }</li> 
        </ul>
        <div> {context ? (
                            <nav>
                                <NavLink to="/admin" className={"underline"}>
                              
                                </NavLink>
                            </nav>
                        ) : (
                            ""
                        )}
                        <form onSubmit={props.handleLogin} data-connexion={context}>
                            {!context ? <input type="text" name="courriel" placeholder="Usager"></input> : ""}
                            {!context ? <input type="password" name="mdp" placeholder="Mot de passe"></input> : ""}
                            <button>{context ? "Logout" : "Login"}</button>
                        </form> 
                              {/* // <form onSubmit={props.handleLogin} data-connexion={context}>
                              //   <button>Logout</button>
                              // </form>
                              //  : 
                              //  <form onSubmit={props.handleLogin}>
                              //   <input type="text" name="courriel" placeholder='usager'></input>
                              //   <input type="password" name="mdp" placeholder='mot de passe'></input>
                              //   <button>Connexion</button>
                              //  </form> */}
                            
        </div>
      </nav>
    </header>
  );
}

export default Entete;

//Reference pour le button: https://believemy.com/r/creer-un-bouton-neon-avec-css 
