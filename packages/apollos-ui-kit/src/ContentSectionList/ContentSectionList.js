/* eslint-disable react/display-name */
import React, { useMemo } from 'react';
import { Animated, View } from 'react-native';
import ConnectedImage from '../ConnectedImage';
import StretchyView from '../StretchyView';
import ContentTitles from '../ContentTitles';
import { BodyText, Paragraph } from '../typography';
import PaddedView from '../PaddedView';
import styled from '../styled';

import SectionHeader from './SectionHeader';

const { SectionList } = Animated;

const makeData = (key) => ({
  key,
  renderItem: () => (
    <PaddedView>
      <Paragraph>
        <BodyText>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
          mauris felis, dictum eget tincidunt nec, mattis sed nisi. Aenean
          varius turpis dictum dui fringilla gravida. Maecenas luctus vestibulum
          bibendum. Curabitur efficitur at justo in venenatis. Suspendisse risus
          ipsum, viverra quis placerat vel, congue porttitor ex. Sed sit amet
          urna eros. Nulla a nulla risus. Vestibulum nisi leo, ornare nec quam
          ac, porta elementum lorem. Etiam quis libero id massa aliquet aliquam
          vel nec magna. Vestibulum maximus velit turpis, in viverra elit
          commodo ac.
        </BodyText>
      </Paragraph>
      <Paragraph>
        <BodyText>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
          mauris felis, dictum eget tincidunt nec, mattis sed nisi. Aenean
          varius turpis dictum dui fringilla gravida. Maecenas luctus vestibulum
          bibendum. Curabitur efficitur at justo in venenatis. Suspendisse risus
          ipsum, viverra quis placerat vel, congue porttitor ex. Sed sit amet
          urna eros. Nulla a nulla risus. Vestibulum nisi leo, ornare nec quam
          ac, porta elementum lorem. Etiam quis libero id massa aliquet aliquam
          vel nec magna. Vestibulum maximus velit turpis, in viverra elit
          commodo ac.
        </BodyText>
      </Paragraph>
    </PaddedView>
  ),
});

const FEATURES = [
  {
    key: 'content',
    title: 'Title',
    data: [makeData('content-1')],
  },
  {
    key: 'scripture',
    title: 'Scripture',
    data: [makeData('scripture-1')],
  },
];

const StyledSectionList = styled(({ theme }) => ({
  backgroundColor: theme.colors.background.screen,
}))(SectionList);

const PaperView = styled(({ theme }) => ({
  backgroundColor: theme.colors.background.paper,
}))(View);

const ContentSectionList = () => {
  const renderItem = useMemo(
    () => ({ item }) => {
      if (item?.renderItem && typeof item?.renderItem === 'function') {
        return item.renderItem();
      }
      if (item?.renderItem) {
        return item;
      }
      return null;
    },
    []
  );

  return (
    <StretchyView>
      {({ Stretchy, onScroll }) => (
        <StyledSectionList
          ListHeaderComponent={
            <>
              <Stretchy>
                <ConnectedImage
                  source={{
                    uri: 'https://source.unsplash.com/random/800x800',
                    width: 800,
                    height: 800,
                  }}
                  maintainAspectRatio
                />
              </Stretchy>
              <PaperView>
                <ContentTitles
                  featured
                  title="Title"
                  summary="Summary"
                  onPressLike={() => {}}
                  onPressShare={() => {}}
                />
              </PaperView>
            </>
          }
          sections={FEATURES}
          renderSectionHeader={SectionHeader}
          renderItem={renderItem}
          onScroll={onScroll}
          scrollEventThrottle={16}
        />
      )}
    </StretchyView>
  );
};

export default ContentSectionList;
