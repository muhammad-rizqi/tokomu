const {Dimensions, StyleSheet} = require('react-native');

const windowWidth = Dimensions.get('window').width;
// const windowHeight = Dimensions.get('window').height;

export const colors = {
  background: '#f1f1f1',
  white: 'white',
  backgroundDark: '#020C53',
  backgroundDark2: '#1A237E',
  backgroundLight: '#5A73fE',
  primary: '#FFCA3D',
  border: '#bdbdbd',
  error: '#b51c1c',
  primaryDark: '#df7b01',
  backgroundGrey: '#CFD8DC',
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
  textInputMini: {
    padding: 0,
    height: 32,
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
  textMedium: {
    fontSize: 18,
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
  },
  profileImageSmall: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  menuList: {
    paddingVertical: 16,
    borderBottomColor: colors.border,
    borderBottomWidth: 1,
  },
  textInputMultiline: {
    maxHeight: 150,
  },

  productContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  productItem: {
    flexBasis: '47%',
    elevation: 4,
    borderRadius: 5,
    backgroundColor: '#fff',
    marginVertical: 8,
  },
  productImage: {
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,

    height: windowWidth * 0.47,
  },
  productTextContainer: {
    padding: 8,
  },
  textPrice: {
    color: colors.primaryDark,
    fontWeight: '600',
  },
  icon: {
    width: 20,
    height: 20,
    margin: 2,
    tintColor: colors.backgroundDark,
  },
  relative: {
    position: 'relative',
  },
  absoluteTopRight: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
  alignSelfCenter: {alignSelf: 'center'},
  imgSquareMedium: {width: 150, height: 150, borderRadius: 10},
  imgSquareMini: {width: 50, height: 50, borderRadius: 5},
  imgSquareSmall: {width: 100, height: 100, borderRadius: 5},
  justifyCenter: {justifyContent: 'center'},
  productImageLarge: {width: windowWidth, height: windowWidth},
  flex1: {flex: 1},
  flex2: {flex: 2},
  flex3: {flex: 3},
  buttonOutlineMedium: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 48,
    width: 48,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: colors.backgroundDark2,
  },
  buttonOutlineSmall: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 32,
    width: 32,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: colors.backgroundDark2,
    paddingHorizontal: 8,
  },
  marginHorizontalNano: {
    marginHorizontal: 2,
  },
  backgroundOpacity: {
    backgroundColor: '#333',
    opacity: 0.3,
  },
  wrap: {
    flexWrap: 'nowrap',
  },
  cartItem: {
    borderRadius: 5,
    backgroundColor: '#fff',
    marginVertical: 8,
  },
  textSmallBold: {fontWeight: 'bold'},
  backgroundDark: {
    backgroundColor: colors.backgroundDark2,
  },
  containerMini: {
    padding: 8,
  },
  composeMessage: {
    backgroundColor: colors.backgroundDark2,
    minHeight: 40,
    maxHeight: 150,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
  },

  incomingMessage: {
    backgroundColor: colors.primary,
    alignSelf: 'flex-start',
  },

  messageItem: {
    padding: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.border,
    marginVertical: 4,
    minWidth: '40%',
    maxWidth: '80%',
    position: 'relative',
    paddingBottom: 12,
  },
  outgoingMessage: {
    backgroundColor: colors.backgroundDark2,
    alignSelf: 'flex-end',
  },
  messageTime: {
    position: 'absolute',
    bottom: 0,
    right: 5,
    fontSize: 11,
  },
  searchBar: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 5,
    height: 40,
    flex: 1,
    flexDirection: 'row',
    backgroundColor: colors.background,
  },
  searchInput: {
    padding: 0,
    margin: 0,
  },
  productDetailName: {
    fontSize: 18,
  },
  productDetailPrice: {
    fontSize: 18,
    color: colors.primaryDark,
  },
  backgroundLight: {
    backgroundColor: colors.white,
  },
  alphaBgIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(26, 35, 126, 0.25)',
  },
});
