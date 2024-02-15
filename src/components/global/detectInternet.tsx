import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';
import * as Network from 'expo-network';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../base/NativeStack';

type navProps = NativeStackNavigationProp<RootStackParamList>;
const useDetectInternet = () => {
  const navigate = useNavigation<navProps>();

  useEffect(() => {
    const checkNetworkState = async () => {
      try {
        const networkState = await Network.getNetworkStateAsync();
        if (
          networkState.isConnected === true &&
          networkState.isInternetReachable === true
        ) {
        } else {
          navigate.replace('error');
        }
      } catch (error) {
        console.log(error);
        navigate.replace('error');
      }
    };

    checkNetworkState();
  }, []);
};

export default useDetectInternet;
