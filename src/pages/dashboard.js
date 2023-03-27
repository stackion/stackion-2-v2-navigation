import { useCallback, useState, useEffect } from "react";
import {
    Text,
    View,
    Alert,
    BackHandler,
    RefreshControl
} from "react-native";
import Toast from 'react-native-toast-message';
import { ScaledSheet as StyleSheet, moderateScale, verticalScale } from 'react-native-size-matters';
import { useFocusEffect } from '@react-navigation/native';
import Clipboard from '@react-native-clipboard/clipboard';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { Modal, ModalButton, ModalFooter, ModalContent} from "react-native-modals";
import { Wave } from 'react-native-animated-spinkit';

import * as encryptedStorage from "../functions/encrypted-storage";
import * as fetcher from "../functions/user-data-fetcher";
import Colors from "../styles/colors";
import DefaultStyle from "../styles/defaults";
import {Btn} from "../components/button";
import InAppHBF from "../components/in-app-h-b-f";
import {AfterTransactionPopUp as SlideUp} from "../components/modals";

const Dashboard = (props) => {  
    let backPressCount = 0;
  
    useFocusEffect(
      useCallback(() => {
        const onBackPress = () => {
          backPressCount++;
          if (backPressCount === 1) {
            Toast.show({
                type: 'info',
                text1: 'Going somewhere ?',
                text2: 'Press back again to exit 👋'
            });
            setTimeout(() => {
              backPressCount = 0;
            }, 2000);
            return true;
          } else {
            BackHandler.exitApp();
            return false;
          }
        };
  
        BackHandler.addEventListener('hardwareBackPress', onBackPress);
  
        return () => BackHandler.removeEventListener('hardwareBackPress', onBackPress);
      }, [])
    );

    const [name, setName] = useState("Dear User");
    const [balanceLegend, setBalanceLegend] = useState("Total Balance");
    const [totalBalance, setTotalBalance] = useState(<Wave size={moderateScale(48)} color={Colors.defaultBlue} />);
    const [refreshing, setRefreshing] = useState(false);
    const [popUpVisibility, setPopUpVisibility] = useState(false);
    const [accountName, setAccName] = useState("");
    const [accountNumber, setAccNumber] = useState("");
    const [withdrawalVisibility, setWithdrawalVisibility] = useState(false);

    const reflectUserData = async () => {
        const gottenUserData = await fetcher.fetchAndSaveData();
        const userSession = await encryptedStorage.getItem("user_session");
        if(userSession) {
            let parsedSession = JSON.parse(userSession);
            if(parsedSession.user_online_data.name !== "") {
                setName(parsedSession.user_online_data.name);
            }
            if(parsedSession.user_online_data.account_name && parsedSession.user_online_data.account_number) {
                setAccName(parsedSession.user_online_data.account_name);
                setAccNumber(parsedSession.user_online_data.account_number);
            }
            if(gottenUserData) {
                setTotalBalance(
                    new Intl.NumberFormat('en-UK', {
                        style: 'currency',
                        currency: 'NGN'
                    }).format(
                        parsedSession.user_online_data.fiat_balance
                        +
                        parsedSession.offline_token_balance
                    )
                );
                setBalanceLegend("Total Balance");
            }
            else {
                setTotalBalance(
                    new Intl.NumberFormat('en-UK', {
                        style: 'currency',
                        currency: 'NGN'
                    }).format(
                        parsedSession.offline_token_balance
                    )
                );
                setBalanceLegend("Offline Balance");
            }
        }
    };
    useEffect( ()=> {
        reflectUserData();
    },[])

    return (
        <InAppHBF activePage="home" navigation={props.navigation}  headerTitleText={`Hi, ${name}!`} whenHeaderMenuBtnIsPressed={() => Alert.alert("Coming soon")} refreshControl={
            <RefreshControl refreshing={refreshing}
            colors={["#000000"]}
            progressBackgroundColor="#ffffff" onRefresh={() => {
                setRefreshing(true)
                reflectUserData()
                .then(() => {
                    setRefreshing(false)
                })
            }} />
            } >
            <Modal
                visible={withdrawalVisibility}
                footer={
                <ModalFooter>
                    <ModalButton
                    text="OK"
                    onPress={() => setWithdrawalVisibility(false)}
                    />
                </ModalFooter>
                }
            >
                <ModalContent>
                    <Text style={{
                        fontSize : 16,
                        fontFamily : "Roboto-Regular",
                        color : Colors.black46
                    }}>
                        This feature is comming soon
                    </Text>
                </ModalContent>
            </Modal>
            <SlideUp visibility={popUpVisibility} onBottomBtnClicked={() => {
                setPopUpVisibility(false);
                }} >
                <View style={style.popupTitleCont}>
                    <Text style={style.popupTitle}>
                        Deposit Via Bank Transfer
                    </Text>
                </View>
                <View style={[style.contentsInBodyCont, style.DataCont]}>
                    <View style={{marginBottom : verticalScale(22)}}>
                        <Text style={[style.introText]}>
                            Bank
                        </Text>
                        <Btn style={[style.input, style.contentsInBodyCont]} text={
                            <>
                            <Text style={style.inputBtnText}>
                                KUDA MICROFINANCE BANK
                            </Text>
                            </>
                        } onPress={() => {
                            Clipboard.setString(`KUDA MICROFINANCE BANK`);
                            Toast.show({
                                type: 'success',
                                text1: 'Copied!',
                                text2: 'Have a great day champ ✌'
                            });
                        }} />
                    </View>
                    <View style={{marginBottom : verticalScale(22)}}>
                        <Text style={[style.introText]}>
                            Account name
                        </Text>
                        <Btn style={[style.input, style.contentsInBodyCont]} text={
                            <>
                            <Text style={style.inputBtnText}>
                                {accountName}
                            </Text>
                            </>
                        } onPress={() => {
                            Clipboard.setString(`${accountName}`);
                            Toast.show({
                                type: 'success',
                                text1: 'Copied!',
                                text2: 'Have a great day champ ✌'
                            });
                        }} />
                    </View>
                    <View style={{marginBottom : verticalScale(12)}}>
                        <Text style={[style.introText]}>
                            Account number
                        </Text>
                        <Btn style={[style.input, style.contentsInBodyCont]} text={
                            <>
                            <Text style={style.inputBtnText}>
                                {accountNumber}
                            </Text>
                            </>
                        } onPress={() => {
                            Clipboard.setString(`${accountNumber}`);
                            Toast.show({
                                type: 'success',
                                text1: 'Copied!',
                                text2: 'Have a great day champ ✌'
                            });
                        }} />
                    </View>
                </View>
                <View style={style.popupTitleCont}>
                    <Text style={style.popupTitle}>
                        If you do not see any account details please contact our support team.
                    </Text>
                </View>
            </SlideUp>
            <View style={[style.dashboardAssetValueDisplayRect, style.contentsInBodyCont]}>
                <View style={[DefaultStyle.centeredX]}>
                    <Text style={[style.Balance]}>{balanceLegend}</Text>
                </View>
                <View style={[DefaultStyle.centeredX]}>
                    <Text style={[style.balanceAmount]}>{totalBalance}</Text>
                </View>
            </View>
            <View style={[
                DefaultStyle.centeredY,
                DefaultStyle.WSpanParent,
                style.quickActionsHeadingSectionCont,
                style.contentsInBodyCont]}>
                    <Text style={style.QuickActions}>Quick actions</Text>
            </View>
            <View style={[
                style.quickActionsSectionCont,
                style.contentsInBodyCont
            ]}>
                <View style={[style.quickActionBtn]} >
                    <Btn text={
                        (
                            <>
                            <Text>Send{"\n\n"}</Text>
                            <FontAwesomeIcon icon="paper-plane" size={moderateScale(20)} color="#0052cc" />
                            </>
                        )
                    } style={[
                        DefaultStyle.WHSpanParent,
                        {
                            padding : moderateScale(12),
                        }
                    ]} textStyle={style.quickActionBtnText} onPress={() => {
                        props.navigation.navigate("SendViaInternet")
                    }} />
                </View>
                <View  style={[style.quickActionBtn]} >
                    <Btn text={
                        (
                            <>
                            <Text>Receive{"\n\n"}</Text>
                            <FontAwesomeIcon icon="arrow-down" size={moderateScale(20)} color="#4da6ff" />
                            </>
                        )
                    } style={[
                            DefaultStyle.WHSpanParent,
                            {
                                padding : moderateScale(12),
                            }
                    ]} textStyle={style.quickActionBtnText} onPress={() => {
                        props.navigation.navigate("ReceiveViaOnline")
                    }}  />
                </View>
                <View  style={[style.quickActionBtn]} >
                    <Btn text={
                        (
                            <>
                            <Text>Deposit{"\n\n"}</Text>
                            <FontAwesomeIcon icon="money-check" size={moderateScale(20)} color="#0066ff" />
                            </>
                        )
                    } style={[
                            DefaultStyle.WHSpanParent,
                            {
                                padding : moderateScale(12),
                            }
                    ]} textStyle={style.quickActionBtnText} onPress={() => setPopUpVisibility(true)} />
                </View>
                <View  style={[style.quickActionBtn]} >
                    <Btn text={
                        (
                            <>
                            <Text>Withdrawl{"\n\n"}</Text>
                            <FontAwesomeIcon icon="money-bill" size={moderateScale(20)} color="#0047b3" />
                            </>
                        )
                    } style={[
                            DefaultStyle.WHSpanParent,
                            {
                                padding : moderateScale(12),
                            }
                    ]} textStyle={style.quickActionBtnText}
                    onPress={() => setWithdrawalVisibility(true)} />
                </View>
            </View>
        </InAppHBF>
    )
}

