import React from 'react';

import { H4 } from '../typography';
import PaddedView from '../PaddedView';
import styled from '../styled';

const Container = styled(
  ({ theme }) => ({
    backgroundColor: theme.colors.background.paper,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  }),
  'ui-kit.ContentSectionList.SectionHeader.Container'
)(PaddedView);

const SectionHeader = ({ section, ...other }) =>
  console.log({ section, ...other }) || section.renderSectionHeader ? (
    section.renderSectionHeader()
  ) : (
    <Container>
      <H4>{section.title}</H4>
    </Container>
  );

export default SectionHeader;
