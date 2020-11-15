import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
  ScrollView,
  Modal,
  TouchableWithoutFeedback,
  TextInput,
  ToastAndroid,
} from 'react-native';
import {useSelector} from 'react-redux';
import Button from '../../../components/Button';
import {addCart, cartFromUser} from '../../../controller/Cart';
import {colors, styles} from '../../../styles/styles';

const ProductDetail = ({route, navigation}) => {
  const [modal, setmodal] = useState(false);
  const [qty, setqty] = useState(1);
  const [buy, setbuy] = useState(false);
  const {token, user} = useSelector((state) => state);
  const [loading, setloading] = useState(false);

  const product = route.params.data;

  const addToCart = () => {
    setloading(true);
    addCart(product.id, user.id, qty, token)
      .then((res) => {
        if ((res.status = 'success')) {
          ToastAndroid.show(
            'Berhasil membahkan ke keranjang',
            ToastAndroid.LONG,
          );
        } else {
          ToastAndroid.show(res.status, ToastAndroid.LONG);
        }
        setmodal(false);
        setloading(false);
        if (buy) {
          navigation.navigate('Cart');
        }
      })
      .catch((err) => {
        ToastAndroid.show(err.message, ToastAndroid.LONG);
        console.log(err);
      });
  };

  return (
    <View style={styles.screen}>
      <Modal transparent={true} visible={modal}>
        <TouchableWithoutFeedback onPress={() => setmodal(false)}>
          <View style={[styles.flex1, styles.backgroundOpacity]} />
        </TouchableWithoutFeedback>
        <View style={{backgroundColor: colors.background}}>
          <View style={[styles.container, styles.row]}>
            <View>
              <Image
                source={{
                  uri:
                    'http://tokomu.herokuapp.com/uploads/products/' +
                    product.image,
                }}
                style={styles.imgSquareSmall}
              />
            </View>
            <View style={[styles.marginHorizontalMini, styles.flex1]}>
              <Text style={styles.textMediumBold}>{product.product_name}</Text>
              <Text style={styles.textPrice}>Rp. {product.price},-</Text>
              <Text>Stok : {product.stock} pcs</Text>
              <View style={[styles.row, styles.marginVerticalMini]}>
                <TouchableOpacity
                  style={[
                    styles.buttonOutlineSmall,
                    styles.marginHorizontalNano,
                  ]}
                  onPress={() => (qty > 1 ? setqty(qty - 1) : qty)}>
                  <Text style={styles.textMediumBold}>-</Text>
                </TouchableOpacity>
                <TextInput
                  style={styles.textInputMini}
                  value={`${qty}`}
                  maxLength={10}
                  keyboardType="numeric"
                  onChangeText={(pcs) => setqty(pcs)}
                />
                <TouchableOpacity
                  style={[
                    styles.buttonOutlineSmall,
                    styles.marginHorizontalNano,
                  ]}
                  onPress={() => setqty(qty + 1)}>
                  <Text style={styles.textMediumBold}>+</Text>
                </TouchableOpacity>
              </View>
              <Button
                isLoading={loading}
                onPress={() => addToCart()}
                title={buy ? 'Beli Sekarang' : 'Tambah ke keranjang'}
              />
            </View>
          </View>
        </View>
      </Modal>
      <ScrollView>
        <View>
          <Image
            source={{
              uri:
                'http://tokomu.herokuapp.com/uploads/products/' + product.image,
            }}
            style={styles.productImageLarge}
          />
        </View>
        <View style={styles.container}>
          <View style={styles.marginVerticalMini}>
            <Text style={styles.textMediumBold}>{product.product_name}</Text>
            <Text style={styles.textPrice}>Rp. {product.price},-</Text>
          </View>
          <View style={styles.marginVerticalMini}>
            <Text>Stok : {product.stock} pcs</Text>
            <Text>Kategori : {product.category.category}</Text>
          </View>
          <View style={styles.marginVerticalMini}>
            <Text>{product.description}</Text>
          </View>
        </View>

        <View style={styles.container}>
          <TouchableOpacity
            onPress={() => Alert.alert('ShopUpdate')}
            style={styles.row}>
            <Image
              style={styles.profileImageSmall}
              source={{
                uri:
                  'http://tokomu.herokuapp.com/uploads/shops/' +
                  product.shop.image,
              }}
            />
            <View style={[styles.marginHorizontalMini, styles.justifyCenter]}>
              <Text style={styles.textMediumBold}>
                {product.shop.shop_name}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <View style={styles.row}>
        <TouchableOpacity
          style={[styles.buttonOutlineMedium, styles.marginHorizontalNano]}>
          <Image
            source={require('../../../assets/icons/chat-bubble.png')}
            style={styles.icon}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            if (user) {
              setmodal(true);
              setbuy(false);
            } else {
              navigation.navigate('Login');
            }
          }}
          style={[styles.buttonOutlineMedium, styles.marginHorizontalNano]}>
          <Image
            source={require('../../../assets/icons/shopping-cart.png')}
            style={styles.icon}
          />
        </TouchableOpacity>
        <View style={[styles.flex1, styles.marginHorizontalMini]}>
          <Button
            title="Beli Sekarang"
            onPress={() => {
              if (user) {
                setmodal(true);
                setbuy(true);
              } else {
                navigation.navigate('Login');
              }
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default ProductDetail;
