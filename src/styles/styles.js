const {StyleSheet} = require('react-native');

export const colors = {
  background: '#f8f8f8',
  white: 'white',
  backgroundDark: '#020C53',
  backgroundDark2: '#1A237E',
  backgroundLight: '#5A73fE',
  primary: '#FFCA3D',
  border: '#ebebeb',
  error: '#b51c1c',
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
  container: {
    padding: 16,
  },
  splashImage: {
    width: 200,
  },
  splashLoading: {
    marginTop: 50,
  },
  textTitle: {
    fontSize: 24,
    fontWeight: '100',
  },
  marginVerticalLarge: {
    marginVertical: 24,
  },
  marginVerticalMini: {
    marginVertical: 8,
  },
  textInput: {
    borderWidth: 1,
    backgroundColor: colors.white,
    paddingHorizontal: 8,
    borderRadius: 5,
    borderColor: colors.border,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 48,
    borderRadius: 5,
    backgroundColor: colors.backgroundDark2,
    paddingHorizontal: 16,
  },
  buttonDisabled: {
    backgroundColor: colors.backgroundLight,
  },
  textLight: {
    color: 'white',
  },
  textCenter: {
    textAlign: 'center',
  },
  textError: {
    color: colors.error,
  },
  textMediumBold: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
  },
  marginHorizontalMini: {
    marginHorizontal: 8,
  },
  profileImageLarge: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 1,
    borderColor: colors.border,
  },
  profileImageSmall: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: colors.border,
  },
  menuList: {
    paddingVertical: 16,
    borderBottomColor: colors.border,
    borderBottomWidth: 1,
  },
  textInputMultiline: {
    maxHeight: 150,
  },
});
