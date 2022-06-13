import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from "react-native";
import React, { useState, useEffect } from "react";
import tw from "tailwind-rn";
import useAuth from "../hooks/useAuth";
import { SwitchSelector } from "react-native-switch-selector";
import { useNavigation } from "@react-navigation/core";
import { deleteDoc, doc, getDoc, setDoc } from "firebase/firestore";
import firebase, { db } from "../firebase";

const ProfileScreen = () => {
  // get the user data from firestore using the useAuth hook
  const { user, logout } = useAuth();
  const [userDoc, setUserDoc] = useState(null);

  const Read = () => {
    // MARK: Reading Doc
    // You can read what ever document by changing the collection and document path here
    const myDoc = doc(db, "users", user.uid);

    getDoc(myDoc)
      // Handling Promises
      .then((snapshot) => {
        // MARK: Success
        if (snapshot.exists) {
          setUserDoc(snapshot.data());
        } else {
          alert("No Doc Found");
        }
      })
      .catch((error) => {
        // MARK: Failure
        alert(error.message);
      });
  };

  useEffect(async () => {
    Read();
  }, []);

  return (
    <ScrollView
      contentContainerStyle={tw(
        "flex-1 text-center items-center pt-1 grow w-full h-full bg-white"
      )}
    >
      <Text style={tw("text-center p-2 font-bold text-purple-400")}>
        Seu Gênero
      </Text>
      <Text style={tw("text-center font-bold text-purple-300")}>
        {userDoc?.gender}
      </Text>

      <Text style={tw("text-center p-2 font-bold text-purple-400")}>
        Seu Trabalho
      </Text>
      <Text style={tw("text-center font-bold text-purple-300")}>
        {userDoc?.job}
      </Text>

      <Text style={tw("text-center p-2 font-bold text-purple-400")}>
        Sua Idade
      </Text>

      <Text style={tw("text-center font-bold text-purple-300")}>
        {userDoc?.age}
      </Text>

      <Text style={tw("text-center p-2 font-bold text-purple-400")}>
        Sua Cidade
      </Text>

      <Text style={tw("text-center font-bold text-purple-300")}>
        {userDoc?.city}
      </Text>

      <Text style={tw("text-center p-2 font-bold text-purple-400")}>
        De que santo é devot@
      </Text>

      <Text style={tw("text-center font-bold text-purple-300")}>
        {userDoc?.saint}
      </Text>
      <Text style={tw("text-center p-2 font-bold text-purple-400")}>
        É crismad@?
      </Text>

      <Text style={tw("text-center font-bold text-purple-300")}>
        {userDoc?.confirmed}
      </Text>

      <Text style={tw("text-center p-2 font-bold text-purple-400")}>
        Frequenta à Igreja todos os domingos?
      </Text>

      <Text style={tw("text-center font-bold text-purple-300")}>
        {userDoc?.church}
      </Text>

      <TouchableOpacity
        onPress={logout}
        style={tw("w-64 p-3 rounded-xl relative mb-5 bg-purple-400 top-20")}
      >
        <Text style={tw("text-center text-white text-xl")}>Sair da Conta</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default ProfileScreen;
