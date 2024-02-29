import { View, Text, StyleSheet, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import Colors from "../../assets/Shared/Colors";
import GlobalApi from "../Services/GlobalApi";
import moment from "moment";
import { useNavigation } from "@react-navigation/native";
import { useUser } from "@clerk/clerk-expo";
import { ActivityIndicator } from "react-native-paper";

export default function Appointments() {
  const { user } = useUser();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  useEffect(() => {
    setLoading(true);
    const getAppointments = () => {
      const email = user.primaryEmailAddress.emailAddress;
      GlobalApi.getAppointmentsByEmail(email)
        .then((ressponse) => {
          setLoading(false);
          setAppointments(ressponse.data.data);
        })
        .catch((err) => {
          setLoading(false);
        });
    };
    const onFocusListener = navigation.addListener("focus", () => {
      getAppointments();
    });

    return () => {
      onFocusListener();
    };
  }, []);

  return (
    <View style={styles.container}>
      <View
        style={{
          backgroundColor: "#fff",
          paddingHorizontal: 20,
          paddingVertical: 20,
          borderBottomColor: "#eee",
          borderBottomWidth: 1,
        }}
      >
        <Text
          style={{
            fontFamily: "appfont-Semi",
            color: Colors.blue,
            fontSize: 20,
          }}
        >
          Appointments
        </Text>
      </View>
      <ScrollView style={{ paddingHorizontal: 10 }}>
        {loading && (
          <View
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginVertical: 15,
            }}
          >
            <ActivityIndicator animating={true} color={Colors.blue} />
          </View>
        )}
        {appointments.length === 0 && !loading && (
          <View
            style={{
              display: "flex",
              height: 200,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={styles.headingStyle}> No Appointment</Text>
          </View>
        )}
        {appointments.map((ele, index) => {
          return (
            <View style={styles.cardStyle} key={index}>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  borderBottomWidth: 1,
                  paddingBottom: 5,
                  borderColor: "#eee",
                  paddingHorizontal: 10,
                  paddingTop: 10,
                  paddingBottom: 10,
                  overflow: "hidden",
                }}
              >
                <View>
                  <Text
                    numberOfLines={1}
                    ellipsizeMode={"tail"}
                    style={styles.textStyle}
                  >
                    #
                    {moment(ele.appointment_date)
                      .format("DD-MM-YYYYY")
                      .split("-")
                      .join("")}
                    {index + 1}
                  </Text>
                </View>
              </View>
              <View>
                <View style={styles.flexRow}>
                  <View style={{ ...styles.flexView, flex: 1 }}>
                    <Text style={styles.headingStyle}>Patient Name</Text>
                    <Text style={styles.subHeadingStyle}>
                      {ele.attributes.username}
                    </Text>
                    <Text style={{ ...styles.subHeadingStyle, fontSize: 18 }}>
                      {ele.attributes.email}
                    </Text>
                  </View>
                </View>
              </View>

              <View>
                <View style={styles.flexRow}>
                  <View style={styles.flexView}>
                    <Text style={styles.headingStyle}>Date</Text>
                    <Text style={styles.subHeadingStyle}>
                      {moment(ele.attributes.appointment_date).format(
                        "DD-MM-YYYYY"
                      )}
                    </Text>
                  </View>

                  <View style={styles.flexView}>
                    <Text style={styles.headingStyle}>Time</Text>
                    <Text style={styles.subHeadingStyle}>
                      {ele.attributes.appointment_time.split(":")[0]}:
                      {ele.attributes.appointment_time.split(":")[1]}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          );
        })}
        <View style={styles.extraHeight}></View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  cardStyle: {
    borderWidth: 1,
    borderColor: "#eee",
    backgroundColor: "#FFF",
    borderRadius: 5,
    marginTop: 10,
  },
  extraHeight: {
    height: 200,
  },
  textStyle: {
    color: "#000",
    fontSize: 16,
    fontFamily: "appfont-Bold",
  },
  statusTextStyle: {
    color: "#FFF",
    fontSize: 12,
    textTransform: "capitalize",
    fontFamily: "appfont",
  },
  statusView: {
    backgroundColor: "#0074E41A",
    paddingHorizontal: 10,
    paddingTop: 2,
    paddingBottom: 4,
    overflow: "hidden",
  },
  headingStyle: {
    color: "#000",
    fontSize: 16,
    fontFamily: "appfont-Bold",
  },
  subHeadingStyle: {
    fontSize: 14,
    fontFamily: "appfont",
  },
  flexView: {
    flex: 0.5,
    borderWidth: 0.5,
    padding: 10,
    borderColor: "#ccc",
    borderRightWidth: 0.5,
  },
  flexRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  rescheduleButtonStyle: {
    padding: 10,
    backgroundColor: Colors.PRIMARY,
    borderBottomLeftRadius: 5,
  },
  cancelButtonStyle: {
    padding: 10,
    backgroundColor: Colors.LIGHT_GRAY,
    borderBottomRightRadius: 5,
  },
  buttonTextStyle: {
    color: "#FFF",
    fontFamily: "appfont-Semi",
    textAlign: "center",
  },
});
