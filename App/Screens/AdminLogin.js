import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  ToastAndroid,
} from "react-native";
import { TextInput } from "react-native";
import React, { useEffect, useState } from "react";
import loginImage from "./../../assets/images/app.png";
import Colors from "../../assets/Shared/Colors";
import { useNavigation } from "@react-navigation/native";
import GlobalApi from "../Services/GlobalApi";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();
  const [loader, setLoader] = useState(false);
  const [showUpdatePassword, setShowPassword] = useState(false);
  const onPressLogin = () => {
    if(!email || !password) {
        return null
    }
    setLoader(true);
    const req = {
      identifier: email,
      password: password,
    };
    GlobalApi.adminLogin(req)
      .then((response) => {
        setLoader(false);
        console.log(response);
        navigation.navigate("AdminTab");
      })
      .catch((err) => {
        setLoader(false);
        console.log(JSON.stringify(err));
        ToastAndroid.show(JSON.stringify(err.message), ToastAndroid.LONG);
      });
  };
  useEffect(() => {
    StatusBar.setBackgroundColor(Colors.PRIMARY);
    StatusBar.setBarStyle("light-content");
    return () => {
      StatusBar.setBackgroundColor(Colors.white);
      StatusBar.setBarStyle("dark-content");
    };
  }, []);

  const sendEmail = () => {
    if(!email) {
        return
    }
    setLoader(true)
    GlobalApi.forgotPassword({email: email}).then((response) => {
        setLoader(false)
        ToastAndroid.show("Email send successfully", ToastAndroid.LONG);
    }).catch(err => {
        setLoader(false)
        ToastAndroid.show(JSON.stringify(err.message), ToastAndroid.LONG);
    })
  }

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
          <Text style={styles.heading}>Admin Login</Text>
          <View>
            <Text style={styles.captionStyle}> User Email </Text>
            <View
              style={{
                backgroundColor: "#FFF",
                borderWidth: 1,
                borderColor: "#ccc",
                borderRadius: 3,
                marginTop: 6,
                paddingLeft: 10,
              }}
            >
              <TextInput
                value={email}
                keyboardType="email-address"
                onChangeText={(value) => setEmail(value)}
                style={{
                  height: 50,
                  width: "100%",
                  fontFamily: "appfont-Semi",
                  fontSize: 16,
                }}
                selectionColor={Colors.blue}
              ></TextInput>
            </View>
          </View>
          {!showUpdatePassword && (
            <View>
            <Text style={styles.captionStyle}> Passowrd </Text>
            <View
              style={{
                backgroundColor: "#FFF",
                borderWidth: 1,
                borderColor: "#ccc",
                borderRadius: 3,
                marginTop: 6,
                paddingLeft: 10,
              }}
            >
              <TextInput
                value={password}
                secureTextEntry
                onChangeText={(value) => setPassword(value)}
                style={{
                  height: 50,
                  width: "100%",
                  fontFamily: "appfont-Semi",
                  fontSize: 16,
                }}
                selectionColor={Colors.blue}
              ></TextInput>
            </View>
          </View>

          )}
          {!showUpdatePassword && <View>
            <View style={styles.section}>
            <TouchableOpacity
              style={styles.buttonStyle}
              onPress={() => onPressLogin()}
            >
              <Text style={styles.buttonTextSTyle}>
                {loader ? "Logging in" : "Login"}
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{ ...styles.section, marginTop: 5 }}
          >
            <TouchableOpacity
              style={{ ...styles.buttonStyle, borderWidth: 0 }}
              onPress={() => setShowPassword(true)}
            >
              <Text style={styles.buttonTextSTyle}>Forgot Password</Text>
            </TouchableOpacity>
          </View>
            </View>}

            {showUpdatePassword && <View>
                <TouchableOpacity
              style={{ ...styles.buttonStyle}}
              onPress={() => sendEmail()}
            >
              <Text style={styles.buttonTextSTyle}>{loader ? "Sending" : "Send Reset Password Email"}</Text>
            </TouchableOpacity>
            <View
            style={{ ...styles.section, marginTop: 5 }}
          >
            <TouchableOpacity
              style={{ ...styles.buttonStyle, borderWidth: 0 }}
              onPress={() => setShowPassword(false)}
            >
              <Text style={styles.buttonTextSTyle}>Return To Admin Login</Text>
            </TouchableOpacity>
          </View>
                </View>}
         
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
    marginTop: 30,
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
  section: {
    width: "100%",
    marginTop: 10,
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
