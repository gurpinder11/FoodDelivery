import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {useState, createContext, useEffect} from "react";

// Create context object
export const UserContext = createContext({});

// Create a provider for components to consume and subscribe to changes
export const UserContextProvider = (props: any) => {
  const [user, setUser] = useState({});

  useEffect(() => {
    retrieveUserData();
  }, []);

  const retrieveUserData = async () => {
    try {
      const value = await AsyncStorage.getItem("user");
      if (value !== null) {
        const userData = JSON.parse(value);
        console.log(userData);
        setUser(userData);
      }
    } catch (error) {
      // Error retrieving data
      console.log(error);
    }
  };

  return <UserContext.Provider value={[user, setUser]}>{props.children}</UserContext.Provider>;
};
