import { useAuth } from "@/context/AuthContext";
import { useAuthGuard } from "@/hooks/useAuthGuard";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useCallback, useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity } from "react-native";

export default function RedirectingScreen() {
  useAuthGuard();
  const router = useRouter();
  const { roleName, setRoleName } = useAuth();
  const handleLogout = useCallback(async () => {
    setRoleName(null);
    await AsyncStorage.removeItem("roleName");
    router.replace("/(login)/loginScreen");
  }, [router, setRoleName]);
  useEffect(() => {
    handleLogout()
  })
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#84C4AB" />
      <Text style={styles.text}>Redirecting to login...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  text: {
    marginTop: 16,
    fontSize: 18,
    color: "#84C4AB",
    fontWeight: "600",
  },
});
