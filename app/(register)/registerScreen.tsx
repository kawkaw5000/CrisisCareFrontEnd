import { View, Text, Button, Image, TextInput, TouchableOpacity, Alert, Dimensions } from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import CustomButton from "@/components/buttons/CustomButton";
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import axios, { AxiosError, AxiosResponse } from "axios";
import Config from "@/constants/Config";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Account_API = Config.Account_API;
const registerUrl = `${Account_API}/register`

export default function RegisterScreen() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setCnfirmPassword] = useState("");
  const [error, setError] = useState("");
  const { width } = Dimensions.get("window");
  const [isChecked, setIsChecked] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPassVisible, setIsConfirmPassVisible] = useState(false);

  const handleRegister = async () => {
    try {

      if (password.trim() !== confirmPassword.trim()) {
        Alert.alert("Pass and Confirm pass is not matched");
        setError("Password and Confirm Password is not matched.");
        return;
      }
      if (!username.trim() || !password.trim() || !confirmPassword.trim()) {
        Alert.alert("All fields are required.");
        setError("All fields are required.");
        return;
      }

      const response: AxiosResponse<RegisterResponse> = await axios.post(
        registerUrl,
        { username: username, password: password },
        { headers: { "Content-Type": "application/json" } }
      );  
      const { message, roleName } = response.data;

      Alert.alert(response.data.message!);
      console.log("Login successful", `Role: ${message}`);
      
      if (message == "Registration successful") {
        router.replace("../(home)")
      }
      
    } catch (err) {
      const error = err as AxiosError<RegisterResponse>;
      if (error.response) {
        Alert.alert(error.response.data?.error)
        setError(error.response.data?.error);
      } else {
        console.error("Unexpected error:", (err as Error).message);
        setError("An unexpected error occurred.");
      }
    }
  };

  
  return (
    <SafeAreaView style={{ flex: 1, justifyContent: "flex-start", alignItems: "center", backgroundColor: "#84c4ab",}}>
      <View style={{position: 'relative'}}>
        <Image
          source={require("../../assets/images/CrisisCare.png")}
          style={{
            width: width * 0.81,
            height: width * 0.81,
            resizeMode: "contain",
          }}
        />
        <View style={{position:'absolute', top: 50, right: '27%'}}>
          <Image
            source={require("../../assets/images/Sign Up to.png")}
            style={{
              width: width * 0.25,
              height: width * 0.25,
              resizeMode: "contain",
            }}
          />
        </View>
      </View>
      <View style={{gap:50, width: "90%", position: "relative"}}>
        <View style={{ position: "relative"}}>
          <TextInput
            style={{
              height: 50,
              borderColor: '#975102',
              borderWidth: 1,
              paddingHorizontal: 10,
              borderRadius: 15,
              width: "100%",
              backgroundColor: 'white'
            }}
            placeholder=""
            value={username}
            onChangeText={setUsername}
          />
          <View style={{position: "absolute", top:-35}}>
            <Text style={{fontSize: 20, fontWeight: "bold"}}>Username</Text>
          </View>
        </View> 
        <View style={{ position: 'relative' }}>
            <TextInput
              style={{
                  height: 50,
                  borderColor: '#975102',
                  borderWidth: 1,
                  paddingHorizontal: 10,
                  borderRadius: 15,
                  width: "100%",
                  backgroundColor: 'white'
              }}
              placeholder=""
              value={password}
              secureTextEntry={!isPasswordVisible} 
              onChangeText={setPassword}
            />
            <View style={{ position: 'absolute', top: -35 }}>
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Password</Text>
            </View>
            <TouchableOpacity
              onPress={() => setIsPasswordVisible(!isPasswordVisible)}
              style={{
                position: 'absolute',
                right: 10,
                top: 12,
              }}>
              <Ionicons
                name={isPasswordVisible ? 'eye-off' : 'eye'}
                size={24}
                color="gray"
              />
            </TouchableOpacity>
        </View>    
        <View style={{ position: 'relative', gap:15 }}>
            <TextInput
              style={{
                  height: 50,
                  borderColor: '#975102',
                  borderWidth: 1,
                  paddingHorizontal: 10,
                  borderRadius: 15,
                  width: "100%",
                  backgroundColor: 'white'
              }}
              placeholder=""
              value={confirmPassword}
              secureTextEntry={!isConfirmPassVisible} 
              onChangeText={setCnfirmPassword}
            />
            <View style={{ position: 'absolute', top: -35 }}>
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Confirm Password</Text>
            </View>
            <TouchableOpacity
              onPress={() => setIsConfirmPassVisible(!isConfirmPassVisible)}
              style={{
                position: 'absolute',
                right: 10,
                top: 12,
              }}>
              <Ionicons
                name={isConfirmPassVisible ? 'eye-off' : 'eye'}
                size={24}
                color="gray"
              />
            </TouchableOpacity>
            
            <View style={{alignItems: 'center'}}>
              <CustomButton
                title="Sign Up"
                onPress={() => handleRegister()}
                backgroundColor="white"
                textColor="black"  
              />       
            </View> 
            <View style={{alignItems: 'center', marginTop: 20}}>
              <TouchableOpacity
              style={{
                backgroundColor: "white",
                width: 40,
                height: 40,
                borderRadius: 100,
                alignItems: "center",
                justifyContent: "center",
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.2,
                shadowRadius: 3,
              }}
              onPress={() => router.replace("/(login)/loginScreen")}
            >
              <MaterialIcons name="arrow-back" size={30} color="black" />
            </TouchableOpacity>
            </View>
        </View>  
           
      </View>
    </SafeAreaView>
  );
}
