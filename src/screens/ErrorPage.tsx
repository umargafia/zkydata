import { Image, StyleSheet, Text, View } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

import MyButton from '../components/global/MyButton';
import { RootStackParamList } from '../base/NativeStack';
import { WindowConstant } from '../utilities/Theme';

type navigationProps = NativeStackNavigationProp<RootStackParamList>;
export default function ErrorPage() {
  const navigation = useNavigation<navigationProps>();
  return (
    <>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            source={require('../../assets/error.png')}
            style={styles.image}
          />
        </View>
        <Text style={styles.text}>
          Something went wrong, please check your internet connection and try
          agin later
        </Text>
        <MyButton
          text="Back to Home"
          style={styles.button}
          onPress={() => navigation.replace('welcome')}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },
  imageContainer: {
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    overflow: 'hidden',
  },
  image: {
    height: WindowConstant.height / 3,
    width: 300,
    resizeMode: 'contain',
  },
  text: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
  button: {
    marginTop: 20,
    width: '80%',
  },
});
