import { View, Text, StyleSheet, ActivityIndicator } from "react-native";

export default function RedirectingScreen() {
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
