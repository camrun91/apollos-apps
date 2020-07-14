import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';

import WebView from './WebView';
import PlayButtonConnected from './PlayButtonConnected';
import PlayButton from './PlayButtonConnected/PlayButton';
import AudioPlayButton from './AudioPlayButton';

const MediaControls = ({
  coverImageSources,
  error,
  liveStreamSource,
  loading,
  parentChannelName,
  title,
  videoSource,
  audioSource,
  webViewUrl,
  ...props
}) => {
  if (loading || error) return null;

  let Control = null;

  const showLoadingState =
    loading && !(videoSource || audioSource || liveStreamSource || webViewUrl);

  //  We have a `liveStreamSource` so content is live!
  if (get(liveStreamSource, 'uri', false)) {
    Control = (
      <PlayButtonConnected
        isLive
        isLoading={showLoadingState}
        component={PlayButton}
        coverImageSources={coverImageSources}
        parentChannelName={parentChannelName}
        title={title}
        videoSource={liveStreamSource}
        {...props}
      />
    );
    // We don't have a `liveStreamSource` but we do have a `webviewUrl` so content is live!
  } else if (webViewUrl) {
    Control = (
      <WebView
        isLoading={showLoadingState}
        Component={WebView}
        coverImageSources={coverImageSources}
        webViewUrl={webViewUrl}
        {...props}
      />
    );
    // We have audio but no video
  } else if (get(audioSource, 'uri') && !get(videoSource, 'uri')) {
    Control = (
      <PlayButtonConnected
        isLoading={showLoadingState}
        Component={AudioPlayButton}
        coverImageSources={coverImageSources}
        parentChannelName={parentChannelName}
        title={title}
        isVideo={false}
        videoSource={audioSource}
        {...props}
      />
    );
  }
  // Default case, normal media.
  else {
    Control = (
      <PlayButtonConnected
        isLoading={showLoadingState}
        Component={PlayButton}
        coverImageSources={coverImageSources}
        parentChannelName={parentChannelName}
        title={title}
        videoSource={videoSource}
        {...props}
      />
    );
  }

  return Control;
};

MediaControls.propTypes = {
  coverImageSources: PropTypes.arrayOf(PropTypes.shape({})),
  error: PropTypes.string,
  liveStreamSource: PropTypes.string,
  loading: PropTypes.bool,
  parentChannelName: PropTypes.string,
  title: PropTypes.string,
  videoSource: PropTypes.shape({}),
  audioSource: PropTypes.shape({}),
  webViewUrl: PropTypes.string,
};

export default MediaControls;
