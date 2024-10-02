export const uppercaseFirstLetter = (string) => {
  return string?.charAt(0).toUpperCase() + string.slice(1);
};

export const imagePathName = (vehicleType, randomNumber) => {
  return `/vehicles/${vehicleType}_${randomNumber}.png`;
};

export const navigateToHome = (navigate) => {
  setTimeout(() => {
    navigate('/');
  }, 2200);;
};
