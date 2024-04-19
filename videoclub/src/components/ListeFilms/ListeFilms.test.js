import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import ListeFilms from './ListeFilms';
import TuileFilm from '../TuileFilm/TuileFilm';


describe('Composant ListeFilms', () => {

    // Objet fictif
    const mockFilms = [
        {
            titre: 'Alien - Le 8ème passager',
            genres: ['Horreur', 'Science-fiction'],
            description: 'Un vaisseau spatial perçoit une transmission non-identifiée comme un signal de détresse...',
            titreVignette: 'alienle8emepassager.jpg',
            realisation: 'Ridley Scott',
            annee: 1979,
            notes: [3, 4, 5, 2, 1],
            commentaires: [
                { commentaire: 'Ccommentaire 1', auteur: 'admin' },
                { commentaire: 'Commentaire 2', auteur: 'admin' },
            ]
        },
     
    ];


    test('Vérifie la tuile des film', () => {

        render(<TuileFilm data={mockFilms} handleInfo='https://api-films-dsr0.onrender.com/api/films?tri=realisation&order-direction=asc' />);


        mockFilms.forEach((film) => {
            expect(film.titre).toBeDefined();
            const elImg = document.querySelector('img');
            expect(elImg).toHaveAttribute('src', `/img/${mockFilms.titreVignette}`);
            expect(film.description).toBeDefined();
            expect(film.realisation).toBeDefined()
        });
    });
        

    
    /**
     * À faire
     */
    test('Vérifie si les clés sont présentes dans la réponse', async () => {

        





    });
});