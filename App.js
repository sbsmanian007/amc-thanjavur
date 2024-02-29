import { StyleSheet, Text, View, SafeAreaView, StatusBar } from "react-native";
import Login from "./App/Screens/Login";
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/clerk-expo";
import { NavigationContainer } from "@react-navigation/native";
import TabNavigation from "./App/Navigations/TabNavigation";
import { useFonts } from "expo-font";
import {
  MD3LightTheme as DefaultTheme,
  PaperProvider,
} from "react-native-paper";

import { createStackNavigator } from "@react-navigation/stack";
import Admin from "./App/Screens/Admin";

const Stack = createStackNavigator();

const theme = {
  ...DefaultTheme,
  roundness: 0,
  colors: {
    ...DefaultTheme.colors,
    primary: "#786E64",
    accent: "#786E64",
    backgroundColor: "#FFE6C8",
    primaryText: "#796E64",
    subText: "#ABA59F",
    primaryButton: "#FFC30F",
    secondaryButton: "#FFC20F",
    greenAccent: "#68C677",
    backgroundGrey: "#FCFCFC",
    yellow: "#FFC20F",
    surface: "#FFFBF7",
  },
};

const STATUSBAR_HEIGHT = StatusBar.currentHeight;

export default function App() {
  const [fontsLoaded] = useFonts({
    appfont: require("./assets/fonts/Outfit-Regular.ttf"),
    "appfont-Bold": require("./assets/fonts/Outfit-Bold.ttf"),
    "appfont-Semi": require("./assets/fonts/Outfit-SemiBold.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }
  return (
    <SafeAreaView style={styles.container}>
      <PaperProvider theme={theme}>
        <StatusBar
          style={styles.statusBarStyle}
          backgroundColor={"#FFF"}
          barStyle={"dark-content"}
        />
        <ClerkProvider
          publishableKey={
            "pk_test_aW50aW1hdGUtZ2FyZmlzaC0yNi5jbGVyay5hY2NvdW50cy5kZXYk"
          }
        >
          <SignedIn>
            <NavigationContainer>
              <TabNavigation />
            </NavigationContainer>
          </SignedIn>
          <SignedOut>
            <NavigationContainer>
              <Stack.Navigator
                screenOptions={{ headerShown: false }}
                initialRouteName="Login"
              >
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Admin" component={Admin} />
              </Stack.Navigator>
            </NavigationContainer>
          </SignedOut>
        </ClerkProvider>
      </PaperProvider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  statusBarStyle: {
    height: STATUSBAR_HEIGHT,
  },
});