const style = StyleSheet.create({
    contentsInBodyCont : {
        width : "100%",
        minWidth : "289@s",
        maxWidth : "340@s",
    },
    dashboardAssetValueDisplayRect : {
        height : "124@vs",
        padding : "10@ms",
        borderRadius : "5@ms",
        justifyContent : "center",
        backgroundColor : Colors.blackF2
    },
    Balance : {
        fontSize : "16@ms",
        color : Colors.black31,
        fontFamily : "Roboto-Medium",
        fontWeight : 300
    },
    balanceAmount : {
        fontSize : "30@ms",
        color : Colors.black31,
        fontFamily : "Roboto-Medium",
    },
    popupTitleCont : {
        marginTop : "1%",
        marginBottom : "10%"
    },
    popupTitle : {
        fontSize : "13@ms",
        fontFamily : "Roboto-Regular",
        color : Colors.black46
    },
    DataCont : {
        padding : "12@ms",
        borderRadius : "5@ms",
    },
    introText : {
        fontSize : "13@ms",
        fontWeight : 400,
        color : Colors.black10trans,
        fontFamily : "Roboto-Medium"
    },
    input : {
        height : "45@vs",
        width : "100%",
        maxWidth : "299@s",
        minWidth : "180@s",
        padding : "11@ms",
        borderRadius : "2@ms",
        fontSize : 16,
        marginTop : "2@vs",
        backgroundColor : Colors.blackF2,
    },
    inputBtnText : {
        fontSize : "16@ms",
        color : Colors.black31,
        fontFamily : "Roboto-Medium"
    },
    quickActionsHeadingSectionCont : {
        height : "50@vs",
        marginTop : "20@vs",
        borderBottomStyle : "solid",
        borderBottomWidth : 3,
        borderBottomColor : Colors.blackF2
    },
    QuickActions : {
        fontSize : "12@ms",
        color : Colors.black31,
        fontFamily : "Roboto-Medium",
        fontWeight : 300
    },
    quickActionsSectionCont : {
        height : "320@vs",
        marginTop : "30@vs",
        flexDirection : "row",
        flexWrap : "wrap",
        justifyContent : "center"
    },
    quickActionBtn : {
        height : "104@vs",
        width : "121@s",
        margin : "15.5@ms",
        borderRadius : "7@ms",
        backgroundColor : Colors.blackF2
     /*   shadowColor: Colors.black,
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 1, */
    },
    quickActionBtnText : {
        fontSize : "16@ms",
        color : Colors.black31,
        fontWeight : 300,
        fontFamily : "Comfortaa-Medium",
    }
})

export default Dashboard;