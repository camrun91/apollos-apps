import React from 'react';
import PropTypes from 'prop-types';
import { Mutation } from 'react-apollo';

import { PLAY_VIDEO } from '@apollosproject/ui-media-player';

import AudioPlayButton from './AudioPlayButton';

const AudioPlayButtonConnected = ({
  coverImageSources,
  isVideo,
  parentChannelName,
  title,
  audioSource,
  Component,
  ...props
}) => (
  <Mutation mutation={PLAY_VIDEO}>
    {(play) => (
      <Component
        onPress={() =>
          play({
            variables: {
              mediaSource: audioSource,
              posterSources: coverImageSources,
              title,
              isVideo,
              artist: parentChannelName,
            },
          })
        }
        coverImageSources={coverImageSources}
        {...props}
      />
    )}
  </Mutation>
);

AudioPlayButtonConnected.propTypes = {
  coverImageSources: PropTypes.arrayOf(PropTypes.shape({})),
  isVideo: PropTypes.bool,
  parentChannelName: PropTypes.string,
  title: PropTypes.string,
  audioSource: PropTypes.shape({}),
  Component: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.func,
    PropTypes.object, // type check for React fragments
  ]),
};

AudioPlayButtonConnected.defaultProps = {
  isVideo: false,
  Component: AudioPlayButton,
};

export default AudioPlayButtonConnected;
