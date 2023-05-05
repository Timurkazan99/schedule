const hexToRgb = (hex) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    red: parseInt(result[1], 16),
    green: parseInt(result[2], 16),
    blue: parseInt(result[3], 16),
  } : null;
};

const getFontColor = (color) => {
  const rgbColor = hexToRgb(color);
  const a = 1 - (0.299 * rgbColor.red + 0.587 * rgbColor.green + 0.114 * rgbColor.blue) / 255;

  if (a < 0.5) {
    return 'rgb(0,0,0)'; // bright colors - black font
  }
  return 'rgb(255,255,255)'; // dark colors - white font
};

export default getFontColor;
