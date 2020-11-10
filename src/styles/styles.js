const {StyleSheet} = require('react-native');

export const colors = {
  background: '#f0f0f0',
  backgroundDark: '#020C53',
  primary: '#FFCA3D',
};

export const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  screenDark: {
    flex: 1,
    backgroundColor: colors.backgroundDark,
  },
  centerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  splashImage: {
    width: 200,
  },
  splashLoading: {
    marginTop: 50,
  },
});
