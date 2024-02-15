import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { Image } from 'expo-image';

import { ColorConstant, WindowConstant } from '../../utilities/Theme';

interface SliderItemProps {
  item: {
    key: number;
    title: string;
    description: string;
    image: any;
  };
}
const SlideItem: React.FC<SliderItemProps> = ({ item }) => {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={item.image} style={styles.image} contentFit="contain" />
      </View>

      <View style={styles.innerContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
    </View>
  );
};

export default SlideItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
    width: WindowConstant.width,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerContainer: {
    flex: 0.3,
    minHeight: 55,
  },
  imageContainer: {
    width: WindowConstant.width,
    height: WindowConstant.height / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '80%',
    flex: 0.7,
    justifyContent: 'center',
    borderRadius: 10,
  },
  title: {
    fontWeight: '800',
    fontSize: 28,
    textAlign: 'center',
    color: ColorConstant.primary,
    textTransform: 'uppercase',
    marginTop: 20,
    marginBottom: 20,
  },
  description: {
    color: ColorConstant.gray,
    paddingHorizontal: 64,
    fontWeight: '600',
    textAlign: 'center',
    textTransform: 'capitalize',
  },
});
