import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

type AuthContextType = {
  roleName: string | null;
  setRoleName: (role: string | null) => void;
  userId: string | null;
  setUserId: (userId: string | null) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [roleName, setRoleNameState] = useState<string | null>(null);
  const [userId, setUserIdState] = useState<string | null>(null);

  const setRoleName = async (role: string | null) => {
    if (role) {
      await AsyncStorage.setItem("roleName", role);
    } else {
      await AsyncStorage.removeItem("roleName");
    }
    setRoleNameState(role);
  };

  const setUserId = async (user: string | null) => {
    if (user) {
      await AsyncStorage.setItem("userId", user);
    } else {
      await AsyncStorage.removeItem("userId");
    }
    setUserIdState(user);
  };

  useEffect(() => {
    const loadAuthData = async () => {
      const storedRole = await AsyncStorage.getItem("roleName");
      const storedUserId = await AsyncStorage.getItem("userId");

      setRoleNameState(storedRole ?? null);
      setUserIdState(storedUserId ?? null);
    };
    loadAuthData();
  }, []);

  return (
    <AuthContext.Provider value={{ roleName, setRoleName, userId, setUserId }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
