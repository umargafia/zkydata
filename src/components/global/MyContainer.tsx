import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  StyleProp,
  StyleSheet,
  View,
  ViewProps,
  ViewStyle,
} from 'react-native';
import { WindowConstant } from '../../utilities/Theme';

const MyContainer: React.FC<{
  style?: StyleProp<ViewStyle>;
  padding?: number | boolean;
  background?: string;
  children?: React.ReactNode;
}> = ({ style, padding, background, children }) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <View
        style={[
          style,
          styles.container,
          padding !== undefined && { paddingTop: WindowConstant.width * 0.05 },
          style,
          background !== undefined && { backgroundColor: background },
        ]}
      >
        {children}
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 30,
    paddingHorizontal: WindowConstant.width * 0.05,
    paddingBottom: WindowConstant.width * 0.05,
  },
});

export default MyContainer;
