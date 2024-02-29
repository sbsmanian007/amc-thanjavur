import { View, ScrollView } from "react-native";
import React from "react";
import HospitalInfo from "../Components/HospitalDetaills/HospitalInfo";
import BookingSection from "../Components/HospitalDetaills/BookingSection";

export default function Hospital() {
  return (
    <ScrollView>
      <View>
        <HospitalInfo />
      </View>
      <View>
        <BookingSection />
      </View>
      <View style={{height: 1}}></View>
    </ScrollView>
  );
}
