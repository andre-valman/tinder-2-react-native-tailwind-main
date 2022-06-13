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
  FlatList,
} from "react-native";
import tw from "tailwind-rn";
import Header from "../components/Header";
import RecieverMessage from "../components/RecieverMessage";
import SenderMessage from "../components/SenderMessage";
import { db } from "../firebase";
import useAuth from "../hooks/useAuth";
import getMatchedUserInfo from "../lib/getMatchedUserInfo";
import pf from "../assets/pf.png";

const MessageScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
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
        ),
        (snapshot) =>
          setMessages(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }))
          )
      ),
    [matchDetails, db]
  );

  const sendMessage = () => {
    addDoc(collection(db, "matches", matchDetails.id, "messages"), {
      timestamp: serverTimestamp(),
      userId: user.uid,
      displayName: user.displayName,
      image: matchDetails.users[user.uid].image && {
        uri: matchDetails.users[user.uid].image,
      },
      message: input,
    });

    setInput("");
  };

  return (
    <SafeAreaView style={tw("flex-1 mt-3")}>
      <Header
        title={getMatchedUserInfo(matchDetails.users, user.uid).displayName}
      />
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("MatchProfile", {
            matchDetails,
          })
        }
        style={tw(" bg-white h-16 w-16 rounded-full mt-3 absolute right-8")}
      >
        {matchDetails.users ? (
          <Image
            source={{
              uri: getMatchedUserInfo(matchDetails.users, user.uid)?.image,
            }}
            style={tw("rounded-full h-16 w-16 mr-4")}
          />
        ) : (
          <Image
            source={pf}
            style={tw("absolute rounded-full h-16 w-16 mr-4")}
          />
        )}
      </TouchableOpacity>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={tw("flex-1")}
        keyboardVerticalOffset={10}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <FlatList
            data={messages}
            style={tw("pl-4")}
            inverted={-1}
            keyExtractor={(item) => item.id}
            renderItem={({ item: message }) =>
              message.userId === user.uid ? (
                <SenderMessage key={message.id} message={message} />
              ) : (
                <RecieverMessage key={message.id} message={message} />
              )
            }
          />

          {/* <RecieverMessage message="Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum " />
            <SenderMessage />
            <SenderMessage />
            <RecieverMessage message="This is a test" />
            <SenderMessage />
            <RecieverMessage message="James Bond... the names BOND" />
            <RecieverMessage message="Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum " />
            <SenderMessage />
            <SenderMessage />
            <RecieverMessage message="Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum " /> */}
        </TouchableWithoutFeedback>

        <View
          style={tw(
            "flex-row justify-between items-center border-t border-gray-200 px-5 py-2"
          )}
        >
          <TextInput
            style={tw("h-10 text-lg")}
            placeholder="Enviar mensagem..."
            onChangeText={setInput}
            onSubmitEditing={sendMessage}
            value={input}
          />

          <Button onPress={sendMessage} title="Enviar" color="#FF5864" />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default MessageScreen;
