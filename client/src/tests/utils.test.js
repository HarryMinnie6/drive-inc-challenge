import { uppercaseFirstLetter, imagePathName, navigateToHome } from '../utils/utils.js';

describe('Utility Functions', () => {
  test('uppercaseFirstLetter should capitalize the first letter of the string', () => {
    expect(uppercaseFirstLetter('tesla')).toBe('Tesla');
  });

  test('imagePathName should return the correct image path', () => {
    expect(imagePathName('bmw_3Series', 1)).toBe('/vehicles/bmw_3Series_1.png');
    expect(imagePathName('byd_seal', 2)).toBe('/vehicles/byd_seal_2.png');
    expect(imagePathName('kia_ev9', 3)).toBe('/vehicles/kia_ev9_3.png');
  });

  test('navigateToHome should call navigate function after timeout', (done) => {
    const mockNavigate = jest.fn();
    navigateToHome(mockNavigate);
    expect(mockNavigate).not.toHaveBeenCalled();

    setTimeout(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/');
      done();
    }, 2300); //wait longer to execute
  });
});
