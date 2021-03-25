// experimental
import React, { useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import {
  useSharedValue,
  useAnimatedScrollHandler,
} from 'react-native-reanimated';

import Stretchy from './ReanimatedStretchy';

const StretchyView = ({ children }) => {
  const scrollY = useSharedValue(0);

  const onScroll = useAnimatedScrollHandler((event) => {
    scrollY.value = event.contentOffset.y;
  });

  const renderStretchy = useMemo(
    // eslint-disable-next-line react/display-name
    () => (props) => <Stretchy {...props} scrollY={scrollY} />,
    [scrollY]
  );

  return (
    <View style={StyleSheet.absoluteFill}>
      {children({
        scrollEventThrottle: 16,
        onScroll,
        Stretchy: renderStretchy,
      })}
    </View>
  );
};

export default StretchyView;
