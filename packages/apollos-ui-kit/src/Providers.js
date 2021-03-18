import React from 'react';
import { nest } from 'recompose';

import { ThemeProvider, ThemeContext, createTheme } from './theme';
import { LayoutProvider } from './LayoutContext';

// TODO: probably don't need to nest here, we should just export LayoutProvider after
// deprecating the old ThemeProvider for more transparency with props
export default nest(
  ThemeProvider,
  LayoutProvider,
  ({ customTheme = {}, ...props }) => (
    <ThemeContext.Provider value={createTheme(customTheme)} {...props} />
  )
);
