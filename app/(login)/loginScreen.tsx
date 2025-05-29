import { View, Text, Button, Image, TextInput, TouchableOpacity, Alert, Dimensions } from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import CustomButton from "@/components/buttons/CustomButton";
import { Ionicons } from '@expo/vector-icons';
import axios, { AxiosError, AxiosResponse } from "axios";
import Config from "@/constants/Config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth } from "@/context/AuthContext";

const Account_API = Config.Account_API;
const loginUrl = `${Account_API}/login`

export default function LoginScreen() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { roleName, setRoleName, userId, setUserId } = useAuth();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const { width } = Dimensions.get("window");

  const handleLogin = async () => {
    try {
      if (!username.trim() || !password.trim()) {
        Alert.alert("Email and password are required.");
        setError("Email and password are required.");
        return;
      }

      const response: AxiosResponse<LoginResponse> = await axios.post(
        loginUrl,
        { username: username, password: password },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      ); 
      const { message, roleName, userId } = response.data;

      Alert.alert(response.data.message!);
      console.log("Login successful", `Role: ${userId}`);
      if (roleName) {
        await setRoleName(roleName);
      }
      if (userId) {
        await setUserId(String(userId));
      }
      if (roleName == "User") {
        router.replace("../(home)")
      }
      
    } catch (err) {
      const error = err as AxiosError<LoginResponse>;
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
          source={require("../../assets/images/Login to.png")}
          style={{
            width: width * 0.25,
            height: width * 0.25,
            resizeMode: "contain",
          }}
        />
      </View>
    </View>
    <View style={{gap:50, width: "90%", position: "relative"}}>
        <View style={{gap:20, width: "100%", position: "relative"}}>
          <TextInput
            style={{
              height: 50,
              borderColor: "#975102",
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
        <View style={{ gap: 20, width: "100%", position: 'relative' }}>
            {/* Password Input */}
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
            <Text style={{fontSize: 15, fontWeight: "bold", textAlign: "center", textDecorationLine:"none", color:"black"}}>Forgot Password or Username?</Text>  
        </View>    
      </View>
      <View style={{ gap: 20, position: "relative", width: "90%", top: 30, flex: 1, alignItems: 'center'}}>
        <CustomButton
          title="Login"
          onPress={() => handleLogin()}
          backgroundColor="white"
          textColor="black"  
        />
        <CustomButton
          title="Sign Up"
          onPress={() => router.replace("../(register)/registerScreen")}
          backgroundColor="white"
          textColor="black"  
        />
        
        <View style={{ borderBottomWidth: 1, borderBottomColor: "black", width: "auto" }} />
        <View>
        
        </View> 
      </View>
    </SafeAreaView>
  );
}
