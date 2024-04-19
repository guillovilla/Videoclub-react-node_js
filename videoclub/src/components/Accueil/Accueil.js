import { motion } from 'framer-motion';

import './Accueil.css';
import test from './Accueil.json'


function Accueil() {
  const textAccueil = test.map((text, index) => {
    return <div key={index}><p>{text}</p></div>;

  });

  const transition = { duration: 0.5, ease: 'easeInOut' };
  
  const variant = {
    hidden: { opacity: 0, y: 25 },
    visible: { opacity: 1, y: 0, transition },
    exit: { opacity: 0, y: 25, transition },
  }

  return (
    <motion.main 
      key='accueil' 
      initial='hidden'
      animate='visible'
      exit= 'exit'
      variants={variant}>
      <div>
        <div className='container-accueil'>
        </div>    
        <div className='text-accueil'>{textAccueil}</div>
      </div>    
    </motion.main>
  );
}

export default Accueil;