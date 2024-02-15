import { StyleSheet } from 'react-native';
import React from 'react';
import { Box, ImageBackground } from '@gluestack-ui/themed';
import ExpoStatusBar from 'expo-status-bar/build/ExpoStatusBar';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import MyContainer from '../components/global/MyContainer';
import { Image } from 'expo-image';
import { ColorConstant, WindowConstant } from '../utilities/Theme';
import { RootStackParamList } from '../base/NativeStack';
import MyButton from '../components/global/MyButton';

type navProps = NativeStackNavigationProp<RootStackParamList, 'welcome'>;
export default function WelcomeScreen() {
  const navigation = useNavigation<navProps>();

  return (
    <ImageBackground source={require('../../assets/background.png')} flex={1}>
      <ExpoStatusBar style="light" />
      <MyContainer
        padding
        style={{ justifyContent: 'space-between', alignItems: 'center' }}
      >
        <Image source={require('../../assets/logo.png')} style={styles.image} />

        <Box style={{ alignSelf: 'stretch' }}>
          <MyButton
            text="login"
            onPress={() => navigation.navigate('login')}
            color="white"
          />
          <MyButton
            text="Register"
            background={ColorConstant.primary}
            onPress={() => navigation.navigate('signup')}
            color="white"
          />
        </Box>
      </MyContainer>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  image: {
    width: '80%',
    height: WindowConstant.width > 400 ? 300 : 200,
  },
});
