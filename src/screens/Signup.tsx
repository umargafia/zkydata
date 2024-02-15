import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import WebView from 'react-native-webview';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

import Loader from '../components/global/Loader';
import Urls from '../utilities/Urls';
import useDetectInternet from '../components/global/detectInternet';
import { RootStackParamList } from '../base/NativeStack';

const urls = Urls();

type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'signup'
>;
const SignupPage: React.FC = () => {
  useDetectInternet();
  const [isLoading, setLoading] = useState<boolean>(true);
  const navigation = useNavigation<HomeScreenNavigationProp>();

  const handleWebViewLoadStart = () => {
    setLoading(true);
  };

  const handleWebViewLoadEnd = () => {
    setLoading(false);
  };

  const handleWebViewError = () => {
    navigation.replace('error');
  };

  return (
    <>
      <StatusBar style="dark" />
      <View style={styles.container}>
        {isLoading && <Loader />}
        <WebView
          source={{ uri: urls.signup }}
          onLoadStart={handleWebViewLoadStart}
          onLoadEnd={handleWebViewLoadEnd}
          style={isLoading ? styles.webview : null}
          onError={handleWebViewError}
          onHttpError={handleWebViewError}
        />
      </View>
    </>
  );
};

export default SignupPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
    justifyContent: 'center',
  },
  webview: {
    display: 'none',
  },
});
