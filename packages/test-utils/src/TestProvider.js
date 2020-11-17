import React from 'react';
import PropTypes from 'prop-types';
import { MockedProvider } from 'react-apollo/test-utils';
import { Providers as UIProviders } from '@apollosproject/ui-kit';

const TestProvider = ({ children }) => (
  <UIProviders>
    <MockedProvider>{children}</MockedProvider>
  </UIProviders>
);

TestProvider.propTypes = {
  children: PropTypes.arrayOf(PropTypes.function),
};

export default TestProvider;
