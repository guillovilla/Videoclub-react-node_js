import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Accueil from './Accueil';

// Mock d'Accueil.json
jest.mock('./accueil.json', () => [
  "Vidéoclub est une plateforme dédiée aux cinéphiles et passionnés de films. Nous proposons une vaste sélection de films de tous genres, des classiques intemporels aux dernières sorties en salle.",
  "Chaque film est présenté avec une fiche détaillée. Vous êtes également invité à laisser votre propre note et commentaire pour partager votre avis sur un film en particulier.",
  "Que vous soyez fan de films d'action, de comédies romantiques, de thrillers ou de films d'animation, rejoignez notre communauté de cinéphiles et découvrez le meilleur du cinéma !"
]);

describe('Componente Accueil', () => {
    test('Renderiza correctamente los párrafos del contenido de accueil.json', async () => {
        render(<Accueil />);

        
        await waitFor(() => {
        
            (require('./Accueil.json')).forEach((texto) => {
                expect(screen.getByText(texto)).toBeInTheDocument();
            });
        });
    });


});
