/* eslint-disable react/display-name,react/prop-types */
import React, { useMemo, useCallback, useState } from 'react';
import {
  LayoutAnimation,
  Platform,
  UIManager,
  View,
  SectionList,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import PropTypes from 'prop-types';
import ConnectedImage from '../ConnectedImage';
import StretchyView from '../StretchyView/ReanimatedStretchyView';
import styled from '../styled';

import SectionHeader from './SectionHeader';
import ContractingSectionHeader from './ContractingSectionHeader';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

const AnimatedSectionList = Animated.createAnimatedComponent(SectionList);

const StyledSectionList = styled(({ theme }) => ({
  backgroundColor: theme.colors.background.screen,
}))(AnimatedSectionList);

const ContentSectionList = ({
  title,
  summary,
  coverImage,
  onPressLike,
  onPressShare,
  isLiked,
  sections = [],
}) => {
  const scrollY = useSharedValue(0);
  const headerYOffset = useSharedValue(0);
  const contentTitlesHeight = useSharedValue(0);
  const sectionHeaderHeight = useSharedValue(0);
  const [contractedState, setContractedState] = useState({});

  const setHeaderYOffset = useCallback(
    ({ nativeEvent }) => {
      headerYOffset.value = nativeEvent.layout.height;
    },
    [headerYOffset]
  );

  // Contract a single section
  const toggleContract = useCallback(
    (section) => {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      setContractedState({
        ...contractedState,
        [section.key]: !contractedState[section.key],
      });
    },
    [setContractedState, contractedState]
  );

  // helper function to get true/false isContracted of a section
  const getContractState = useMemo(
    () => (section) => !!contractedState[section.key],
    [contractedState]
  );

  // Used as a "spacer" later to offset the content within the first section
  // This accounts for the first header fading in and out
  const headerSpacerStyle = useAnimatedStyle(() => ({
    height: contentTitlesHeight.value - sectionHeaderHeight.value,
  }));

  const renderSectionHeader = useMemo(
    () => ({ section }) => {
      if (sections[0] === section) {
        return (
          <ContractingSectionHeader
            title={title}
            summary={summary}
            onPressLike={onPressLike}
            onPressShare={onPressShare}
            onPressContract={() => toggleContract(section)}
            isContracted={getContractState(section)}
            isLiked={isLiked}
            scrollY={scrollY}
            yOffset={headerYOffset}
            contentTitlesHeight={contentTitlesHeight}
            sectionHeaderHeight={sectionHeaderHeight}
            section={section}
          />
        );
      }
      return (
        <SectionHeader
          section={section}
          isContracted={getContractState(section)}
          onPressContract={() => toggleContract(section)}
        />
      );
    },
    [
      title,
      summary,
      onPressLike,
      onPressShare,
      isLiked,
      scrollY,
      headerYOffset,
      contentTitlesHeight,
      sectionHeaderHeight,
      toggleContract,
      getContractState,
      sections,
    ]
  );

  const renderItem = useMemo(
    () => ({ item, index, section }) => {
      let result = null;
      if (item?.renderItem && typeof item?.renderItem === 'function') {
        result = item.renderItem();
      } else if (item?.renderItem) {
        result = item;
      }
      const isContracted = getContractState(section);
      const contractedStyle = {
        height: isContracted ? 0 : undefined,
        opacity: isContracted ? 0 : 1,
      };
      return (
        <>
          {sections[0] === section && index === 0 ? (
            <Animated.View style={headerSpacerStyle} />
          ) : null}
          <View style={contractedStyle}>{result}</View>
        </>
      );
    },
    [sections, headerSpacerStyle, getContractState]
  );

  return (
    <StretchyView scrollY={scrollY}>
      {({ Stretchy, onScroll }) => (
        <StyledSectionList
          ListHeaderComponent={
            coverImage ? (
              <>
                <Stretchy>
                  <ConnectedImage
                    onLayout={setHeaderYOffset}
                    source={coverImage?.sources || coverImage}
                    maintainAspectRatio
                  />
                </Stretchy>
              </>
            ) : null
          }
          sections={sections}
          renderSectionHeader={renderSectionHeader}
          renderItem={renderItem}
          onScroll={onScroll}
          scrollEventThrottle={16}
        />
      )}
    </StretchyView>
  );
};

ContentSectionList.propTypes = {
  title: PropTypes.string,
  summary: PropTypes.string,
  coverImage: PropTypes.shape({ sources: PropTypes.shape({}) }),
  onPressLike: PropTypes.func,
  onPressShare: PropTypes.func,
  isLiked: PropTypes.bool,
  sections: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      title: PropTypes.string,
      data: PropTypes.arrayOf(
        PropTypes.shape({
          renderItem: PropTypes.func,
        })
      ),
    })
  ),
};

export default ContentSectionList;
