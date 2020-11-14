/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ToastAndroid,
  Image,
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  TouchableOpacity,
  Modal,
} from 'react-native';
import {getMyShop, getProductByShop} from '../../../controller/Shop';
import {colors, styles} from '../../../styles/styles';
import {useDispatch, useSelector} from 'react-redux';
import {setShopId} from '../../../redux/action';
import Button from '../../../components/Button';
import ProductItem from '../../../components/ProductItem';
import FloatingActionBar from '../../../components/FloatingActionBar';
import {TextInput} from 'react-native-gesture-handler';
import ImagePicker from 'react-native-image-picker';
import {addProduct} from '../../../controller/Product';
import {Picker} from '@react-native-picker/picker';
import {getCategoryList} from '../../../controller/Category';

const ShopDashboard = ({navigation}) => {
  const [shop, setShop] = useState('');
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [photo, setPhoto] = useState(null);
  const [uploading, setuploading] = useState(false);
  const [modal, setmodal] = useState(false);

  //data to send
  const [productName, setproductName] = useState('');
  const [description, setdescription] = useState('');
  const [price, setprice] = useState(0);
  const [stock, setstock] = useState(0);
  const [category, setcategory] = useState(0);
  const [categories, setcategories] = useState([]);

  //redux
  const {token, user} = useSelector((state) => state);
  // const shopReducer = useSelector((state) => state.shop);
  const dispatch = useDispatch();
  //

  const getShop = () => {
    setLoading(true);
    getMyShop(user.id, token)
      .then((res) => {
        if (res.data) {
          setShop(res.data);
          dispatch(setShopId(res.data.id));
          getProductList(res.data.id);
        }
      })
      .catch((err) => {
        ToastAndroid.show(`${err}`, ToastAndroid.LONG);
      })
      .finally(() => {
        getCategories();
      });
  };

  const getCategories = () => {
    getCategoryList()
      .then((data) => {
        data.data
          ? setcategories(data.data)
          : ToastAndroid.show(data.status, ToastAndroid.LONG);
        setLoading(false);
      })
      .catch((err) => {
        ToastAndroid.show(err.message, ToastAndroid.LONG);
        setLoading(false);
      });
  };

  const getProductList = (shopId) => {
    getProductByShop(shopId, token)
      .then((data) => setProducts(data.data))
      .catch((e) => console.log(e.message));
  };

  const handleChoosePhoto = () => {
    ImagePicker.launchImageLibrary(
      {
        noData: true,
      },
      (response) => {
        if (response.uri) {
          setPhoto(response);
        }
      },
    );
  };

  const addProductToShop = () => {
    setuploading(true);
    addProduct(
      productName,
      description,
      price,
      stock,
      photo,
      category,
      shop.id,
      token,
    )
      .then((res) => {
        setuploading(false);
        console.log(res);
      })
      .catch((err) => {
        setuploading(false);
        ToastAndroid.show(`${err}`, ToastAndroid.LONG);
      })
      .finally(() => {
        setmodal(false);
        getShop();
      });
  };

  useEffect(() => {
    getShop();
  }, []);

  if (loading === true) {
    return (
      <View style={[styles.centerContainer, styles.screen]}>
        <ActivityIndicator color={colors.primary} size="large" />
      </View>
    );
  }

  if (shop === '' || shop == null) {
    return (
      <View style={[styles.centerContainer, styles.screen]}>
        <Text>Anda belum punya toko </Text>
        <Button
          title="Buat toko?"
          onPress={() => navigation.navigate('ShopUpdate')}
        />
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <Modal visible={modal}>
        <ScrollView style={[styles.screen, styles.container, styles.relative]}>
          <TouchableOpacity
            style={styles.absoluteTopRight}
            onPress={() => setmodal(false)}>
            <Image
              style={styles.icon}
              source={require('../../../assets/icons/close-button.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleChoosePhoto()}
            style={styles.alignSelfCenter}>
            <Image
              source={
                photo
                  ? photo
                  : require('../../../assets/icons/insert-picture-button.png')
              }
              style={styles.imgSquareMedium}
            />
          </TouchableOpacity>
          <View style={styles.marginVerticalMini}>
            <TextInput
              style={styles.textInput}
              placeholder="Nama Barang"
              onChangeText={(inputName) => setproductName(inputName)}
            />
          </View>
          <View style={styles.marginVerticalMini}>
            <TextInput
              style={[styles.textInput, styles.textInputMultiline]}
              multiline={true}
              placeholder="Deskripsi"
              onChangeText={(inputDesc) => setdescription(inputDesc)}
            />
          </View>
          <View style={styles.marginVerticalMini}>
            <View style={styles.row}>
              <View style={{flex: 4}}>
                <TextInput
                  style={styles.textInput}
                  keyboardType="numeric"
                  placeholder="Harga"
                  onChangeText={(inputPrice) => setprice(inputPrice)}
                />
              </View>
              <View style={{flex: 1, marginLeft: 8}}>
                <TextInput
                  style={styles.textInput}
                  keyboardType="numeric"
                  placeholder="Stock"
                  onChangeText={(inputStock) => setstock(inputStock)}
                />
              </View>
            </View>
          </View>
          <View style={styles.marginVerticalMini}>
            <Picker
              selectedValue={category}
              onValueChange={(value) => setcategory(value)}>
              {categories.map((cat) => (
                <Picker.Item label={cat.category} value={cat.id} key={cat.id} />
              ))}
            </Picker>
          </View>
          <Button
            title="Add Product"
            isLoading={uploading}
            onPress={() => addProductToShop()}
          />
        </ScrollView>
      </Modal>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={() => {
              setLoading(true);
              getShop();
            }}
          />
        }>
        <View style={styles.container}>
          <TouchableOpacity
            onPress={() => navigation.navigate('ShopUpdate')}
            style={styles.row}>
            <Image
              style={styles.profileImageSmall}
              source={
                shop.image
                  ? {
                      uri:
                        'http://tokomu.herokuapp.com/uploads/shops/' +
                        shop.image,
                    }
                  : {
                      uri:
                        'http://tokomu.herokuapp.com/uploads/shops/default.jpg',
                    }
              }
            />
            <View
              style={[styles.marginHorizontalMini, {justifyContent: 'center'}]}>
              <Text style={styles.textMediumBold}>{shop.shop_name}</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.productContainer}>
          {products.map((product) => (
            <ProductItem product={product} key={product.id} />
          ))}
        </View>
      </ScrollView>
      <View style={{position: 'absolute', bottom: 16, right: 16}}>
        <FloatingActionBar onPress={() => setmodal(true)} />
      </View>
    </View>
  );
};

export default ShopDashboard;
