import React from 'react';
import PropTypes from 'prop-types';
import mergeStyles from '../styled/mergeStyles';
import Themer, { useTheme } from './Themer';

export const ThemeProvider = ({ themeInput, ...props }) => (
  <Themer theme={themeInput} {...props} />
);

ThemeProvider.propTypes = {
  themeInput: PropTypes.shape({}),
};

export const withTheme = (mapper, name = '') => (Component) => (props) => {
  const theme = useTheme();

  // console.log('theme from context', theme);
  const themeProps = mapper({ theme, ...props });
  const override = theme.overrides[name] || {};
  const overrideProps =
    typeof override === 'function' ? override(props) : override;

  return (
    <Component
      {...props}
      {...themeProps}
      {...overrideProps}
      style={mergeStyles(themeProps.style || {}, overrideProps.style || {})}
    />
  );
};

// TODO make name not rely on withTheme
export const named = (name) => withTheme(() => ({}), name);

// const withThemeMixin;
// const ThemeMixin;
// const ThemeConsumer;
