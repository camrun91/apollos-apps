import { StatusBar } from 'react-native';
import {
  NavigationContainer,
  useNavigation,
  DarkTheme,
  DefaultTheme,
} from '@react-navigation/native';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import SplashScreen from 'react-native-splash-screen';
import 'react-native-gesture-handler'; // required for react-navigation
import { enableScreens } from 'react-native-screens';

import ApollosConfig from '@apollosproject/config';
import {
  BackgroundView,
  withTheme,
  NavigationService,
  Providers as ThemeProvider,
} from '@apollosproject/ui-kit';
import Passes from '@apollosproject/ui-passes';
import { MapViewConnected as Location } from '@apollosproject/ui-mapview';
import Auth, { ProtectedRoute } from '@apollosproject/ui-auth';
import { Landing, Onboarding } from '@apollosproject/ui-onboarding';

import {
  ContentSingleConnected,
  ContentFeedConnected,
  SearchScreenConnected,
  UserSettingsConnected,
} from '@apollosproject/ui-connected';
import Providers from './Providers';
import Tabs from './tabs';

enableScreens(); // improves performance for react-navigation

const AppStatusBar = withTheme(({ theme }) => ({
  barStyle: theme.barStyle,
  backgroundColor: theme.colors.background.paper,
}))(StatusBar);

const ProtectedRouteWithSplashScreen = () => {
  const handleOnRouteChange = () => SplashScreen.hide();
  const navigation = useNavigation();
  return (
    <ProtectedRoute
      onRouteChange={handleOnRouteChange}
      navigation={navigation}
    />
  );
};

const ThemedNavigationContainer = withTheme(({ theme, ...props }) => ({
  theme: {
    ...(theme.type === 'dark' ? DarkTheme : DefaultTheme),
    dark: theme.type === 'dark',
    colors: {
      ...(theme.type === 'dark' ? DarkTheme.colors : DefaultTheme.colors),
      primary: theme.colors.secondary,
      background: theme.colors.background.screen,
      card: theme.colors.background.paper,
      text: theme.colors.text.primary,
    },
  },
  ...props,
}))(({ containerRef, ...props }) => (
  <NavigationContainer ref={containerRef} {...props} />
));

const { Navigator, Screen } = createNativeStackNavigator();

const App = () => (
  <ThemeProvider theme={ApollosConfig.THEME} icons={ApollosConfig.ICONS}>
    <BackgroundView>
      <AppStatusBar />
      <ThemedNavigationContainer
        containerRef={NavigationService.setTopLevelNavigator}
        onReady={NavigationService.setIsReady}
      >
        <Providers>
          <Navigator
            screenOptions={{ headerShown: false, stackPresentation: 'modal' }}
          >
            <Screen
              name="ProtectedRoute"
              component={ProtectedRouteWithSplashScreen}
            />
            <Screen
              name="Tabs"
              component={Tabs}
              options={{
                gestureEnabled: false,
                stackPresentation: 'push',
              }}
            />
            <Screen
              name="ContentSingle"
              component={ContentSingleConnected}
              options={{
                title: 'Content',
                stackPresentation: 'fullScreenModal',
              }}
            />
            <Screen
              component={ContentFeedConnected}
              name="ContentFeed"
              options={({ route }) => ({
                title: route.params.itemTitle || 'Content Feed',
                stackPresentation: 'push',
              })}
            />
            <Screen
              name="Auth"
              component={Auth}
              options={{
                gestureEnabled: false,
                stackPresentation: 'push',
              }}
            />
            <Screen
              name="Location"
              component={Location}
              options={{ title: 'Campuses' }}
            />
            <Screen
              name="Passes"
              component={Passes}
              options={{ title: 'Check-In Pass' }}
            />
            <Screen
              name="Onboarding"
              component={Onboarding}
              options={{
                gestureEnabled: false,
                stackPresentation: 'push',
              }}
            />
            <Screen name="LandingScreen" component={Landing} />
            <Screen name="Search" component={SearchScreenConnected} />
            <Screen
              name="UserSettingsNavigator"
              component={UserSettingsConnected}
            />
          </Navigator>
        </Providers>
      </ThemedNavigationContainer>
    </BackgroundView>
  </ThemeProvider>
);

export default App;
