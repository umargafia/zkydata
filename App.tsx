import { NavigationContainer } from '@react-navigation/native';
import { config } from '@gluestack-ui/config';
import { GluestackUIProvider } from '@gluestack-ui/themed';

import NativeStack from './src/base/NativeStack';

export default function App() {
  return (
    <GluestackUIProvider config={config}>
      <NavigationContainer>
        <NativeStack />
      </NavigationContainer>
    </GluestackUIProvider>
  );
}
