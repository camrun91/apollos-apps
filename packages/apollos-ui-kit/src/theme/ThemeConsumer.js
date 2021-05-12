import { withTheme } from './OLD_theme';

const ThemeConsumer = withTheme()(({ children, theme }) => children(theme));

export default ThemeConsumer;
