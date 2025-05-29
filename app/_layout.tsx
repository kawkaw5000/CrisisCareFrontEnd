import { Stack, usePathname, useRouter } from "expo-router";
import { useEffect } from "react";
import { StatusBar } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavImg } from "@/constants/NavImg";
import { AuthProvider } from "@/context/AuthContext";
import BottomNavBar from "@/components/NavigationBar";

export default function RootLayout() {
  return (
    <AuthProvider>
      <SafeAreaProvider>
        <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />      
        <Stack>
          <Stack.Screen name="(1redirectScreen)" options={{ headerShown: false }} />
          <Stack.Screen name="(login)" options={{ headerShown: false }} />   
          <Stack.Screen name="(home)" options={{ headerShown: false }} />
          <Stack.Screen name="(register)" options={{ headerShown: false }} />
          <Stack.Screen name="(emergency)" options={{ headerShown: false }} />
          <Stack.Screen name="(profile)" options={{ headerShown: false }} />
          <Stack.Screen name="(reports)" options={{ headerShown: false }} />
          <Stack.Screen name="(contacts)" options={{ headerShown: false }} />
          <Stack.Screen name="(alerts)" options={{ headerShown: false }} />
          <Stack.Screen name="(issues)" options={{ headerShown: false }} />
          <Stack.Screen name="(volunteer)" options={{ headerShown: false }} />
        </Stack> 
      </SafeAreaProvider>
    </AuthProvider>
  );
}
