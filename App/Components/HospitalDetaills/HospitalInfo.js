import { View, Text } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../../assets/Shared/Colors";
import { StyleSheet } from "react-native";

export default function HospitalInfo() {
  return (
    <View >
      <View style={styles.header}>
        <Text style={styles.headingStyle}>Aadhithya Medical center</Text>
       
      </View>

      <View style={{ marginLeft: -5, backgroundColor: '#f5f5f5', paddingHorizontal: 20, paddingVertical: 15 }}>
          <View style={styles.flexRow}>
            <Ionicons name="location" size={22} color={Colors.blue} />
            <Text style={styles.textStyle}>
              #64, 4th Cross Street, Cauvery Nagar, Thanjavur - 613005
            </Text>
          </View>
          <View style={styles.flexRow}>
            <Ionicons name="time" size={22} color={Colors.blue} />
            <Text style={styles.textStyle}> Mon Sun | 11AM - 8 PM</Text>
          </View>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headingStyle: {
    color: Colors.blue,
    fontSize: 20,
    fontFamily: "appfont-Semi",
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: "#FFF",
    borderBottomColor: '#eee',
    borderBottomWidth: 2
  },
  flexRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  textStyle: {
    fontFamily: "appfont",
    fontSize: 14,
  },
});
