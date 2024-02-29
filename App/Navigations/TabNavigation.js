import Hospital from "../Screens/Hospital";
import Homenavigation from "./HomeNavigation";


import React from "react";
import { StyleSheet } from "react-native";
import { CommonActions } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { BottomNavigation } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Appointments from "../Screens/Appointments";

const Tab = createBottomTabNavigator();

export default function TabNavigation() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
   
      tabBar={({ navigation, state, descriptors, insets }) => (
        <BottomNavigation.Bar
          navigationState={state}
          safeAreaInsets={insets}
          onTabPress={({ route, preventDefault }) => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });
            if (event.defaultPrevented) {
              preventDefault();
            } else {
              navigation.dispatch({
                ...CommonActions.navigate(route.name, route.params),
                target: state.key,
              });
            }
          }}
          renderIcon={({ route, focused, color }) => {
            const { options } = descriptors[route.key];
            if (options.tabBarIcon) {
              return options.tabBarIcon({ focused, color, size: 24 });
            }

            return null;
          }}
          getLabelText={({ route }) => {
            const { options } = descriptors[route.key];
            const label =
              options.tabBarLabel !== undefined
                ? options.tabBarLabel
                : options.title !== undefined
                ? options.title
                : route.title;

            return label;
          }}
        />
      )}
    >
      <Tab.Screen
        name="Doctor"
        component={Homenavigation}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => {
            return <Icon name="doctor" size={size} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name="Hospital"
        component={Hospital}
        options={{
          tabBarLabel: "Booking",
         
          tabBarIcon: ({ color, size }) => {
            return <Icon name="calendar" size={size} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name="Appointments"
        component={Appointments}
        options={{
          tabBarLabel: "Appointments",
          tabBarIcon: ({ color, size }) => {
            return <Icon name="bookmark" size={size} color={color} />;
          },
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
