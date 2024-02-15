import { StyleProp, StyleSheet, Text, TextStyle, View } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons/';
import React from 'react';
import { ColorConstant } from '../../utilities/Theme';

interface MyIconProps {
  name: any;
  size?: number;
  color?: string;
  material?: boolean;
  style?: StyleProp<TextStyle>;
}
const MyIcon: React.FC<MyIconProps> = ({
  name,
  size,
  color,
  material,
  style,
}) => {
  if (material) {
    return (
      <MaterialIcons
        name={name}
        size={size || 28}
        color={color || ColorConstant.gray}
        style={style}
      />
    );
  }

  return (
    <Ionicons
      name={name}
      size={size || 28}
      color={color || ColorConstant.gray}
    />
  );
};

export default MyIcon;

const styles = StyleSheet.create({});
