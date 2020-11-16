import React from 'react';
import PropTypes from 'prop-types';

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
