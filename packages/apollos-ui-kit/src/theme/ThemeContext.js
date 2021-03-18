import { createContext } from 'react';
import createTheme from './createTheme';

const ThemeContext = createContext(createTheme({}));

export default ThemeContext;
