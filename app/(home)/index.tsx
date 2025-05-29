import { View, Text, StyleSheet, SafeAreaView, Image, TouchableOpacity, TextInput, Dimensions, Button, Animated, TouchableWithoutFeedback } from "react-native";
import CustomButton from "@/components/buttons/CustomButton";
import { useRouter } from "expo-router";
import { useCallback, useEffect, useRef, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth } from "@/context/AuthContext";
import { useAuthGuard } from "@/hooks/useAuthGuard";
import RedirectingScreen from "@/components/RedirectingScreen";
import { Ionicons } from "@expo/vector-icons";
import { BlurView } from 'expo-blur';

export default function HomeScreen() {
  useAuthGuard();
  const router = useRouter();
  const { roleName, setRoleName } = useAuth();
  const slideAnim = useRef(new Animated.Value(-300)).current;
  const [isVisible, setIsVisible] = useState(false);
  
  const handleLogout = useCallback(async () => {
    setRoleName(null);
    await AsyncStorage.removeItem("roleName");
    router.replace("/(login)/loginScreen");
  }, [router, setRoleName]);

  const toggleSidebar = () => {
    Animated.timing(slideAnim, {
      toValue: isVisible ? -200 : 5,
      duration: 300,
      useNativeDriver: false,
    }).start();

    setIsVisible(!isVisible);
  };
  const hideSidebar = () => {
    Animated.timing(slideAnim, {
      toValue: -320,
      duration: 300,
      useNativeDriver: false,
    }).start();
    setIsVisible(false);
  };

  return (
    <SafeAreaView style={{...styles.centered, backgroundColor: '#84c4ab', position: 'relative'}}>
      <View style={{position: 'absolute', left: -20, top: 20}}>
        <TouchableOpacity
            style={{ }}
            onPress={toggleSidebar}
          >
          <Image
            source={require("../../assets/images/Settings Icon.png")}
            style={{
              width: 120,
              height: 70,
              resizeMode: "contain",
              marginBottom: 20,
            }}
          />
        </TouchableOpacity>
      </View>
      {isVisible && (
        <TouchableWithoutFeedback onPress={hideSidebar}>
          <BlurView
            intensity={90}
            tint="dark"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              height: windowHeight,
              width: '100%',
              zIndex: 5,
            }}
          />
        </TouchableWithoutFeedback>
      )}
      <View style={{position: 'absolute', left: 0, top: 2, zIndex: 10}}>
        <Animated.View style={[styles.sideBar, { position: 'absolute', left: slideAnim, top: 2 }]}>
          <TouchableOpacity onPress={() => router.replace("/(profile)")}>
            <View style={{ marginTop: 40 }}>
              <Image
                source={require('../../assets/images/Profile.png')}
                style={{ width: 100, height: 100,}} // example style
              />
            </View>
          </TouchableOpacity>
          <View style={{alignItems: 'center', gap:15, marginTop:180}}>
            <TouchableOpacity style={{borderRadius: 10,
              alignItems: "center",
              width: 200,
              padding: 15,
              backgroundColor: 'white'}}
              onPress={() => 'handleRegister()'}>
              <Text style={{fontSize:20, fontWeight: 'bold'}}>FAQs</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{borderRadius: 10,
              alignItems: "center",
              width: 200,
              padding: 15,
              backgroundColor: 'white'}}
              onPress={() => 'handleRegister()'}>
              <Text style={{fontSize:20, fontWeight: 'bold'}}>About Us</Text>
            </TouchableOpacity> 
          </View>
          <View style={{marginBottom: 20}}>
            <TouchableOpacity style={{borderRadius: 10,
              alignItems: "center",
              width: 150,
              padding: 15,
              backgroundColor: 'white'}}
              onPress={() => handleLogout()}>
              <Text style={{fontSize:20, fontWeight: 'bold'}}>Logout</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>
      <View style={{marginTop: 40}}>
        <Image source={require("../../assets/images/Profile.png")} style={styles.image} />
      </View>
      <View style={styles.searccontainer}>
          <TextInput
            placeholder="How can I help?"
            placeholderTextColor="#ffffffaa"
            style={styles.input}
          />
          <TouchableOpacity style={styles.iconContainer}>
            <Ionicons name="search" size={18} color="#000" />
          </TouchableOpacity>
        </View>
      <View style={styles.cardContainer}>
        <TouchableOpacity style={styles.card} onPress={() => router.replace("/(emergency)")}>
          <Image source={require("../../assets/images/Schedule Organizer.png")} style={styles.cardImage} />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.card} onPress={() => router.replace("/(contacts)")}>
          <Image source={require("../../assets/images/Project Report.png")} style={styles.cardImage} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.card} onPress={() => router.replace("/(reports)")}>
          <Image source={require("../../assets/images/Course Messages.png")} style={styles.cardImage} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.card} onPress={() => router.replace("/(alerts)")}>
          <Image source={require("../../assets/images/Carl AI Assistant.png")} style={styles.cardImage} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.card} onPress={() => router.replace("/(issues)")}>
          <Image source={require("../../assets/images/Schedule Organizer (1).png")} style={styles.cardImage} />
        </TouchableOpacity>
         <TouchableOpacity style={styles.card} onPress={() => router.replace("/(volunteer)")}>
          <Image source={require("../../assets/images/Project Report (1).png")} style={styles.cardImage} />
        </TouchableOpacity>
      </View>    
    </SafeAreaView>
  );
}
const windowHeight = Dimensions.get("window").height;
const styles = StyleSheet.create({
  searccontainer: {
    flexDirection: 'row',
    borderWidth: 5,
    borderColor: 'white',
    backgroundColor: '#80c2a8',
    borderRadius: 10,
    paddingHorizontal: 10,
    alignItems: 'center',
    height: 55,
    width: 270,
  },
  input: {
    flex: 1,
    color: '#fff',
    fontSize: 14,
    borderColor: 'black',
  },
  iconContainer: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 5,
    marginLeft: 8,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  centered: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  image: {
    width: 120,
    height: 120,
    resizeMode: "contain",
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    width: '40%',             
    aspectRatio: 1,         
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    elevation: 5,     
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  cardImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  cardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    padding: 16,
    backgroundColor: '#80c2a8',
    marginTop: 15,
  },
  sideBar: {
    width: 270,
    borderWidth: 3,
    borderColor: 'white',
    height: windowHeight * 0.99,
    borderRadius: 20,
    zIndex: 1,
    backgroundColor: '#84c4ab',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
