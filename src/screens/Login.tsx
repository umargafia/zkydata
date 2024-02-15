import { StyleSheet } from 'react-native';
import React from 'react';
import { Box, ImageBackground, ScrollView, VStack } from '@gluestack-ui/themed';
import ExpoStatusBar from 'expo-status-bar/build/ExpoStatusBar';

import { WindowConstant } from '../utilities/Theme';
import Form from '../components/login/Form';
import { Image } from 'expo-image';

export default function Login() {
  return (
    <Box flex={1}>
      <ExpoStatusBar style="light" />
      <ScrollView bgColor="white">
        <Box height={WindowConstant.height / 3}>
          <ImageBackground
            style={styles.backgroundImage}
            source={require('../../assets/background.png')}
          />
        </Box>
        <VStack
          borderTopRightRadius={40}
          borderTopLeftRadius={40}
          zIndex={20}
          transform={[{ translateY: -40 }]}
          minHeight={WindowConstant.height / 1.5}
          backgroundColor="white"
        >
          <Image
            source={require('../../assets/logo.png')}
            style={styles.image}
            contentFit="cover"
          />
          <Form />
        </VStack>
      </ScrollView>
    </Box>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  image: {
    height: 80,
    width: '80%',
    resizeMode: 'cover',
    marginTop: 10,
    alignSelf: 'center',
  },
});
