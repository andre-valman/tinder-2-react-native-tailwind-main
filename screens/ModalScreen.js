import { doc, serverTimestamp, setDoc } from "@firebase/firestore";
import { useNavigation } from "@react-navigation/core";
import React, { useLayoutEffect, useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  Button,
} from "react-native";
import tw from "tailwind-rn";
import { db } from "../firebase";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import useAuth from "../hooks/useAuth";
import simpleLogo from "./../assets/D.png";
import * as ImagePicker from "expo-image-picker";
import SwitchSelector from "react-native-switch-selector";

const ModalScreen = () => {
  const navigation = useNavigation();
  const { user } = useAuth();
  const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
  const [image, setImage] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
  const [gender, setGender] = useState(null);
  const [job, setJob] = useState(null);
  const [age, setAge] = useState(null);
  const [city, setCity] = useState(null);
  const [saint, setSaint] = useState(null);
  const [confirmed, setConfirmed] = useState(null);
  const [church, setChurch] = useState(null);
  const [url, setUrl] = useState(null);
  const [url2, setUrl2] = useState(null);
  const [url3, setUrl3] = useState(null);

  useEffect(() => {
    (async () => {
      const galleryStatus =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasGalleryPermission(galleryStatus.status === "granted");
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setUrl(result.uri);
      const storage = getStorage();
      // get extension of image
      const ext = result.uri.split(".").pop();
      // get a reference to the storage bucket
      const bucket = ref(storage, "images");
      // create a storage reference with image name
      const imageRef = ref(bucket, `${user.uid}.${ext}`);
      //const refe = ref(storage, "images.jpg");
      const img = await fetch(result.uri);
      const bytes = await img.blob();
      await uploadBytes(imageRef, bytes);
      // save the path to the storage in setImage
      setImage(await getDownloadURL(imageRef));
    }
  };

  const pickImage2 = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setUrl2(result.uri);
      const storage = getStorage();
      // get extension of image
      const ext = result.uri.split(".").pop();
      // get a reference to the storage bucket
      const bucket = ref(storage, "images");
      // create a storage reference with image name
      const imageRef = ref(bucket, `${user.uid}2.${ext}`);
      const img = await fetch(result.uri);
      const bytes = await img.blob();
      await uploadBytes(imageRef, bytes);
      setImage2(await getDownloadURL(imageRef));
    }
  };

  const pickImage3 = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setUrl3(result.uri);
      const storage = getStorage();
      // get extension of image
      const ext = result.uri.split(".").pop();
      // get a reference to the storage bucket
      const bucket = ref(storage, "images");
      // create a storage reference with image name
      const imageRef = ref(bucket, `${user.uid}3.${ext}`);
      //const refe = ref(storage, "images.jpg");
      const img = await fetch(result.uri);
      const bytes = await img.blob();
      await uploadBytes(imageRef, bytes);
      setImage3(await getDownloadURL(imageRef));
    }
  };

  if (hasGalleryPermission === false) {
    return <Text>Permissão negada</Text>;
  }

  const incompleteForm =
    !job ||
    !age ||
    !city ||
    !image ||
    !confirmed ||
    !church ||
    !saint ||
    !gender;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Atualize seu perfil",
      headerStyle: {
        backgroundColor: "#B453F4",
      },
      headerTitleStyle: { color: "white" },
    });
  }, []);

  //access image from firebase storage
  useEffect(() => {
    (async () => {
      const storage = getStorage();
      // get a reference to the storage bucket
      const bucket = ref(storage, "images");
      // create a storage reference with image name
      const imageRef = ref(bucket, `${user.uid}.jpg` || `${user.uid}.heic`);
      await getDownloadURL(imageRef).then((x) => {
        setUrl(x);
      });
    })();
  }, []);

  useEffect(() => {
    (async () => {
      //get image extension from firebase storage
      const storage = getStorage();
      // get a reference to the storage bucket
      const bucket = ref(storage, "images");
      // create a storage reference with image name
      const imageRef = ref(bucket, `${user.uid}2.jpg` || `${user.uid}2.heic`);
      await getDownloadURL(imageRef).then((x) => {
        setUrl2(x);
      });
    })();
  }, []);

  useEffect(() => {
    (async () => {
      //get image extension from firebase storage
      const storage = getStorage();
      // get a reference to the storage bucket
      const bucket = ref(storage, "images");
      // create a storage reference with image name
      const imageRef = ref(bucket, `${user.uid}3.jpg` || `${user.uid}3.heic`);
      await getDownloadURL(imageRef).then((x) => {
        setUrl3(x);
      });
    })();
  }, []);

  const updateUserProfile = () => {
    setDoc(doc(db, "users", user.uid), {
      id: user.uid,
      displayName: user.displayName,
      job: job,
      age: age,
      city: city,
      saint: saint,
      confirmed: confirmed,
      gender: gender,
      image: image,
      image2: image2,
      image3: image3,
      church: church,
      timestamp: serverTimestamp(),
    })
      .then(() => {
        navigation.navigate("Home");
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <View style={tw("flex-1 text-center items-center pt-1")}>
      <View style={tw("flex-row justify-start")}>
        <TouchableOpacity
          onPress={() => {
            pickImage();
          }}
          style={tw(" items-center mt-2 rounded-lg")}
        >
          {url ? (
            <Image
              style={tw("h-32 w-32")}
              resizeMode="contain"
              source={{ uri: url }}
            />
          ) : (
            <Image
              style={tw("h-32 w-32")}
              resizeMode="contain"
              source={simpleLogo}
            />
          )}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            pickImage2();
          }}
          style={tw(" items-center mt-2  rounded-lg")}
        >
          {url2 ? (
            <Image
              style={tw("h-32 w-32")}
              resizeMode="contain"
              source={{ uri: url2 }}
            />
          ) : (
            <Image
              style={tw("h-32 w-32")}
              resizeMode="contain"
              source={simpleLogo}
            />
          )}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            pickImage3();
          }}
          style={tw(" items-center mt-2 rounded-lg")}
        >
          {url3 ? (
            <Image
              style={tw("h-32 w-32")}
              resizeMode="contain"
              source={{ uri: url3 }}
            />
          ) : (
            <Image
              style={tw("h-32 w-32")}
              resizeMode="contain"
              source={simpleLogo}
            />
          )}
        </TouchableOpacity>
      </View>

      <Text style={tw("text-center text-xl text-gray-500 p-2 font-bold")}>
        Olá {user.displayName}!
      </Text>

      <ScrollView style={tw("p-2 mb-5 mt-2")}>
        <Text style={tw("text-center p-4 font-bold text-purple-400")}>
          Seu Gênero
        </Text>
        <SwitchSelector
          buttonColor={"#B453F4"}
          style={tw("p-1")}
          options={[
            { label: "Feminino", value: "Feminino" },
            { label: "Masculino", value: "Masculino" },
          ]}
          initial={0}
          onPress={(value) => setGender(value)}
        />
        <Text style={tw("text-center p-4 font-bold text-purple-400")}>
          Seu Trabalho
        </Text>
        <TextInput
          value={job}
          onChangeText={setJob}
          style={tw("text-center text-xl pb-2")}
          placeholder="Digite seu Trabalho"
        />
        <Text style={tw("text-center p-4 font-bold text-purple-400")}>
          Sua Idade
        </Text>
        <TextInput
          value={age}
          onChangeText={setAge}
          style={tw("text-center text-xl pb-2")}
          keyboardType="numeric"
          placeholder="Digite sua Idade"
          maxLength={2}
        />
        <Text style={tw("text-center p-4 font-bold text-purple-400")}>
          Sua Cidade
        </Text>
        <TextInput
          value={city}
          onChangeText={setCity}
          style={tw("text-center text-xl pb-2")}
          placeholder="Digite sua Cidade"
        />
        <Text style={tw("text-center p-4 font-bold text-purple-400")}>
          De que santo é devot@
        </Text>
        <TextInput
          value={saint}
          onChangeText={setSaint}
          style={tw("text-center text-xl pb-2")}
          placeholder="Digite seu Santo"
        />
        <Text style={tw("text-center p-4 font-bold text-purple-400")}>
          É crismad@?
        </Text>
        <TextInput
          value={confirmed}
          onChangeText={setConfirmed}
          style={tw("text-center text-xl pb-2")}
          placeholder="Digite se é crismad@"
        />
        <Text style={tw("text-center p-4 font-bold text-purple-400")}>
          Frequenta à Igreja todos os domingos?
        </Text>
        <TextInput
          value={church}
          onChangeText={setChurch}
          style={tw("text-center text-xl pb-2")}
          placeholder="Digite se frequenta à Igreja"
        />
      </ScrollView>
      <TouchableOpacity
        disabled={incompleteForm}
        style={[
          tw("w-64 p-3 rounded-xl relative mb-5"),
          incompleteForm ? tw("bg-gray-400") : tw("bg-purple-400"),
        ]}
        onPress={updateUserProfile}
      >
        <Text style={tw("text-center text-white text-xl")}>
          Atualizar Perfil
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ModalScreen;
