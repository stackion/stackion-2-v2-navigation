import React from "react";
import {
  Text,
  View,
  Button,
  StatusBar,
} from "react-native";

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';

import changeNavigationBarColor from 'react-native-navigation-bar-color';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faHome } from '@fortawesome/free-solid-svg-icons/faHome';
import { faWallet } from '@fortawesome/free-solid-svg-icons/faWallet';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';
import { faUser } from '@fortawesome/free-solid-svg-icons/faUser';
import { faExchange } from '@fortawesome/free-solid-svg-icons/faExchange';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons/faArrowRight';
import { faEye } from '@fortawesome/free-solid-svg-icons/faEye';
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons/faEyeSlash';
import { faCancel } from '@fortawesome/free-solid-svg-icons/faCancel';

import Colors from "./src/styles/colors";

import Splash from "./src/pages/splash";
import AppInterfaceAfterInstallation from "./src/pages/app-interface-after-install";
import SignIn from "./src/pages/sign-in";
import SignUp from "./src/pages/sign-up";
import VerifyEmail from "./src/pages/verify-email";
import SetupPin from "./src/pages/setup-pin";
import Dashboard from "./src/pages/dashboard";
import Wallet from "./src/pages/wallet";
import SendViaInternet from "./src/pages/send-via-internet";
import ConfirmTransaction from "./src/pages/confirm-transaction";
import ReceiveViaOnline from "./src/pages/receive-via-online";
import ReceiveViaOffline from "./src/pages/receive-via-offline";
import ScanToSendOffline from "./src/pages/scan-to-send";
import SendOffline from "./src/pages/send-offline";
import OfflineTransactionStateNotifierDisplay from "./src/pages/offline-transaction-state-notifier-display";

library.add(faHome, faWallet, faPlus, faUser, faExchange, faArrowRight, faEye, faEyeSlash, faCancel);

const Stack = createStackNavigator();

const App = () => {
  try {
    changeNavigationBarColor(Colors.white, true);
  }
  catch(e) {
    //
  }
  return(
    <NavigationContainer>
      <StatusBar backgroundColor={Colors.white} barStyle="dark-content" />
      <Stack.Navigator initialRouteName="Splash" screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        gestureDirection: 'horizontal',
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}>
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="AppInterfaceAfterInstallation" component={AppInterfaceAfterInstallation} />
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="VerifyEmail" component={VerifyEmail} />
        <Stack.Screen name="SetupPin" component={SetupPin} />
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="Wallet" component={Wallet} />
        <Stack.Screen name="SendViaInternet" component={SendViaInternet} />
        <Stack.Screen name="ConfirmTransaction" component={ConfirmTransaction} />
        <Stack.Screen name="ReceiveViaOnline" component={ReceiveViaOnline} />
        <Stack.Screen name="ReceiveViaOffline" component={ReceiveViaOffline} />
        <Stack.Screen name="ScanToSendOffline" component={ScanToSendOffline} />
        <Stack.Screen name="SendOffline" component={SendOffline} />
        <Stack.Screen name="OfflineTransactionStateNotifierDisplay" component={OfflineTransactionStateNotifierDisplay} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default  App;