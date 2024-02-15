import React from 'react';
import { Animated, StyleSheet } from 'react-native';

import { ColorConstant, WindowConstant } from '../../utilities/Theme';
import { Box } from '@gluestack-ui/themed';

interface PaginatorProps {
  data: any[];
  scrollX: Animated.Value;
}

const Paginator: React.FC<PaginatorProps> = ({ data, scrollX }) => {
  return (
    <Box flexDirection="row" height={64} paddingTop={20}>
      {data.map((_, i) => {
        const inputRange = [
          (i - 1) * WindowConstant.width,
          i * WindowConstant.width,
          (i + 1) * WindowConstant.width,
        ];

        const dotWidth = scrollX.interpolate({
          inputRange,
          outputRange: [10, 20, 10],
          extrapolate: 'clamp',
        });

        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0.3, 1, 0.3],
          extrapolate: 'clamp',
        });

        return (
          <Animated.View
            style={[styles.dot, { width: dotWidth, opacity }]}
            key={i.toString()}
          />
        );
      })}
    </Box>
  );
};

export default Paginator;

const styles = StyleSheet.create({
  dot: {
    height: 10,
    borderRadius: 5,
    backgroundColor: ColorConstant.primary,
    marginHorizontal: 8,
  },
});
