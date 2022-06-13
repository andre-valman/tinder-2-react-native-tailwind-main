import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";
import tw from "tailwind-rn";
import { Foundation } from "@expo/vector-icons";

const Header = ({ title, callEnabled }) => {
  const navigation = useNavigation();

  return (
    <View style={tw("p-2 flex-row items-center justify-between")}>
      <View style={tw("flex flex-row items-center")}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={tw("p-2 top-2")}
        >
          <Ionicons name="chevron-back-outline" size={34} color="#c897f0" />
        </TouchableOpacity>
        <Text style={tw("text-2xl font-bold pl-2 top-2")}>{title}</Text>
      </View>
    </View>
  );
};

export default Header;
