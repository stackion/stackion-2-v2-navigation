import { useState, useEffect } from "react";
import {
    Text,
    View,
    StyleSheet,
    Alert,
    RefreshControl
} from "react-native";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

import * as encryptedStorage from "../functions/encrypted-storage";
import * as fetcher from "../functions/user-data-fetcher";
import Colors from "../styles/colors";
import DefaultStyle from "../styles/defaults";
import {Btn} from "../components/button";
import InAppHBF from "../components/in-app-h-b-f";

const Wallet = (props) => {
    const [totalBalance, setTotalBalance] = useState(0);
    const [fiatBalance, setFiatBalance] = useState(0);
    const [offlineTokenBalance, setOfflineTokenBalance] = useState(0);
    const [refreshing, setRefreshing] = useState(false);

    const reflectUserData = async () => {
        const gottenUserData = await fetcher.fetchAndSaveData();
        const userSession = await encryptedStorage.getItem("user_session");
        if(userSession) {
            let parsedSession = JSON.parse(userSession);
            if(gottenUserData) {
                setTotalBalance(
                    Number(
                        parsedSession.user_online_data.fiat_balance
                        +
                        parsedSession.ofline_token_balance
                    ).toFixed(2)
                );
                setFiatBalance(Number(parsedSession.user_online_data.fiat_balance).toFixed(2));
                setOfflineTokenBalance(Number(parsedSession.ofline_token_balance).toFixed(2))
            }
            else {
                setTotalBalance(
                    Number(
                        parsedSession.ofline_token_balance
                    ).toFixed(2)
                );
                setFiatBalance(Number(0).toFixed(2));
                setOfflineTokenBalance(Number(parsedSession.ofline_token_balance).toFixed(2))
            }
        }
    };
    useEffect( ()=> {
        reflectUserData();
    },[])
    return (
        <InAppHBF activePage="wallet" navigation={props.navigation} headerTitleText={"Wallet"} whenHeaderMenuBtnIsPressed={() => Alert.alert("Open menu ?")} refreshControl={
            <RefreshControl refreshing={refreshing}
            colors={["#ff0000","#00ff00","#0000ff"]}
            progressBackgroundColor="#ffffff" onRefresh={() => reflectUserData()} />
            } >
            <View style={[style.dashboardAssetValueDisplayRect, style.contentsInBodyCont]}>
                <View style={[DefaultStyle.centeredX]}>
                    <Text style={[style.Balance]}>Total balance</Text>
                </View>
                <View style={[DefaultStyle.centeredX]}>
                    <Text style={[style.balanceAmount]}>N {totalBalance}</Text>
                </View>
            </View>
            <View style={[style.contentsInBodyCont, style.SectionTitle ]} >
                <Text style={[style.SectionTitleText, {textAlign : "center"}]} >
                    Assets
                </Text>
            </View>
            <View style={style.contentsInBodyCont}>
                <View style={[DefaultStyle.centeredYSpaceBetweenX, DefaultStyle.WSpanParent, style.assetCont]}>
                    <View>
                        <Text style={style.assetsInfo}>
                            <FontAwesomeIcon icon="money-bill-alt" size={20} color={Colors.defaultBlue} style={{transform: [{ translateY: 3 }]}} />  Fiat
                        </Text>
                    </View>
                    <View>
                        <Text style={style.assetsInfo}>
                            N {fiatBalance}
                        </Text>
                    </View>
                </View>
                <View style={[DefaultStyle.centeredYSpaceBetweenX, DefaultStyle.WSpanParent, style.assetCont]}>
                    <View>
                        <Text style={style.assetsInfo}>
                        <FontAwesomeIcon icon="gem" size={20} color={Colors.defaultBlue} style={{transform: [{ translateY: 3 }]}} />  Offline tokens
                        </Text>
                    </View>
                    <View>
                        <Text style={style.assetsInfo}>
                            N {offlineTokenBalance}
                        </Text>
                    </View>
                </View>
            </View>
            <View style={[
                style.contentsInBodyCont
            ]}>
                <Btn text="View Transaction History" textStyle={style.goToHistoryBtnText} style={[style.goToHistoryBtn, 
                DefaultStyle.WSpanParent]}  onPress={() => props.navigation.navigate("TransactionHistory")} />
            </View>
        </InAppHBF>
    )
}

const style = StyleSheet.create({
    contentsInBodyCont : {
        width : "100%",
        minWidth : 289,
        maxWidth : 340,
    },
    dashboardAssetValueDisplayRect : {
        height : 124,
        padding : 10,
        borderRadius : 5,
        justifyContent : "center",
        backgroundColor : Colors.blackF2
    },
    Balance : {
        fontSize : 16,
        color : Colors.black31,
        fontFamily : "Roboto-Medium",
        fontWeight : 300
    },
    balanceAmount : {
        fontSize : 30,
        color : Colors.black31,
        fontFamily : "Roboto-Medium",
    },
    assetCont : {
        backgroundColor : Colors.white,
        height : 70,
        padding : 24,
        marginTop : 10,
        shadowColor: Colors.black,
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 1,
    },
    assetsInfo : {
        fontWeight : 200,
        fontFamily : "Roboto-Medium",
        color : Colors.black31,
        fontSize : 16
    },
    SectionTitle : {
        marginTop : 60,
        height : 40,
        borderBottomColor : Colors.blackF2,
        borderBottomWidth : 3,
    },
    SectionTitleText : {
        fontSize : 20,
        fontWeight : 800,
        color : Colors.black31,
        fontFamily : "Roboto-Medium",
    },
    goToHistoryBtn : {
        height : 50,
        backgroundColor : Colors.defaultBlue,
        marginTop : 50,
        justifyContent : "center",
        borderRadius : 10
    },
    goToHistoryBtnText : {
        textAlign : "center",
        color : Colors.white,
        fontSize : 16,
        fontFamily : "Comfortaa-Regular"
    }
})

export default Wallet;