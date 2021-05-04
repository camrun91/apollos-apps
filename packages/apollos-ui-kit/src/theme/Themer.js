import React, { createContext, useContext } from 'react';
import { useColorScheme } from 'react-native';
import PropTypes from 'prop-types';
import { merge, isPlainObject } from 'lodash';
import defaultTheme from './defaultTheme';
import createTheme from './createTheme';

const ThemeContext = createContext(defaultTheme);
const useTheme = () => useContext(ThemeContext);

// for backward compatibility with class based components
const Theme = ThemeContext.Consumer;

// This function deeply strips out values in an object that are null or undefined.
// In other words, turns { bla: { foo: 'orange', bar: null }, baz: null }
// into { bla: { foo: 'orange' } }
const stripNullLeaves = (obj, cb) => {
  const out = {};

  Object.keys(obj).forEach((k) => {
    const val = obj[k];

    if (val !== null && typeof val === 'object' && isPlainObject(val)) {
      out[k] = stripNullLeaves(val, cb);
    } else if (obj[k] != null) {
      out[k] = val;
    }
  });

  return out;
};

const Themer = ({ theme: themeInput, ...props }) => {
  const theme = useTheme();
  const type = useColorScheme();

  return (
    <ThemeContext.Provider
      // this allows us to overwrite another provider somewhere up the chain.
      // <Themer theme={theme}> can be used at the top level and then
      // further down the tree <Themer theme={theme}> can be called to further
      // customize the the theme
      value={createTheme(
        merge({}, theme, stripNullLeaves({ type, ...themeInput }))
      )}
      // prop spreading shouldn't be necessary, currently we are passing through
      // the one signal key on the app template, need to find a way around
      {...props}
    />
  );
};

Themer.propTypes = {
  theme: PropTypes.shape({}),
};

Themer.defaultProps = {
  theme: {},
};

export { useTheme, Theme };
export default Themer;
