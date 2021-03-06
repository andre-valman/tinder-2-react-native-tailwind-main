import {
  addDoc,
  collection,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "@firebase/firestore";
import { useNavigation, useRoute } from "@react-navigation/core";
import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  View,
  SafeAreaView,
  Text,
  TouchableOpacity,
  KeyboardAvoidingViewComponent,
  Platform,
  KeyboardAvoidingView,
  TextInput,
  Button,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
  StyleSheet,
} from "react-native";
import tw from "tailwind-rn";
import Header from "../components/Header";
import RecieverMessage from "../components/RecieverMessage";
import SenderMessage from "../components/SenderMessage";
import { db } from "../firebase";
import useAuth from "../hooks/useAuth";
import getMatchedUserInfo from "../lib/getMatchedUserInfo";
import pf from "../assets/pf.png";

const MatchProfileScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { user } = useAuth();

  const { matchDetails } = route.params;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, "matches", matchDetails.id, "messages"),
          orderBy("timestamp", "desc")
        )
      ),
    [matchDetails, db]
  );

  return (
    <SafeAreaView style={tw("flex-1 pt-5 bg-purple-100")}>
      <View style={tw("flex-row content-center left-1")}>
        <Image
          style={[tw(`w-28 h-40 m-2 rounded-full `), styles.cardShadow]}
          source={{
            uri: getMatchedUserInfo(matchDetails.users, user.uid)?.image,
          }}
        />
        <Image
          style={[tw(`w-28 h-40 m-2 rounded-full`), styles.cardShadow]}
          source={{
            uri: getMatchedUserInfo(matchDetails.users, user.uid)?.image2,
          }}
        />
        <Image
          style={[tw(`w-28 h-40 m-2 rounded-full`), styles.cardShadow]}
          source={{
            uri: getMatchedUserInfo(matchDetails.users, user.uid)?.image3,
          }}
        />
      </View>
      <View style={tw("items-center relative")}>
        <Text style={tw("text-2xl font-bold")}>
          {getMatchedUserInfo(matchDetails.users, user.uid).displayName}
        </Text>
      </View>
      <ScrollView
        contentContainerStyle={tw(
          "flex-1 text-center items-center pt-1 grow w-full h-full bg-purple-100"
        )}
      >
        <Text style={tw("text-center p-2 font-bold text-purple-400")}>
          G??nero
        </Text>
        <Text style={tw("text-center font-bold text-purple-300")}>
          {getMatchedUserInfo(matchDetails.users, user.uid)?.gender}
        </Text>

        <Text style={tw("text-center p-2 font-bold text-purple-400")}>
          Trabalho
        </Text>
        <Text style={tw("text-center font-bold text-purple-300")}>
          {getMatchedUserInfo(matchDetails.users, user.uid)?.job}
        </Text>

        <Text style={tw("text-center p-2 font-bold text-purple-400")}>
          Idade
        </Text>

        <Text style={tw("text-center font-bold text-purple-300")}>
          {getMatchedUserInfo(matchDetails.users, user.uid)?.age}
        </Text>

        <Text style={tw("text-center p-2 font-bold text-purple-400")}>
          Cidade
        </Text>

        <Text style={tw("text-center font-bold text-purple-300")}>
          {getMatchedUserInfo(matchDetails.users, user.uid)?.city}
        </Text>

        <Text style={tw("text-center p-2 font-bold text-purple-400")}>
          De que santo ?? devot@
        </Text>

        <Text style={tw("text-center font-bold text-purple-300")}>
          {getMatchedUserInfo(matchDetails.users, user.uid)?.saint}
        </Text>
        <Text style={tw("text-center p-2 font-bold text-purple-400")}>
          ?? crismad@?
        </Text>

        <Text style={tw("text-center font-bold text-purple-300")}>
          {getMatchedUserInfo(matchDetails.users, user.uid)?.confirmed}
        </Text>

        <Text style={tw("text-center p-2 font-bold text-purple-400")}>
          Frequenta ?? Igreja todos os domingos?
        </Text>

        <Text style={tw("text-center font-bold text-purple-300")}>
          {getMatchedUserInfo(matchDetails.users, user.uid)?.church}
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  cardShadow: {
    shadowColor: "#808080",
    shadowOffset: {
      width: 0,
      height: -10,
    },
    shadowOpacity: 0.45,
    shadowRadius: 10,

    elevation: 5,
  },
});

export default MatchProfileScreen;
