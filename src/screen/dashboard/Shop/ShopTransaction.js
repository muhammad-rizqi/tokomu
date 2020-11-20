import React from 'react';
import {View, Text} from 'react-native';
import {toPrice} from '../../../services/global_var/api';

const ShopTransaction = () => {
  const [transaction, setTransaction] = useState([]);
  const {token, user} = useSelector((state) => state);
  const [data, setData] = useState([]);

  useEffect(() => {
    getTransactionList(user.id, token)
      .then((res) => {
        if (res.status === 'success') {
          setTransaction(res.data.transactions);
          console.log(res.data.transactions);
        } else {
          ToastAndroid.show(res.message, ToastAndroid.LONG);
        }
      })
      .catch((e) => console.log(e));
  }, [navigation]);

  return (
    <View>
      <Text>TransactionList</Text>
      {transaction ? (
        transaction.length > 0 ? (
          transaction.map((transact) => (
            <TouchableNativeFeedback
              key={transact.id}
              onPress={() => navigation.navigate('Payment', {data: transact})}>
              <Card style={[styles.cartItem]}>
                <View style={[styles.row, styles.container]}>
                  <Image
                    source={{uri: transact.product.image}}
                    style={styles.imgSquareSmall}
                  />
                  <View style={[styles.flex1, styles.marginHorizontalMini]}>
                    <Text>{transact.product.product_name}</Text>
                    <Text>Rp. {toPrice(transact.product.price)}</Text>
                    <Text>Jumlah barang: {transact.qty}</Text>
                    <Text>Rp. {toPrice(transact.total)}</Text>
                    <Text>{transact.status}</Text>
                  </View>
                </View>
              </Card>
            </TouchableNativeFeedback>
          ))
        ) : (
          <Text>Data Kosong</Text>
        )
      ) : (
        <Text>Error</Text>
      )}
    </View>
  );
};

export default ShopTransaction;
