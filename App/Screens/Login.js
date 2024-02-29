import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from "react-native";
import React, { useEffect } from "react";
import loginImage from "./../../assets/images/app.png";
import Colors from "../../assets/Shared/Colors";
import SignInWithOAuth from "../Components/SignInWithOAuth";
import { useNavigation } from "@react-navigation/native";

export default function Login() { 
  const navigation = useNavigation();
  const onPressLoginAsAdmin = () => {
    navigation.navigate("Admin");
  };
  useEffect(() => {
    StatusBar.setBackgroundColor(Colors.PRIMARY);
    StatusBar.setBarStyle("light-content");
    return () => {
      StatusBar.setBackgroundColor(Colors.white);
      StatusBar.setBarStyle("dark-content");
    };
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View>
        <View style={styles.logoViewStyle}>
          <Image source={loginImage} style={styles.appImage}></Image>
        </View>
        <View
          style={{
            backgroundColor: Colors.PRIMARY,
            height: 100,
            width: "100%",
          }}
        ></View>
        <View style={styles.card}>
          <Text style={styles.heading}>Book Appointments </Text>
          <Text style={styles.subHeading}>Effortlessly</Text>
          <Text style={styles.captionStyle}> Manage your health journey </Text>
          <SignInWithOAuth />
          <View style={styles.adminSection}>
            <TouchableOpacity
              style={styles.buttonStyle}
              onPress={() => onPressLoginAsAdmin()}
            >
              <Text style={styles.buttonTextSTyle}>Login As Admin</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  logoViewStyle: {
    height: 200,
    width: "100%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.PRIMARY,
    paddingTop: 10,
  },
  appImage: {
    flex: 1,
    height: null,
    width: "100%",
    objectFit: "contain",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    marginTop: 30
  },
  heading: {
    fontSize: 26,
    color: Colors.PRIMARY,
    fontFamily: "appfont-Bold",
  },
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  card: {
    borderWidth: 2,
    borderColor: "#eee",
    marginHorizontal: 20,
    padding: 20,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "#fff",
    marginTop: -60,

  },
  subHeading: {
    color: Colors.PRIMARY,
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "appfont-Semi",
  },
  captionStyle: {
    marginTop: 10,
    fontSize: 16,
    fontFamily: "appfont-Semi",
  },
  adminSection: {
    width: "100%",
  },
  buttonStyle: {
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.PRIMARY,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
  },
  buttonTextSTyle: {
    color: Colors.PRIMARY,
    fontWeight: "bold",
    fontSize: 16,
    fontFamily: "appfont-Semi",
  },
});
