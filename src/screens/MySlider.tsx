import { Animated, FlatList } from 'react-native';
import React, { useRef, useState } from 'react';
import { Box } from '@gluestack-ui/themed';
import { StatusBar } from 'expo-status-bar';

import SlideList from '../utilities/SliderList';
import SlideItem from '../components/slide/SlideItem';
import NextButton from '../components/slide/NextButton';
import Paginator from '../components/slide/Paginator';

const MySlider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const slideRef = useRef<FlatList>(null);

  const viewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: any }) => {
      setCurrentIndex(viewableItems[0].index);
    }
  ).current;

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  return (
    <Box
      flex={1}
      justifyContent="space-around"
      alignItems="center"
      backgroundColor="#fff"
    >
      <StatusBar style="dark" />
      <Box flex={3}>
        <FlatList
          data={SlideList}
          renderItem={({ item }) => <SlideItem item={item} />}
          horizontal
          ref={slideRef}
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          bounces={false}
          keyExtractor={(item) => item.key}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            {
              useNativeDriver: false,
            }
          )}
          scrollEventThrottle={32}
          onViewableItemsChanged={viewableItemsChanged}
          viewabilityConfig={viewConfig}
        />
      </Box>
      <Paginator data={SlideList} scrollX={scrollX} />
      <NextButton
        percentage={(currentIndex + 1) * (100 / SlideList.length)}
        scrollRef={slideRef}
      />
    </Box>
  );
};

export default MySlider;
