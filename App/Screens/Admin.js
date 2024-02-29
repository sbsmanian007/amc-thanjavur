
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AdminTab from "./AdminTab";
import AdminLogin from "./AdminLogin";

export default function Admin() {
  const Stack = createStackNavigator();
  return (
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName="AdminLogin"
      >
        <Stack.Screen name="AdminLogin" component={AdminLogin} />
        <Stack.Screen name="AdminTab" component={AdminTab} />
      </Stack.Navigator>
    
  );
}
