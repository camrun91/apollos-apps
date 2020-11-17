import React from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import renderer from 'react-test-renderer';
import wait from 'waait';
import TestProvider from './TestProvider';

export { TestProvider };

export const renderWithApolloData = async (component) => {
  const tree = renderer.create(component);
  await wait(0);
  tree.update(component);
  return tree;
};

export const WithReactNavigator = (Component) => {
  const AppNavigator = createStackNavigator({
    Home: {
      screen: () => Component,
      navigationOptions: {
        headerMode: 'none',
        header: null,
      },
    },
  });

  const AppContainer = createAppContainer(AppNavigator);
  return <AppContainer />;
};

export const buildGetMock = (response, dataSource) => {
  const get = jest.fn();
  if (Array.isArray(response) && Array.isArray(response[0])) {
    response.forEach((responseVal) => {
      get.mockReturnValueOnce(
        new Promise((resolve) => resolve(dataSource.normalize(responseVal)))
      );
    });
  }
  get.mockReturnValue(
    new Promise((resolve) => resolve(dataSource.normalize(response)))
  );
  return get;
};
