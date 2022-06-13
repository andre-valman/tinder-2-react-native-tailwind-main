import React from "react";
import { View, Text, Image } from "react-native";
import tw from "tailwind-rn";

const RecieverMessage = ({ message }) => {
  return (
    <View
      style={[
        tw("bg-red-400 rounded-lg rounded-tl-none px-5 py-3 my-2 "),
        { alignSelf: "flex-start" },
      ]}
    >
      <Text style={tw("text-white")}>{message.message}</Text>
    </View>
  );
};

export default RecieverMessage;
