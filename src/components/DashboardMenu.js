import React from 'react';
import {View, Text} from 'react-native';
import {TouchableNativeFeedback} from 'react-native-gesture-handler';
import {Card} from 'react-native-paper';
import {colors, styles} from '../styles/styles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const DashboardMenu = ({icon, title, onPress}) => {
  return (
    <Card style={[styles.imgSquareSmall, styles.marginVerticalMini]}>
      <TouchableNativeFeedback onPress={() => onPress()}>
        <View style={[styles.imgSquareSmall, styles.centerContainer]}>
          <MaterialCommunityIcons
            name={icon}
            color={colors.backgroundDark2}
            size={36}
          />
          <Text style={styles.textCenter}>{title}</Text>
        </View>
      </TouchableNativeFeedback>
    </Card>
  );
};

export default DashboardMenu;
