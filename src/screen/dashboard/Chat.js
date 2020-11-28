/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {View, Text, ActivityIndicator, Image} from 'react-native';
import {useSelector} from 'react-redux';
import {getChatList} from '../../services/Chat';
import {colors, styles} from '../../styles/styles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {TouchableNativeFeedback} from 'react-native-gesture-handler';

const Chat = ({navigation}) => {
  const {token, user} = useSelector((state) => state);
  const [chatList, setChatList] = useState([]);
  const [loading, setLoading] = useState(true);

  const getList = () => {
    setLoading(true);
    getChatList(user.id, token)
      .then((res) => setChatList(res.data))
      .catch((e) => console.log(e))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    getList();
  }, [navigation]);

  if (loading) {
    return (
      <View style={[styles.centerContainer, styles.screen]}>
        <ActivityIndicator color={colors.primary} size="large" />
      </View>
    );
  }

  return (
    <View>
      <View>
        {chatList ? (
          chatList.chats ? (
            chatList.chats.map((chat) => (
              <TouchableNativeFeedback
                key={chat.id}
                onPress={() =>
                  navigation.navigate('ChatMessage', {to: chat.id})
                }>
                <View style={[styles.row, styles.containerMini]}>
                  <View style={styles.marginHorizontalMini}>
                    {chat.shop ? (
                      <Image
                        source={{
                          uri: chat.shop.image,
                        }}
                        style={styles.profileImageSmall}
                      />
                    ) : chat.userdetail ? (
                      <Image
                        source={{
                          uri: chat.userdetail.avatar,
                        }}
                        style={styles.profileImageSmall}
                      />
                    ) : (
                      <MaterialCommunityIcons name="account-circle" size={52} />
                    )}
                  </View>
                  <View style={styles.centerContainer}>
                    <Text style={styles.textMediumBold}>
                      {chat.shop ? chat.shop.shop_name : chat.name}
                    </Text>
                  </View>
                </View>
              </TouchableNativeFeedback>
            ))
          ) : (
            <Text>Kosong</Text>
          )
        ) : null}
      </View>
    </View>
  );
};

export default Chat;
