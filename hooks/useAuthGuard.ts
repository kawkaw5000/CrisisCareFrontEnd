import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useAuth } from "@/context/AuthContext"; // Adjust path if needed

export const useAuthGuard = (requiredRole: string = "User") => {
  const router = useRouter();
  const { roleName, setRoleName, userId, setUserId } = useAuth();

  useEffect(() => {
    const checkAuth = async () => {
      let currentRole = roleName;
      let currentUserId = userId;

      if (!currentRole) {
        const storedRole = await AsyncStorage.getItem("roleName");
        if (storedRole) {
          currentRole = storedRole;
          setRoleName(storedRole);
        }
      }

      if (!currentUserId) {
        const storedId = await AsyncStorage.getItem("userId");
        if (storedId) {
          currentUserId = storedId;
          setUserId(storedId);
        }
      }

      if (currentRole !== requiredRole) {
        router.replace("/(login)/loginScreen");
      } else {
        console.log("Authenticated:", { currentRole, currentUserId });
      }
    };

    checkAuth();
  }, []);
};
