import React from 'react';
import PropTypes from 'prop-types';

import { H4 } from '../typography';
import PaddedView from '../PaddedView';
import Touchable from '../Touchable';
import styled from '../styled';
import Icon from '../Icon';
import { withTheme } from '../theme';

const Container = styled(
  ({ theme }) => ({
    backgroundColor: theme.colors.background.paper,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  }),
  'ui-kit.ContentSectionList.SectionHeader.Container'
)(PaddedView);

const Title = styled({
  maxWidth: '50%',
})(H4);

export const DownArrow = withTheme(({ theme, isContracted }) => ({
  name: 'arrow-down',
  size: theme.sizing.baseUnit * 0.75,
  fill: theme.colors.background.paper,
  style: {
    transform: isContracted ? [{ rotate: '-90deg' }] : [],
  },
}))(Icon);

const SectionHeader = ({ section, isContracted, onPressContract }) => {
  if (!section.title) return null;

  return (
    <Touchable onPress={onPressContract}>
      <Container>
        <Title numberOfLines={1}>{section.title}</Title>
        <DownArrow isContracted={isContracted} />
      </Container>
    </Touchable>
  );
};

SectionHeader.propTypes = {
  section: PropTypes.shape({
    title: PropTypes.string,
  }),
  isContracted: PropTypes.bool,
  onPressContract: PropTypes.func,
};

export default SectionHeader;
