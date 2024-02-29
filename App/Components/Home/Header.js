import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { useUser } from "@clerk/clerk-expo";
import { StyleSheet } from "react-native";
import Colors from "../../../assets/Shared/Colors";
import {useAuth } from "@clerk/clerk-expo";

export default function Header() {
  const {isLoaded: loding,  signOut } = useAuth();
  const { isLoaded, isSignedIn, user } = useUser();
  if (!isLoaded || !isSignedIn) {
    return null;
  }
  const signOutUser = () => {
    signOut()
  }

  return (
    <View style={styles.header}>
      <View style={styles.flexRow}>
        <Image source={{ uri: user.imageUrl }} style={styles.image} />
        <View>
          <Text style={{ fontFamily: "appfont" }}>Hello,👋</Text>
          <Text style={{ fontSize: 18, fontFamily: "appfont-Bold" }}>
            {user.fullName}
          </Text>
        </View>
      </View>
      <TouchableOpacity style={styles.logoutButton} onPress={() => signOutUser()}>
        <Text style={styles.logoutText}>{loding ? "Logout" : "Logging Out"}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#FFF",
    paddingHorizontal: 20,
    paddingVertical: 15,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  image: { width: 45, height: 45, borderRadius: 99, marginRight: 10 },
  flexRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  logoutButton: {
    backgroundColor: Colors.blue,
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 5
  },
  logoutText: {
    fontFamily: 'appfont-Semi',
    color: '#FFF'
  }
});
