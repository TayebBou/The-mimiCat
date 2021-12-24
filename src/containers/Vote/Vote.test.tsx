import { render, screen } from '@testing-library/react';
import Vote from './Vote';
import userEvent from '@testing-library/user-event';


describe('Vote component', () => {
    test('there are two choices on the page', async () => {

        // Arrange
        render(<Vote />);
      
        // Act

        // Assert
        // On va chercher s'il y a deux éléments <img> à l'écran
        const imgs = await screen.findAllByRole('img');
        expect(imgs.length).toBe(2);
    });
      
    test('vote action works', async () => {
      // Arrange
      render(<Vote />);

      let oldSrc: string[] = [];

      // Act
      // On récupère les deux images
      const imgElement: HTMLImageElement[] = await screen.findAllByRole('img');
      oldSrc[0] = imgElement[0].src;
      oldSrc[1] = imgElement[1].src;
      // On click sur une image
      userEvent.click(imgElement[0]);
      const img: HTMLImageElement[] = await screen.findAllByRole('img');

      
      // Assert
      
        expect(`${img[0].src} ${img[1].src}`).not.toBe(`${oldSrc[0]} ${oldSrc[1]}`);
    });
});