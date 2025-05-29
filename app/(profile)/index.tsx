import { View, Text, StyleSheet, SafeAreaView, Image, TouchableOpacity, TextInput, Dimensions } from "react-native";
import CustomButton from "@/components/buttons/CustomButton";
import { useRouter } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth } from "@/context/AuthContext";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useAuthGuard } from "@/hooks/useAuthGuard";
import axios from "axios";

export default function ProfileScreen() {
  const router = useRouter();
  useAuthGuard();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setCnfirmPassword] = useState("");
  const [error, setError] = useState("");
  const { width } = Dimensions.get("window");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPassVisible, setIsConfirmPassVisible] = useState(false);

  const getUserInfo = async () => {
    try {
      const response = await axios.get("http://192.168.254.117:7037/api/account/userinfo", {
        withCredentials: true,
      });

      console.log("User info:", response.data);

      const { username, password } = response.data.data;

      setUsername(username || "");
      setPassword(password || "");
      setCnfirmPassword(password || "");
    } catch (err) {
      console.error("Failed to get user info", err);
    }
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  const handleUpdate = async () => {
    try {
      if (!username || !password || password !== confirmPassword) {
        alert("Please check your inputs.");
        return;
      }

      const updateData = {
        username: username,
        password: password
      };

      const response = await axios.put(
        "http://192.168.254.117:7037/api/account/updateInfo",
        updateData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json"
          }
        }
      );

      console.log("Update successful:", response.data);
      alert("Profile updated successfully");
    } catch (error: unknown) {
      console.error("Failed to update profile", error);

      if (axios.isAxiosError(error)) {
        setError(error.response?.data?.error || "Failed to update");
      } else {
        setError("Unexpected error occurred");
      }
    }
  };


  return (
    <SafeAreaView style={{ flex: 1, justifyContent: "flex-start", alignItems: "center", backgroundColor: "#84c4ab",}}>
      <View style={{position: 'relative', marginBottom: 50, marginTop: 50, alignItems: 'center'}}>
        <Text style={{fontSize: 20, fontWeight: "bold"}}>Profile Information</Text>
        <Image
          source={require("../../assets/images/Profile.png")}
          style={{
            width: width * 0.3,
            height: width * 0.3,
            resizeMode: "contain",
          }}
        />   
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
            
            <View style={{alignItems: 'center', marginTop: 100}}>
              <CustomButton
                title="Edit"
                onPress={() => handleUpdate()}
                backgroundColor="white"
                textColor="black"  
              />       
            </View> 
        </View>            
      </View>
      <View style={{alignItems: 'center', marginTop: 20, position: 'absolute', top: 0, left: 10}}>
        <TouchableOpacity       
        onPress={() => router.replace("/(home)")}
        >
        <MaterialIcons name="arrow-back-ios" size={50} color="white" />
      </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#84c4ab",
    justifyContent: 'center'
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 120,
    height: 120,
    resizeMode: "contain",
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  spacer: {
    flex: 1,
  },
  bottomBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "#eee",
    backgroundColor: "#fff",
  },
  iconButton: {
    alignItems: "center",
    flex: 1,
  },
  icon: {
    width: 32,
    height: 32,
    resizeMode: "contain",
    marginBottom: 2,
  },
  iconLabel: {
    fontSize: 12,
    color: "#333",
  },
  iconLabelActive: {
    color: "#FCB647",
    fontWeight: "bold",
  },
});
