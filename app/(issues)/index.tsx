import { View, Text, StyleSheet, SafeAreaView, Image, TouchableOpacity } from "react-native";
import CustomButton from "@/components/buttons/CustomButton";
import { useRouter } from "expo-router";
import { useCallback } from "react";
import { useAuthGuard } from "@/hooks/useAuthGuard";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth } from "@/context/AuthContext";
import { MaterialIcons } from "@expo/vector-icons";

export default function IssuesPage() {
  useAuthGuard();
  const router = useRouter();
  
  return (
    <SafeAreaView style={{...styles.container, backgroundColor: '#84c4ab'}}>
      <View style={styles.centered}>
        <Text style={{...styles.title, marginTop: 50}}>ISSUES HEALTH AND SAFETY ADVISORY</Text>
      </View>
      <View style={styles.spacer} />
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
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
    textAlign: 'center'
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
