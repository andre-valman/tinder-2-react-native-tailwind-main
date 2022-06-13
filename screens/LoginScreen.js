import { useNavigation } from "@react-navigation/core";
import React, { useLayoutEffect } from "react";
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  Image,
} from "react-native";
import tw from "tailwind-rn";
import useAuth from "../hooks/useAuth";
import purpleGradient from "../assets/istockphoto-980940618-170667a.jpg";
import fullLogo from "../assets/S.png";

const LoginScreen = () => {
  const { user, loading, error, signInWithGoogle, logout } = useAuth();
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <View style={tw("flex-1")}>
      <ImageBackground
        resizeMode="cover"
        style={tw("flex-1")}
        source={purpleGradient}
      >
        <Image source={fullLogo} style={tw("self-center mt-20 top-40")} />
        <TouchableOpacity
          onPress={signInWithGoogle}
          style={[
            tw("bg-white absolute bottom-40 w-52 rounded-2xl p-4"),
            { marginHorizontal: "25%" },
          ]}
        >
          <Text style={[tw("font-semibold text-center"), { color: "#c897f0" }]}>
            Entrar com o Google
          </Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
};

export default LoginScreen;
