import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, BackHandler } from 'react-native';
import { WebView, WebViewNavigation } from 'react-native-webview';
import { StatusBar } from 'expo-status-bar';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../base/NativeStack';

import Urls from '../utilities/Urls';
import Loader from '../components/global/Loader';
import { RouteProp } from '@react-navigation/native';

const urls = Urls();

type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'home'
>;

type HomeScreenRouteProp = RouteProp<RootStackParamList, 'home'>;
interface HomeProps {
  route: HomeScreenRouteProp;
  navigation: HomeScreenNavigationProp;
}

const Home: React.FC<HomeProps> = ({ route, navigation }) => {
  const [visited, setVisited] = useState(false);
  const { phone, password } = route?.params;
  const webViewRef = useRef<WebView>(null);
  const [isLoading, setLoading] = useState(true);
  const [canGoBack, setCanGoBack] = useState(false);

  useEffect(() => {
    const backAction = () => {
      if (canGoBack && webViewRef.current) {
        webViewRef.current.goBack();
        return true;
      }
      return false;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );

    return () => backHandler.remove();
  }, [canGoBack]);

  const handleWebViewLoadStart = () => {
    setLoading(true);
  };

  const handleWebViewLoad = () => {
    const script = `
        document.getElementById('phonelogin').value = '${phone}';
        document.getElementById('passwordlogin').value = '${password}';
        document.getElementById('submit-btn').click();
      `;
    if (webViewRef.current) {
      webViewRef.current.injectJavaScript(script);
    }

    visited && setLoading(false);
    setVisited(true);
  };

  const handleWebViewNavigationStateChange = (
    newNavState: WebViewNavigation
  ) => {
    setCanGoBack(newNavState.canGoBack);

    if (newNavState.url === urls.home) {
      setLoading(false);
    }

    if (newNavState.url === urls.login && visited === true) {
      navigation.replace('welcome');
    }
  };

  const handleShouldStartLoadWithRequest = (event: WebViewNavigation) => {
    setLoading(true);
    return true;
  };

  return (
    <>
      <StatusBar style="dark" />
      <View style={styles.container}>
        {isLoading && <Loader />}
        <WebView
          ref={webViewRef}
          source={{ uri: urls.login }}
          onLoad={handleWebViewLoad}
          onLoadStart={handleWebViewLoadStart}
          style={isLoading && styles.webview}
          onNavigationStateChange={handleWebViewNavigationStateChange}
          startInLoadingState={true}
          onShouldStartLoadWithRequest={handleShouldStartLoadWithRequest}
          renderLoading={() => <Loader />}
          javaScriptEnabled={true}
          domStorageEnabled={true}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
  },
  webview: {
    display: 'none',
  },
});

export default Home;
