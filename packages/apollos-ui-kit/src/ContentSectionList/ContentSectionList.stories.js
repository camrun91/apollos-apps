/* eslint-disable react/display-name */
import React from 'react';
import { storiesOf } from '@apollosproject/ui-storybook';
import { BodyText, Paragraph } from '../typography';
import PaddedView from '../PaddedView';
import Comment from '../Comment';
import ContentSectionList from './ContentSectionList';

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

const makeJournal = (key) => ({
  key,
  renderItem: () => (
    <Comment
      {...{
        profile: {
          nickName: 'Albert Flores',
        },
        subtitle: 'Anderson Campus',
        onPressLike: () => ({}),
        onPressActionMenu: () => ({}),
        commentText:
          'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.',
      }}
    />
  ),
});

const FEATURES = [
  {
    key: 'content',
    title: 'A very long multiline title la de dah hello there! Even longer yo!',
    data: [makeData('content-1')],
  },
  {
    key: 'scripture',
    title: 'Scripture',
    data: [makeData('scripture-1')],
  },
  {
    key: 'journals',
    title: 'Journals',
    data: [
      makeJournal('journal-1'),
      makeJournal('journal-2'),
      makeJournal('journal-3'),
      makeJournal('journal-4'),
    ],
  },
];

storiesOf('ui-kit/ContentSectionList', module).add('default', () => (
  <ContentSectionList
    sections={FEATURES}
    title="A very long multiline title la de dah hello there! Even longer yo!"
    summary="Summary"
    onPressLike={() => {}}
    onPressShare={() => {}}
    coverImage={{
      sources: {
        uri: 'https://picsum.photos/600/600?random',
      },
    }}
  />
));
