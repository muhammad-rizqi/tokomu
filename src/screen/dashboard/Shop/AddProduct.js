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
import {getCategoryList} from '../../../controller/Category';
import {styles} from '../../../styles/styles';
import ImagePicker from 'react-native-image-picker';
import {addProduct} from '../../../controller/Product';
import {useSelector} from 'react-redux';

const AddProduct = ({route, navigation}) => {
  // console.log(route.params)
  const prod = route.params.data;

  const [uploading, setuploading] = useState(false);
  const [photo, setPhoto] = useState(null);
  const {token} = useSelector((state) => state);
  const shopReducer = useSelector((state) => state.shop);

  //data to send
  const [productName, setproductName] = useState('');
  const [description, setdescription] = useState('');
  const [price, setprice] = useState(0);
  const [stock, setstock] = useState(0);
  const [category, setcategory] = useState(1);
  const [categories, setcategories] = useState([]);

  const handleChoosePhoto = () => {
    ImagePicker.launchImageLibrary(
      {
        noData: true,
      },
      (response) => {
        if (response.uri) {
          setPhoto(response);
          // prod.image = null;
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
      shopReducer.id,
      token,
    )
      .then((res) => {
        setuploading(false);
        navigation.navigate('ShopDashboard');
        console.log(res);
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
    const unsubscribe = navigation.addListener('focus', () => {
      setPhoto(null);
      setproductName('');
      setdescription('');
      setprice(0);
      setstock(0);
      setcategory(1);
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <ScrollView style={[styles.screen, styles.container, styles.relative]}>
      <TouchableOpacity
        style={styles.absoluteTopRight}
        onPress={() => navigation.navigate('ShopDashboard')}>
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
              : prod.image
              ? {
                  uri:
                    'http://tokomu.herokuapp.com/uploads/products/' +
                    prod.image,
                }
              : require('../../../assets/icons/insert-picture-button.png')
          }
          style={styles.imgSquareMedium}
        />
      </TouchableOpacity>
      <View style={styles.marginVerticalMini}>
        <TextInput
          style={styles.textInput}
          placeholder="Nama Barang"
          value={
            prod.product_name && productName === ''
              ? prod.product_name
              : productName
          }
          onChangeText={(inputName) => setproductName(inputName)}
        />
      </View>
      <View style={styles.marginVerticalMini}>
        <TextInput
          style={[styles.textInput, styles.textInputMultiline]}
          multiline={true}
          placeholder="Deskripsi"
          value={
            prod.description && description === ''
              ? prod.description
              : description
          }
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
              value={prod.price && price === 0 ? `${prod.price}` : `${price}`}
              onChangeText={(inputPrice) => setprice(inputPrice)}
            />
          </View>
          <View style={{flex: 1, marginLeft: 8}}>
            <TextInput
              style={styles.textInput}
              keyboardType="numeric"
              placeholder="Stock"
              value={prod.stock && stock === 0 ? `${prod.stock}` : `${stock}`}
              onChangeText={(inputStock) => setstock(inputStock)}
            />
          </View>
        </View>
      </View>
      <View style={styles.marginVerticalMini}>
        <Picker
          selectedValue={
            prod.category_id && category === 1 ? prod.category_id : category
          }
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
  );
};

export default AddProduct;
