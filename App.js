import { useEffect } from "react";
import {
  StatusBar,
} from "react-native";

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';

import changeNavigationBarColor from 'react-native-navigation-bar-color';

import Toast from 'react-native-toast-message';

import { ModalPortal } from 'react-native-modals';

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
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons/faPaperPlane';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons/faArrowDown';
import { faMoneyCheck } from '@fortawesome/free-solid-svg-icons/faMoneyCheck';
import { faMoneyBill } from '@fortawesome/free-solid-svg-icons/faMoneyBill';
import { faMoneyBillAlt } from '@fortawesome/free-solid-svg-icons/faMoneyBillAlt';
import { faGem } from '@fortawesome/free-solid-svg-icons/faGem';
import { faCopy } from '@fortawesome/free-solid-svg-icons/faCopy';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons/faArrowLeft';

import Colors from "./src/styles/colors";

import Splash from "./src/pages/splash";
import AppInterfaceAfterInstallation from "./src/pages/app-interface-after-install";
import SignIn from "./src/pages/sign-in";
import SignUp from "./src/pages/sign-up";
import VerifyEmail from "./src/pages/verify-email";
import SetupPin from "./src/pages/setup-pin";
import Dashboard from "./src/pages/dashboard";
import Wallet from "./src/pages/wallet";
import TransactionHistory from "./src/pages/transaction-history";
import SendViaInternet from "./src/pages/send-via-internet";
import ConfirmTransaction from "./src/pages/confirm-transaction";
import ReceiveViaOnline from "./src/pages/receive-via-online";
import ReceiveViaOffline from "./src/pages/receive-via-offline";
import ScanToReceive from "./src/pages/scan-to-receive";
import ScanToSendOffline from "./src/pages/scan-to-send";
import SendOffline from "./src/pages/send-offline";
import ConversionMode, {ConversionForm} from "./src/pages/convert";
import Menu from "./src/pages/menu";
import { WithdrawalPage, WithdrawalContinualPage } from "./src/pages/withdrawl";
import Pay from "./src/pages/pay";
import AirtimePurchasePage from "./src/pages/airtime-purchase";

library.add(faHome, faWallet, faPlus, faUser, faExchange, faArrowRight,
  faEye, faEyeSlash, faCancel, faPaperPlane, faArrowDown, faMoneyCheck, faMoneyBill,
  faMoneyBillAlt, faGem, faCopy, faArrowLeft);

const Stack = createStackNavigator();

const App = () => {
  useEffect(() => {
    try {
      changeNavigationBarColor(Colors.white, true);
    }
    catch(e) {
      //
    }
  })

  return(
    <NavigationContainer>
      <StatusBar backgroundColor={Colors.white} barStyle="dark-content" />
      <Stack.Navigator initialRouteName="Splash" screenOptions={{
        headerShown: false,
        gestureEnabled: false,
        gestureDirection: 'horizontal',
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
      >
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="AppInterfaceAfterInstallation" component={AppInterfaceAfterInstallation} />
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="VerifyEmail" component={VerifyEmail} />
        <Stack.Screen name="SetupPin" component={SetupPin} />
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="Wallet" component={Wallet} />
        <Stack.Screen name="TransactionHistory" component={TransactionHistory} />
        <Stack.Screen name="SendViaInternet" component={SendViaInternet} />
        <Stack.Screen name="ConfirmTransaction" component={ConfirmTransaction} />
        <Stack.Screen name="ReceiveViaOnline" component={ReceiveViaOnline} />
        <Stack.Screen name="ReceiveViaOffline" component={ReceiveViaOffline} />
        <Stack.Screen name="ScanToReceive" component={ScanToReceive} />
        <Stack.Screen name="ScanToSendOffline" component={ScanToSendOffline} />
        <Stack.Screen name="SendOffline" component={SendOffline} />
        <Stack.Screen name="ConversionMode" component={ConversionMode} />
        <Stack.Screen name="ConversionForm" component={ConversionForm} />
        <Stack.Screen name="Menu" component={Menu} />
        <Stack.Screen name="WithdrawalPage" component={WithdrawalPage} />
        <Stack.Screen name="WithdrawalContinualPage" component={WithdrawalContinualPage} />
        <Stack.Screen name="Pay" component={Pay} />
        <Stack.Screen name="AirtimePurchasePage" component={AirtimePurchasePage} />
      </Stack.Navigator>
      <ModalPortal />
      <Toast />
    </NavigationContainer>
  )
}

export default  App;