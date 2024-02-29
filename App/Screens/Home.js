import { View, Text, Button, ScrollView } from "react-native";
import React from "react";

import Header from "../Components/Home/Header";

import Doctorinfo from "../Components/Home/Doctorinfo";

export default function Home() {
  return (
    <ScrollView>
      <Header />
      <Doctorinfo />
      <View style={{height: 1}}></View>
    </ScrollView>
  );
}
