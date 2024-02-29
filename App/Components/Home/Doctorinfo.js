import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import Photo from "./../../../assets/images/drelangovan.jpg";
import amc from "./../../../assets/images/amc.jpg";
import Colors from "../../../assets/Shared/Colors";
import { useNavigation } from "@react-navigation/native";
import ActionButton from "./ContactDetails";

export default function DoctorInfo() {
  const navigation = useNavigation();
  return (
    <View style={styles.cardStyle}>
      <View style={styles.cardHeader}>
        <View style={styles.imageView}>
          <Image
            source={Photo}
            style={{
              flex: 1,
              height: null,
              width: "100%",
              objectFit: "cover",
              borderRadius: 10,
            }}
          ></Image>
        </View>
        <View style={{ paddingHorizontal: 10 }}>
          <Text style={styles.textStyle}>Dr.Elangovan M.S</Text>
          <Text style={styles.textStyle2}>
            FICS,FACS,FIAGES, FIES, FCGP, FMAS
          </Text>
        </View>
      </View>
      <View style={styles.hospitalView}>
        <Image source={amc} style={{flex: 1, objectFit: 'cover', width: '100%'}}></Image>
      </View>
      <View style={{ padding: 10 }}>
        <Text style={styles.textStyle}>Passionate About My Work</Text>
        <Text style={styles.textStyle3}>
          Senior General and Laprscopic Surgeon with 30 years of Experience.
          Former Professor and HOD of Department of General Surgery. DEAN I/C
          THANJAVUR MEDICAL COLLEGE, Medical Director of Aadhithya Medical
          Centre, Cauvery Nagar,Thanjavur.{" "}
        </Text>
      </View>
      <View>
        <ActionButton />
      </View>
      <View>
        <TouchableOpacity
          onPress={() => navigation.navigate("hospital-detail")}
          style={styles.buttonStyle}
        >
          <Text style={styles.buttonText}>Make Appointment</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardStyle: {
    backgroundColor: "#FFF",
    margin: 10,
    borderRadius: 10,
    overflow: "hidden",
    elevation: 2
  },
  cardHeader: {
    backgroundColor: "#FFF",
    padding: 10,
    borderBottomColor: "#eee",
    borderBottomWidth: 1,
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  textStyle: {
    fontSize: 18,
    fontFamily: "appfont-Bold",
    margin: 3,
    color: Colors.blue,
    lineHeight: 21,
    flexWrap: "wrap",
    maxWidth: "100%",
  },
  textStyle2: {
    fontSize: 14,
    fontFamily: "appfont-Semi",
    margin: 3,
    color: "#424242",
    flexWrap: "wrap",
    maxWidth: "100%",
  },
  imageView: {
    height: 100,
    width: 100,
  },
  textStyle3: {
    fontSize: 16,
    fontFamily: "appfont",
    margin: 3,
    lineHeight: 28,
  },
  buttonStyle: {
    padding: 14,
    backgroundColor: Colors.blue,
  },
  buttonText: {
    color: Colors.white,
    textAlign: "center",
    fontFamily: "appfont-Semi",
    fontSize: 16,
  },
  hospitalView: {
    height: 300,
    width: '100%'
  }
});
