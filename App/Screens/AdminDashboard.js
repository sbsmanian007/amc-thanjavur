import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Slider,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";
import React, { useEffect, useState } from "react";
import CalendarStrip from "react-native-calendar-strip";
import Colors from "../../assets/Shared/Colors";
import { Chip } from "react-native-paper";
import MultiSlider from "@ptomasroos/react-native-multi-slider";
import moment from "moment";
import GlobalApi from "../Services/GlobalApi";
import { ActivityIndicator } from "react-native-paper";

const currentDate = new Date();
export default function AdminDashboard() {
  const [values, setValues] = useState([6, 22]);
  const [timeSlots, setTimeSlots] = useState([]);
  const [selectedDate, setSelectedDate] = useState(currentDate);
  const [loader, setLoader] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const handleChipPress = (time) => {
    if (timeSlots.includes(time)) {
      newSlots = timeSlots.filter((e) => e !== time);
      setTimeSlots(newSlots);
    } else {
      setTimeSlots((value) => [...value, ...[time]]);
    }
    console.log("Booking time:", time);
  };
  const generateTimeSlots = () => {
    const slots = [];
    const start = values[0];
    const end = values[1];
    // Generate chips representing 1-hour time slots
    for (let time = start; time <= end; time++) {
      const formattedTime = `${time}:00`;
      slots.push(
        <TouchableOpacity
          key={formattedTime}
          onPress={() => handleChipPress(formattedTime)}
        >
          <Chip
            mode="outlined"
            style={styles.chip}
            selected={Boolean(timeSlots.includes(formattedTime))}
          >
            {formattedTime}
          </Chip>
        </TouchableOpacity>
      );
    }

    return slots;
  };

  const disableSlotAndUpdate = () => {
    setLoader(true);
    const req = {
      data: {
        date: moment(selectedDate).format("YYYY-MM-DD"),
        start_time: `${values[0]}:00`,
        end_time: `${values[1]}:00`,
        disabled_slots: {
          slots: timeSlots,
        },
      },
    };
    GlobalApi.postSlotTimingAndDisabledSlot(req)
      .then(() => {
        setLoader(false);
        getAvailableSlots(selectedDate);
        ToastAndroid.show(
          `Updated successfully for the date ${moment(selectedDate).format(
            "YYYY-MM-DD"
          )}`,
          ToastAndroid.LONG
        );
      })
      .catch((err) => {
        console.log(err);
        setLoader(false);
      });
  };

  const update = () => {
    const req = {
      data: {
        date: moment(selectedDate).format("YYYY-MM-DD"),
        start_time: `${values[0]}:00`,
        end_time: `${values[1]}:00`,
        disabled_slots: {
          slots: timeSlots,
        },
      },
    };
    setLoader(true);
    GlobalApi.updateSlotAndDisabledSlot(req, selectedId)
      .then(() => {
        setLoader(false);
        ToastAndroid.show(
          `Updated successfully for the date ${moment(selectedDate).format(
            "YYYY-MM-DD"
          )}`,
          ToastAndroid.LONG
        );
        getAvailableSlots(selectedDate);
      })
      .catch((err) => {
        console.log(err);
        setLoader(false);
      });
  };

  const getAvailableSlots = () => {
    setLoader(true);
    GlobalApi.getAvailableDateSlots(moment(selectedDate).format("YYYY-MM-DD"))
      .then((response) => {
        const res = response.data.data;
        if (res.length) {
          setLoader(false);
          const start_time =
            res[res.length - 1].attributes.start_time.split(":")[0];
          const end_time =
            res[res.length - 1].attributes.end_time.split(":")[0];
          setValues([parseInt(start_time), parseInt(end_time)]);
          setTimeSlots(res[res.length - 1].attributes.disabled_slots.slots);
          setSelectedId(res[0].id);
        } else {
          setValues([6, 22]);
          setSelectedId(null);
        }
      })
      .catch((err) => {
        setLoader(false);
        console.log(err);
      });
  };

  useEffect(() => {
    setTimeSlots([]);
    getAvailableSlots(selectedDate);
  }, [selectedDate]);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.calenderView}>
        <CalendarStrip
          scrollable
          startingDate={currentDate}
          style={{ height: 120, paddingTop: 20, paddingBottom: 10 }}
          calendarColor={Colors.PRIMARY}
          calendarHeaderStyle={{
            color: "white",
            fontFamily: "appfont-Semi",
            fontSize: 14,
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
          onDateSelected={(date) => setSelectedDate(date)}
          minDate={currentDate}
        />
      </View>
      <View style={styles.sliderContainer}>
        <View
          style={{
            backgroundColor: "#FFF",
            paddingHorizontal: 20,
            paddingVertical: 10,
          }}
        >
          <Text style={styles.timeRange}>
            Time Range for date {moment(selectedDate).format("YYYY-MM-DD")}
          </Text>
          <View>
            <Text
              style={{
                ...styles.timeRange,
                marginTop: 10,
                fontFamily: "appfont",
                fontSize: 18,
              }}
            >
              Start Time {`${values[0]}:00`} to End Time {`${values[1]}:00`}
            </Text>
          </View>
        </View>

        <View
          style={{
            paddingHorizontal: 20,
            paddingVertical: 10,
            backgroundColor: "#FFF",
            marginHorizontal: 10,
            marginVertical: 20,
          }}
        >
          <Text
            style={{
              ...styles.timeRange,
              marginTop: 5,
              fontFamily: "appfont",
              fontSize: 14,
            }}
          >
            Drag me to update start and end time for the selected date
          </Text>

          <MultiSlider
            isMarkersSeparated={true}
            values={[values[0], values[1]]}
            sliderLength={300}
            onValuesChange={(values) => setValues(values)}
            min={6}
            max={22}
            step={1}
            allowOverlap={false}
            snapped={true}
            selectedStyle={{ backgroundColor: Colors.PRIMARY }}
            markerStyle={{ backgroundColor: Colors.PRIMARY }}
            touchDimensions={{
              height: 150,
              width: 150,
              borderRadius: 15,
              slipDisplacement: 200,
            }}
          />
        </View>
      </View>
      <View>
        <Text
          style={{
            ...styles.timeRange,
            marginTop: 5,
            fontFamily: "appfont",
            fontSize: 14,
            marginLeft: 10,
            marginBottom: 10,
          }}
        >
          Click on the time slot card and those will disabled for the users{" "}
        </Text>
      </View>
      {loader && (
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
      <View style={styles.timeSlotsContainer}>{generateTimeSlots()}</View>
      <Text
        style={{
          color: "#424242",
          fontSize: 16,
          fontFamily: "appfont-Semi",
          textAlign: "center",
          marginTop: 10,
        }}
      >
        Update Slot Range & Disable Slots for Date{" "}
        {moment(selectedDate).format("YYYY-MM-DD")}
      </Text>

      <View
        style={{
          display: "flex",
          margin: 10,
        }}
      >
        <TouchableOpacity
          onPress={() => (selectedId ? update() : disableSlotAndUpdate())}
          style={{
            backgroundColor: Colors.PRIMARY,
            padding: 10,
            borderRadius: 5,
          }}
        >
          <Text
            style={{
              color: "#FFF",
              fontSize: 16,
              fontFamily: "appfont-Semi",
              textAlign: "center",
            }}
          >
            {loader ? "Updating" : "Click Here To Update"}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{ height: 200 }}></View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  calenderView: {
    flex: 1,
  },
  sliderContainer: {
    flex: 1,
  },
  timeRange: {
    fontSize: 16,
    fontFamily: "appfont-Semi",
  },
  chip: {
    marginLeft: 10,
    marginBottom: 10,
    borderRadius: 3,
  },
  timeSlotsContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  markerContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  markerText: {
    color: "black",
    fontSize: 12,
    height: 200,
  },
});
