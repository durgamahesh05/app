const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

module.exports = mergeConfig(getDefaultConfig(__dirname), {
  // Watchman is not reliably available on Windows. Use Metro's Node watcher
  // so the bundle endpoint can start watching the project files.
  resolver: {
    useWatchman: false,
  },
});
