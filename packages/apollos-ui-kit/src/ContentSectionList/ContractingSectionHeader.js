import React, { useCallback } from 'react';
import { View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  withSpring,
} from 'react-native-reanimated';
import PropTypes from 'prop-types';
import ContentTitles from '../ContentTitles';
import styled from '../styled';

import SectionHeader from './SectionHeader';

const PaperView = styled(({ theme }) => ({
  backgroundColor: theme.colors.background.paper,
}))(View);

const ContractingSectionHeader = ({
  scrollY,
  yOffset,
  contentTitlesHeight,
  sectionHeaderHeight,
  isContracted,
  ...otherProps
}) => {
  const handlecontentTitlesLayout = useCallback(
    ({ nativeEvent }) => {
      contentTitlesHeight.value = nativeEvent.layout.height; // eslint-disable-line no-param-reassign
    },
    [contentTitlesHeight]
  );

  const handleSectionHeaderLayout = useCallback(
    ({ nativeEvent }) => {
      sectionHeaderHeight.value = nativeEvent.layout.height; // eslint-disable-line no-param-reassign
    },
    [sectionHeaderHeight]
  );

  const headerAnimation = useDerivedValue(() => {
    if (isContracted) return 1;
    if (scrollY.value < 0) return 0;
    return Math.min(1, scrollY.value / yOffset.value);
  });

  const contentTitlesStyle = useAnimatedStyle(() => {
    const translateY =
      scrollY.value <= yOffset.value ? 0 : -scrollY.value + yOffset.value;
    return {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      transform: [
        {
          translateY,
        },
      ],
    };
  });

  const fadeInHeaderStyle = useAnimatedStyle(() => {
    const opacity = withSpring(headerAnimation.value >= 1 ? 1 : 0);
    return {
      opacity,
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      zIndex: headerAnimation.value >= 1 ? 1 : -1,
    };
  });

  const containerStyle = useAnimatedStyle(() => {
    return {
      height: sectionHeaderHeight.value,
    };
  });

  return (
    <Animated.View style={containerStyle}>
      <Animated.View style={contentTitlesStyle}>
        <PaperView onLayout={handlecontentTitlesLayout}>
          {!isContracted ? <ContentTitles featured {...otherProps} /> : null}
        </PaperView>
      </Animated.View>

      <Animated.View
        onLayout={handleSectionHeaderLayout}
        style={fadeInHeaderStyle}
      >
        <SectionHeader {...otherProps} isContracted={isContracted} />
      </Animated.View>
    </Animated.View>
  );
};

ContractingSectionHeader.propTypes = {
  scrollY: PropTypes.shape({ value: PropTypes.number }),
  yOffset: PropTypes.shape({ value: PropTypes.number }),
  contentTitlesHeight: PropTypes.shape({ value: PropTypes.number }),
  sectionHeaderHeight: PropTypes.shape({ value: PropTypes.number }),
  isContracted: PropTypes.bool,
};

export default ContractingSectionHeader;
