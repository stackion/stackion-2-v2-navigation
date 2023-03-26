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
    const [balanceLegend, setBalanceLegend] = useState("Total Balance");
    const [totalBalance, setTotalBalance] = useState("...");
    const [fiatBalance, setFiatBalance] = useState("...");
    const [offlineTokenBalance, setOfflineTokenBalance] = useState("...");
    const [refreshing, setRefreshing] = useState(false);

    const reflectUserData = async () => {
        const gottenUserData = await fetcher.fetchAndSaveData();
        const userSession = await encryptedStorage.getItem("user_session");
        if(userSession) {
            let parsedSession = JSON.parse(userSession);
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
                setFiatBalance(
                    new Intl.NumberFormat('en-UK', {
                        style: 'currency',
                        currency: 'NGN'
                    }).format(
                        parsedSession.user_online_data.fiat_balance
                    )
                );
                setOfflineTokenBalance(
                    new Intl.NumberFormat('en-UK', {
                        style: 'currency',
                        currency: 'NGN'
                    }).format(
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
                setFiatBalance(
                    new Intl.NumberFormat('en-UK', {
                        style: 'currency',
                        currency: 'NGN'
                    }).format(
                        0
                    )
                );
                setOfflineTokenBalance(
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
        <InAppHBF activePage="wallet" navigation={props.navigation} headerTitleText={"Wallet"} whenHeaderMenuBtnIsPressed={() => Alert.alert("Coming soon")} refreshControl={
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
            <View style={[style.dashboardAssetValueDisplayRect, style.contentsInBodyCont]}>
                <View style={[DefaultStyle.centeredX]}>
                    <Text style={[style.Balance]}>{balanceLegend}</Text>
                </View>
                <View style={[DefaultStyle.centeredX]}>
                    <Text style={[style.balanceAmount]}>{totalBalance}</Text>
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
                            {fiatBalance}
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
                            {offlineTokenBalance}
                        </Text>
                    </View>
                </View>
            </View>
            <View style={[
                style.contentsInBodyCont
            ]}>
                <Btn text="Transaction History" textStyle={style.goToHistoryBtnText} style={[style.goToHistoryBtn, 
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
        height : 45,
        backgroundColor : Colors.defaultBlue,
        marginTop : 50,
        justifyContent : "center",
        borderRadius : 5
    },
    goToHistoryBtnText : {
        textAlign : "center",
        color : Colors.white,
        fontSize : 16,
        fontFamily : "Comfortaa-Regular"
    }
})

export default Wallet;