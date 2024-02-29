import {
  View,
  Text,
  StyleSheet,
  ToastAndroid,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import moment from "moment";
import { useUser } from "@clerk/clerk-expo";
import GlobalApi from "../../Services/GlobalApi";
import Colors from "../../../assets/Shared/Colors";
import CalendarStrip from "react-native-calendar-strip";
import { useNavigation } from "@react-navigation/native";
import { Chip } from "react-native-paper";
import { ActivityIndicator } from 'react-native-paper';

const currentDate = new Date();
export default function BookingSection() {
  const navigation = useNavigation();
  const { user } = useUser();
  const [selectedDate, setSelectedDate] = useState(currentDate);
  const [selectedTime, setSelectedTime] = useState(null);
  const [loader, setLoader] = useState(false);
  const [values, setValues] = useState([6, 20]);
  const [disabledSlots, setDisabledSlot] = useState([]);
  useEffect(() => {
    const onFocusListener = navigation.addListener("focus", () => {
      setSelectedDate(currentDate);
    });
    return () => {
      onFocusListener();
    };
  }, []);

  const getAvailableSlots = () => {
    GlobalApi.getAvailableDateSlots(moment(selectedDate).format("YYYY-MM-DD"))
      .then((response) => {
        const res = response.data.data;
        if (res.length) {
          const start_time = res[res.length - 1].attributes.start_time.split(":")[0];
          const end_time = res[res.length - 1].attributes.end_time.split(":")[0];
          setValues([parseInt(start_time), parseInt(end_time)]);
          setDisabledSlot(res[res.length - 1].attributes.disabled_slots.slots);
        } else {
          setValues([6, 20]);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getAvailableSlots(selectedDate);
    setDisabledSlot([]);
  }, [selectedDate]);

  const bookAppointment = () => {
    console.log(selectedTime)
    if(!selectedTime) {
      return
    }
    setLoader(true);
    const time =
      selectedTime.split(":")[0] < 10 ? "0" + selectedTime : selectedTime;
    const data = {
      data: {
        username: user.fullName,
        appointment_date: moment(selectedDate).format("YYYY-MM-DD"),
        appointment_time: time + ":00.000",
        email: user.primaryEmailAddress.emailAddress,
      },
    };
    GlobalApi.createAppointment(data)
      .then(() => {
        setLoader(false);
        ToastAndroid.show(
          "Appointment Booked Successfully!",
          ToastAndroid.LONG
        );
      })
      .catch((err) => {
        ToastAndroid.show(JSON.stringify(err), ToastAndroid.LONG);
      });
  };

  const generateTimeSlots = () => {
    const slots = [];
    const start = values[0];
    const end = values[1];

    for (let time = start; time <= end; time++) {
      const formattedTime = `${time}:00`;
      slots.push(
        <TouchableOpacity
          key={formattedTime}
          onPress={() =>
            !disabledSlots.includes(formattedTime) ? setSelectedTime(formattedTime) : {}
          }
        >
          <Chip
            mode="outlined"
            style={{...styles.chip, borderColor: selectedTime === formattedTime ? Colors.blue : '#424242', backgroundColor: disabledSlots.includes(formattedTime) ? "#f5f5f5" : '#FFF'}}
            selected={
              selectedTime === formattedTime && !disabledSlots.includes(formattedTime)
            }
          >
            <Text
              style={
                disabledSlots.includes(formattedTime)
                  ? { textDecorationLine: "line-through" }
                  : {color: selectedTime === formattedTime ? Colors.blue : '#424242'}
              }
            >
              {" "}
              {formattedTime}{" "}
            </Text>
          </Chip>
        </TouchableOpacity>
      );
    }

    return slots;
  };

  return (
    <View>
      <CalendarStrip
        
        style={{ height: 120, paddingTop: 20, paddingBottom: 10 }}
        calendarColor={Colors.blue}
        calendarHeaderStyle={{
          color: "white",
          fontFamily: "appfont-Semi",
          fontSize: 14,
          textAlign: "left",
        }}
        dateNumberStyle={{ color: "white", fontFamily: "appfont-Bold" }}
        dateNameStyle={{
          color: "white",
          fontFamily: "appfont-Bold",
          fontSize: 12,
        }}
        highlightDateNameStyle={{
          fontFamily: "appfont-Bold",
          fontSize: 12,
        }}
        highlightDateNumberStyle={{
          fontFamily: "appfont-Bold",
          fontSize: 12,
        }}
        highlightDateContainerStyle={{
          backgroundColor: "#FFF",
        }}
        selectedDate={selectedDate}
        minDate={currentDate}
        onDateSelected={(date) => {
          setSelectedDate(date);
        }}
        startingDate={currentDate}
      />
      <View style={styles.selectSlotView}>
        <Text style={styles.headingStyle}>
          Select Slot for the date {moment(selectedDate).format("DD-MM-YYYY")}
        </Text>
        <Text style={styles.captionStyle}>
          click on the below time card to confirm your appointment time.
        </Text>
      </View>
      {loader &&
      <View style={{display: 'flex', justifyContent: 'center', alignItems: 'center',marginVertical: 15}}>
        <ActivityIndicator animating={true} color={Colors.blue} />
      </View>
      }

      <View style={styles.slotView}>{generateTimeSlots()}</View>

      <View>
        <View style={styles.buttonView}>
          <TouchableOpacity
            style={styles.buttonStyle}
            onPress={() => {
              bookAppointment();
            }}
          >
            <Text style={styles.buttonTextStyle}>
              {!loader ? "Book Appointment" : "Please wait..."}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  selectSlotView: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: "#FFF",
  },
  headingStyle: {
    fontFamily: "appfont-Semi",
    fontSize: 16,
  },
  slotView: {
    paddingHorizontal: 10,
    paddingVertical: 20,
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  chip: {
    marginLeft: 10,
    marginBottom: 10,
    borderRadius: 3,
  },
  captionStyle: {
    fontFamily: "appfont",
    fontSize: 14,
  },
  buttonView: {
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  buttonStyle: {
    backgroundColor: Colors.blue,
    width: "100%",
    padding: 15,
    borderRadius: 4,
  },
  buttonTextStyle: {
    color: "#FFF",
    fontFamily: "appfont-Semi",
    textAlign: "center",
  },
});
