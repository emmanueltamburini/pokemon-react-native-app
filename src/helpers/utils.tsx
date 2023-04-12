import ImageColors from 'react-native-image-colors';

export const getImageColors = async (
  uri: string,
): Promise<(string | undefined)[]> => {
  const result = await ImageColors.getColors(uri, {
    fallback: '#228B22',
    cache: false,
    key: 'unique_key',
  });

  let primaryColor;
  let secondaryColor;

  switch (result.platform) {
    case 'android':
      primaryColor = result.dominant;
      secondaryColor = result.average;
      break;
    case 'web':
      primaryColor = result.dominant;
      secondaryColor = result.vibrant;
      break;
    case 'ios':
      primaryColor = result.primary;
      secondaryColor = result.secondary;
      break;
    default:
      throw new Error('Unexpected platform key');
  }

  return [primaryColor, secondaryColor];
};

export const isColorTooLightForWhiteText = (hexColor: string) => {
  const rgbColor = hexToRgb(hexColor);

  const luminance =
    (0.299 * rgbColor.r + 0.587 * rgbColor.g + 0.114 * rgbColor.b) / 255;

  return luminance > 0.75;
};

const hexToRgb = (hexColor: string) => {
  const r = parseInt(hexColor.slice(1, 3), 16);
  const g = parseInt(hexColor.slice(3, 5), 16);
  const b = parseInt(hexColor.slice(5, 7), 16);

  return {r, g, b};
};

export const capitalize = (item?: string): string => {
  if (!item) {
    return '';
  }
  return item.replace(/^\w/, c => c.toUpperCase());
};
