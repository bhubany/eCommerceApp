const {getDefaultConfig} = require('metro-config');

module.exports = async () => {
  const {
    resolver: {sourceExts, assetExts},
  } = await getDefaultConfig();

  return {
    resolver: {
      sourceExts: [...sourceExts, 'ts', 'tsx'],
      assetExts: [...assetExts, 'txt', 'json', 'png', 'jpg'],
    },
  };
};
