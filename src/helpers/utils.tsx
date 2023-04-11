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
