import { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";

export function usePreventGoingBackToScreen(screenName) {
    const navigation = useNavigation();
  
    useEffect(() => {
      const unsubscribe = navigation.addListener('beforeRemove', (e) => {
        const currentRoute = e.data.state.routes[e.data.state.index];
  
        if (currentRoute.name === screenName) {
          e.preventDefault();
        }
      });
  
      return unsubscribe;
    }, [navigation]);
  
    return null;
}