import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';

import {
  styled,
  TouchableScale,
  Card,
  Icon,
  MediaThumbnailItem,
  PaddedView,
  withTheme,
  H6,
} from '@apollosproject/ui-kit';

const Container = styled({
  flexDirection: 'row',
  alignItems: 'flex-start',
  justifyContent: 'flex-start',
})(View);

const StyledCard = styled(({ theme }) => ({
  margin: 0,
  marginHorizontal: 0,
  marginVertical: 0,
  width: theme.sizing.baseUnit * 4,
  backgroundColor: theme.colors.darkSecondary,
}))(Card);

const MediaThumbnailIcon = withTheme(({ theme }) => ({
  size: theme.sizing.baseUnit * 1.5,
}))(Icon);

const AudioPlayButton = ({
  coverImageSources,
  icon,
  onPress,
  isLoading,
  title,
  ...props
}) => (
  <Container {...props}>
    <TouchableScale onPress={onPress}>
      <PaddedView vertical={false}>
        <StyledCard forceRatio={1} isLoading={isLoading}>
          <MediaThumbnailItem centered>
            <MediaThumbnailIcon name={icon} isLoading={isLoading} />
            <H6>{title}</H6>
          </MediaThumbnailItem>
        </StyledCard>
      </PaddedView>
    </TouchableScale>
  </Container>
);

AudioPlayButton.propTypes = {
  coverImageSources: PropTypes.arrayOf(PropTypes.shape({})),
  icon: PropTypes.string,
  onPress: PropTypes.func,
  title: PropTypes.string,
  isLoading: PropTypes.bool,
};

AudioPlayButton.defaultProps = {
  icon: 'audio',
  title: 'Play',
};

export default AudioPlayButton;
