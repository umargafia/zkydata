import { Dimensions, Platform } from 'react-native';

export const ColorConstant = {
  primary: '#09753c',
  black: '#424242',
  red: '#c5221f',
  gray: '#62656b',
};

export const WindowConstant: { width: number; height: number } = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height,
};

export const DeviceConstant: { isAndroid: boolean; IsIos: boolean } = {
  isAndroid: Platform.OS === 'android',
  IsIos: Platform.OS === 'ios',
};
