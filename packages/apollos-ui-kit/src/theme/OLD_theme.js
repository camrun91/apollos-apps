import React from 'react';
import PropTypes from 'prop-types';
import mergeStyles from '../styled/mergeStyles';
import Themer, { useTheme } from './Themer';
import createTheme from './createTheme';

export const ThemeProvider = ({ themeInput, ...props }) => (
  <Themer theme={createTheme(themeInput)} {...props} />
);

ThemeProvider.propTypes = {
  themeInput: PropTypes.shape({}),
};

export const withTheme = (
  mapper = ({ theme } = {}) => ({ theme }),
  name = ''
) => (Component) => (props) => {
  const theme = useTheme();
  const themeProps = mapper({ theme, ...props });
  const override = theme?.overrides[name] || {};
  const overrideProps =
    typeof override === 'function' ? override(props) : override;
  const styleProps =
    themeProps.style && overrideProps.style
      ? {
          style: mergeStyles(themeProps.style || {}, overrideProps.style || {}),
        }
      : {};

  return (
    <Component {...props} {...themeProps} {...overrideProps} {...styleProps} />
  );
};

// TODO make named not rely on withTheme
export const named = (name) => withTheme(() => ({}), name);

/* eslint-disable-next-line */
export const withThemeMixin = (input) => (Component) => (props) => {
  const theme = useTheme();
  const newTheme =
    typeof input === 'function' ? input({ ...props, theme }) : input;
  return (
    <Themer theme={createTheme(newTheme)}>
      <Component />
    </Themer>
  );
};

export const ThemeMixin = withThemeMixin(({ mixin = {} } = {}) => mixin)(
  ({ children }) => children
);

export const ThemeConsumer = withTheme()(({ children, theme }) =>
  children(theme)
);
