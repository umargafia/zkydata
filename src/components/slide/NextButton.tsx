import React, { useEffect, useState } from 'react';
import { TouchableOpacity, StyleSheet, FlatList } from 'react-native';

import MyIcon from '../global/MyIcon';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../base/NativeStack';

import SlideList from '../../utilities/SliderList';
import { Box, Button, ButtonText } from '@gluestack-ui/themed';
import { ColorConstant } from '../../utilities/Theme';
interface NextButtonProps {
  percentage: number;
  scrollRef: React.RefObject<FlatList>;
}

type navigationProps = NativeStackNavigationProp<RootStackParamList, 'welcome'>;
const NextButton: React.FC<NextButtonProps> = ({ percentage, scrollRef }) => {
  const navigation = useNavigation<navigationProps>();
  const [isLast, setLast] = useState<boolean>(false);

  useEffect(() => {
    if (percentage < 100 && scrollRef.current) {
      setLast(false);
    } else {
      setLast(true);
    }
  }, [percentage]);

  const handleNextPress = () => {
    if (percentage < 100 && scrollRef.current) {
      const totalListItems = SlideList.length;
      const scrollToIndex = Math.floor((percentage / 100) * totalListItems);
      scrollRef.current.scrollToIndex({
        index: scrollToIndex,
        animated: true,
      });
    } else {
      navigation.replace('welcome');
    }
  };

  return (
    <Box backgroundColor="#fff" style={styles.container}>
      {isLast === false ? (
        <TouchableOpacity style={styles.button} onPress={handleNextPress}>
          <MyIcon name="arrow-forward" size={30} color={'#fff'} />
        </TouchableOpacity>
      ) : (
        <Button
          onPress={handleNextPress}
          bgColor={ColorConstant.primary}
          width={'50%'}
        >
          <ButtonText textTransform="capitalize"> get started</ButtonText>
        </Button>
      )}
    </Box>
  );
};

export default NextButton;

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    borderRadius: 100,
    width: 70,
    height: 70,
    justifyContent: 'center',
    backgroundColor: ColorConstant.primary,
    alignItems: 'center',
  },
});
