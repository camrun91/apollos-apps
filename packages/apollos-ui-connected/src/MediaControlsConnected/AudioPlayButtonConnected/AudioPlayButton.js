import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';

import {
  styled,
  TouchableScale,
  MediaThumbnail,
  MediaThumbnailIcon,
  MediaThumbnailItem,
  H6,
} from '@apollosproject/ui-kit';

const Container = styled(
  {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  'ui-connected.MediaControlsConnected.AudioPlayButtonConnected.PlayButton.Container'
)(View);

const StyledMediaThumbnail = styled(
  { marginVertical: 0 },
  'ui-connected.MediaControlsConnected.PlayButtonConnected.PlayButton.StyledMediaThumbnail'
)(MediaThumbnail);

const AudioPlayButton = ({
  coverImageSources,
  icon,
  onPress,
  title,
  ...props
}) => (
  <Container {...props}>
    <TouchableScale onPress={onPress}>
      <StyledMediaThumbnail image={coverImageSources}>
        <MediaThumbnailItem centered>
          <MediaThumbnailIcon name={icon} />
          <H6>{title}</H6>
        </MediaThumbnailItem>
        {/* <MediaThumbnailItem centered bottom>
          <H6 padded>{title}</H6>
        </MediaThumbnailItem> */}
      </StyledMediaThumbnail> 
    </TouchableScale>
  </Container>
);

AudioPlayButton.propTypes = {
  coverImageSources: PropTypes.arrayOf(PropTypes.shape({})),
  icon: PropTypes.string,
  onPress: PropTypes.func,
  title: PropTypes.string,
};

AudioPlayButton.defaultProps = {
  icon: 'audio',
  title: 'Play',
};

export default AudioPlayButton;
