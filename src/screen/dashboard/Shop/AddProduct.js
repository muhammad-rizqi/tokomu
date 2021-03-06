/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import {Picker} from '@react-native-picker/picker';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  ToastAndroid,
} from 'react-native';
import Button from '../../../components/Button';
import {getCategoryList} from '../../../services/Category';
import {colors, styles} from '../../../styles/styles';
import ImagePicker from 'react-native-image-picker';
import {
  addProduct,
  deleteProduct,
  getProductDetail,
  updateProduct,
} from '../../../services/Product';
import {useSelector} from 'react-redux';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import _ from 'lodash';

const AddProduct = ({route, navigation}) => {
  const prod = route.params.data;

  const [uploading, setuploading] = useState(false);
  const [photo, setPhoto] = useState(null);
  const {token} = useSelector((state) => state);
  const shopReducer = useSelector((state) => state.shop);

  //data to send
  const [productName, setproductName] = useState(null);
  const [description, setdescription] = useState(null);
  const [price, setprice] = useState(1);
  const [stock, setstock] = useState(1);
  const [category, setcategory] = useState(1);
  const [image, setimage] = useState(null);
  const [categories, setcategories] = useState([]);
  const [error, seterror] = useState({});

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
  const getDetail = async () => {
    try {
      setuploading(true);
      const {data} = await getProductDetail(prod.id);
      setimage(data.image);
      setproductName(data.product_name);
      setdescription(data.description);
      setprice(data.price);
      setstock(data.stock);
      setcategory(data.category.id);
    } catch (e) {
      // ToastAndroid.show(e.message, ToastAndroid.LONG);
    } finally {
      setuploading(false);
    }
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
      shopReducer.id,
      token,
    )
      .then((res) => {
        if (res.data) {
          ToastAndroid.show('Berhasil', ToastAndroid.LONG);
          navigation.goBack();
        } else {
          seterror(res);
          ToastAndroid.show('Gagal Tambah Product', ToastAndroid.LONG);
        }
        setuploading(false);
      })
      .catch((err) => {
        ToastAndroid.show(err.message, ToastAndroid.LONG);
        setuploading(false);
      });
  };

  const updateProductToShop = () => {
    setuploading(true);

    updateProduct(
      prod.id,
      productName,
      description,
      price,
      stock,
      photo,
      category,
      token,
    )
      .then((res) => {
        if (res.data) {
          ToastAndroid.show('Berhasil', ToastAndroid.LONG);
          navigation.navigate('ProductDashboard');
        } else {
          seterror(res);
          ToastAndroid.show('Gagal Tambah Product', ToastAndroid.LONG);
        }
        setuploading(false);
      })
      .catch((err) => {
        ToastAndroid.show(err.message, ToastAndroid.LONG);
        setuploading(false);
      });
  };

  const deleteItem = (prodId) => {
    setuploading(true);
    deleteProduct(prodId, token)
      .then((res) => {
        if (res.status === 'success') {
          ToastAndroid.show('Berhasil Dihapus', ToastAndroid.LONG);
          navigation.goBack();
        } else {
          seterror(res);
          ToastAndroid.show('Gagal Hapus Product', ToastAndroid.LONG);
        }
        setuploading(false);
      })
      .catch((err) => {
        ToastAndroid.show(err.message, ToastAndroid.LONG);
        setuploading(false);
      });
  };

  const getCategories = () => {
    getCategoryList()
      .then((data) => {
        data.data
          ? setcategories(data.data)
          : ToastAndroid.show(data.status, ToastAndroid.LONG);
      })
      .catch((err) => {
        ToastAndroid.show(err.message, ToastAndroid.LONG);
      });
  };

  useEffect(() => {
    getCategories();
    getDetail();
    const unsubscribe = navigation.addListener('focus', () => {
      seterror([]);
      setuploading(false);
      setPhoto(null);
    });
    return unsubscribe;
  }, [prod]);

  return (
    <ScrollView style={[styles.screen, styles.container, styles.relative]}>
      <TouchableOpacity
        onPress={() => handleChoosePhoto()}
        style={styles.alignSelfCenter}>
        {photo ? (
          <Image source={photo} style={styles.imgSquareMedium} />
        ) : image ? (
          <Image source={{uri: image}} style={styles.imgSquareMedium} />
        ) : (
          <MaterialCommunityIcons
            name="image-edit"
            color={colors.backgroundDark2}
            size={150}
          />
        )}
      </TouchableOpacity>
      {error.image ? <Text style={styles.textError}>{error.image}</Text> : null}
      <View style={styles.marginVerticalMini}>
        <TextInput
          style={styles.textInput}
          placeholder="Nama Barang"
          value={productName}
          onChangeText={(inputName) => setproductName(inputName)}
        />
        {error.product_name ? (
          <Text style={styles.textError}>{error.product_name}</Text>
        ) : null}
      </View>
      <View style={styles.marginVerticalMini}>
        <TextInput
          style={[styles.textInput, styles.textInputMultiline]}
          multiline={true}
          numberOfLines={3}
          placeholder="Deskripsi"
          value={description}
          onChangeText={(inputDesc) => setdescription(inputDesc)}
        />
        {error.description ? (
          <Text style={styles.textError}>{error.description}</Text>
        ) : null}
      </View>
      <View style={styles.marginVerticalMini}>
        <View style={styles.row}>
          <View style={{flex: 4}}>
            <TextInput
              style={styles.textInput}
              keyboardType="numeric"
              placeholder="Harga"
              value={`${price}`}
              onChangeText={(inputPrice) => setprice(_.toInteger(inputPrice))}
            />
            {error.price ? (
              <Text style={styles.textError}>{error.price}</Text>
            ) : null}
          </View>
          <View style={{flex: 1, marginLeft: 8}}>
            <TextInput
              style={styles.textInput}
              keyboardType="numeric"
              placeholder="Stock"
              value={`${stock}`}
              onChangeText={(inputStock) => setstock(_.toInteger(inputStock))}
            />
            {error.stock ? (
              <Text style={styles.textError}>{error.stock}</Text>
            ) : null}
          </View>
        </View>
      </View>
      <View style={styles.marginVerticalMini}>
        <View style={styles.textInput}>
          <Picker
            mode="dropdown"
            selectedValue={category}
            onValueChange={(value) => setcategory(value)}>
            {categories.map((cat) => (
              <Picker.Item label={cat.category} value={cat.id} key={cat.id} />
            ))}
          </Picker>
        </View>
        {error.category ? (
          <Text style={styles.textError}>{error.category}</Text>
        ) : null}
      </View>
      {prod.id ? (
        <TouchableOpacity
          style={[styles.row, styles.marginVerticalMini]}
          onPress={() => deleteItem(prod.id)}>
          <MaterialCommunityIcons
            name="delete"
            color={colors.backgroundDark2}
            size={26}
          />

          <View style={[styles.marginHorizontalMini, styles.justifyCenter]}>
            <Text>Hapus</Text>
          </View>
        </TouchableOpacity>
      ) : null}
      <Button
        title={prod.id ? 'Update Product' : 'Add Product'}
        isLoading={uploading}
        onPress={() => {
          prod.id ? updateProductToShop() : addProductToShop();
        }}
      />
    </ScrollView>
  );
};

export default AddProduct;
