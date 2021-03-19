import { nest } from 'recompose';

import { ThemeProvider, Themer } from './theme';
import { LayoutProvider } from './LayoutContext';

// TODO: deprecate ThemeProvider
export default nest(ThemeProvider, LayoutProvider, Themer);
