import React from 'react';
import { Text } from 'react-native';
import renderer from 'react-test-renderer';
import Themer, { useTheme, Theme } from './Themer';

describe('Themer', () => {
  it('should pass theme down through useTheme hook', () => {
    const Paper = () => {
      const theme = useTheme();
      return <Text>{theme.colors.paper}</Text>;
    };
    const App = () => (
      <Themer>
        <Paper />
      </Themer>
    );
    const tree = renderer.create(<App />);
    expect(tree).toMatchSnapshot();
  });

  it('has a backwards compatible consumer for class components', () => {
    class Paper extends React.PureComponent {
      render() {
        return <Theme>{(theme) => <Text>{theme.colors.paper}</Text>}</Theme>;
      }
    }
    const App = () => (
      <Themer>
        <Paper />
      </Themer>
    );
    const tree = renderer.create(<App />);
    expect(tree).toMatchSnapshot();
  });

  it('should allow for updating the theme provider', () => {
    const Paper = () => {
      const theme = useTheme();
      return <Text>{theme.colors.paper}</Text>;
    };
    const PaperParent = () => {
      const theme = { colors: { paper: 'red' } };
      return (
        <Themer theme={theme}>
          <Paper />
        </Themer>
      );
    };
    const App = () => {
      return (
        <Themer>
          <PaperParent />
        </Themer>
      );
    };
    const tree = renderer.create(<App />);
    expect(tree).toMatchSnapshot();
  });
});
