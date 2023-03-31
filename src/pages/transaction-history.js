import {useState, useEffect} from "react";
import {
    Text,
    View,
} from "react-native";
import { ScaledSheet as StyleSheet, moderateScale } from 'react-native-size-matters';

import * as encryptedStorage from "../functions/encrypted-storage";
import Colors from "../styles/colors";
import DefaultStyle from "../styles/defaults";
import {InAppHB} from "../components/in-app-h-b-f";
import {Btn} from "../components/button";

const TransactionHistory = (props) => {
    const [historyContent, setHistoryContent] = useState(
        <Text style={{fontSize : moderateScale(12), color : Colors.black46, fontFamily : "Roboto-Regular"}}>
            No History
        </Text>
        );
    const [isOnlineTransactions, setIsOnlineTransactions] = useState(true);

    useEffect(() => {
        (async () => {
            const userSession = await encryptedStorage.getItem("user_session");
            if(userSession) {
                let parsedSession = JSON.parse(userSession);
                let onlineTransactionHistory = parsedSession.user_online_data.transaction_records_db;
                let offlineTransactionHistory = parsedSession.offline_transactions;
                if(onlineTransactionHistory.length > 0 && isOnlineTransactions) {
                    onlineTransactionHistory = onlineTransactionHistory.reverse();
                    setHistoryContent(
                        <>
                        {onlineTransactionHistory.map(transaction => (
                            <View key={transaction.date} style={[style.contentsInBodyCont, style.historyContentCont]}>
                                <Text style={[style.historyTitle]}>
                                    {transaction.type}
                                </Text>
                                <Text style={[style.historyText]}>
                                    {transaction.message}
                                </Text>
                                <Text style={[style.historyDate]}>
                                    {new Date(transaction.date).toLocaleString("en-NG", {timeZone: "Africa/Lagos", weekday: "short", year: "numeric", month: "long", day: "numeric", hour: "numeric", minute: "numeric"})}
                                </Text>
                            </View>
                          ))}
                        </>
                    );
                }
                else  if(offlineTransactionHistory.length > 0 && !isOnlineTransactions) {
                    offlineTransactionHistory = offlineTransactionHistory.reverse();
                    setHistoryContent(
                        <>
                        {offlineTransactionHistory.map(transaction => (
                            <View key={transaction.date} style={[style.contentsInBodyCont, style.historyContentCont]}>
                                <Text style={[style.historyTitle]}>
                                    {transaction.type}
                                </Text>
                                <Text style={[style.historyText]}>
                                    {transaction.message}
                                </Text>
                                <Text style={[style.historyDate]}>
                                    {new Date(transaction.date).toLocaleString("en-NG", {timeZone: "Africa/Lagos", weekday: "short", year: "numeric", month: "long", day: "numeric", hour: "numeric", minute: "numeric"})}
                                </Text>
                            </View>
                          ))}
                        </>
                    );
                } else {
                    setHistoryContent(
                        <Text style={{fontSize : moderateScale(12), color : Colors.black46, fontFamily : "Roboto-Regular"}}>
                            No History
                        </Text>
                    )
                }
            }
        })();
    }, [isOnlineTransactions])
    return (
        <InAppHB navigation={props.navigation} headerStyle={{justifyContent : "center", paddingLeft : 0}} headerTitleText={"Transaction History"} >
            <View style={[DefaultStyle.centeredYSpaceBetweenX, style.transactionListSelectorCont, style.contentsInBodyCont]}>
                <Btn text="Online" style={[style.transactionListSelectorbtn, {
                    backgroundColor : isOnlineTransactions ? Colors.white : Colors.blackF2,
                }, DefaultStyle.centeredXY]} textStyle={style.transactionListSelectorText}
                onPress={() => setIsOnlineTransactions(true)} />
                <Btn text="Offline" style={[style.transactionListSelectorbtn, {
                    backgroundColor : isOnlineTransactions ? Colors.blackF2 : Colors.white,
                }, DefaultStyle.centeredXY]} textStyle={style.transactionListSelectorText}
                onPress={() => setIsOnlineTransactions(false)} />
            </View>
            <View style={[style.historyContentSection, DefaultStyle.centeredXY, style.contentsInBodyCont]} >
                {historyContent}
            </View>
        </InAppHB>
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
    assetCont : {
        backgroundColor : Colors.white,
        height : "70@vs",
        padding : "24@ms",
        marginTop : "10@vs",
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
        fontSize : "16@ms"
    },
    historySectionTitle : {
        marginTop : "60@vs",
        height : "40@vs",
        borderBottomColor : Colors.blackF2,
        borderBottomWidth : 3,
    },
    historySectionTitleText : {
        fontSize : "20@ms",
        fontWeight : 600,
        color : Colors.black31,
        fontFamily : "Roboto-Medium",
    },
    historyContentSection : {
        borderColor : `${Colors.black46}62`,
        borderWidth : 0.6,
        borderStyle : "solid",
        marginTop : "2@vs",
        minHeight : "120@vs",
    },
    historyContentCont : {
        marginTop : "8@vs",
        height : "80@vs",
        padding : "5@ms",
        backgroundColor : Colors.white,
        borderBottomColor : `${Colors.black46}62`,
        borderBottomWidth : 0.6,
        borderBottomStyle : "solid",
    },
    historyTitle : {
        fontSize : "14@ms",
        color : Colors.black31,
        fontFamily : "Roboto-Medium",
        alignSelf : "flex-start",
    },
    historyText : {
        fontSize : "12@ms",
        color : Colors.black31,
        fontFamily : "Roboto-Regular",
        alignSelf : "flex-start",
    },
    historyDate : {
        fontSize : "12@ms",
        fontWeight : 500,
        color : Colors.black46,
        fontFamily : "Roboto-Regular",
        alignSelf : "flex-end",
        position : "absolute",
        bottom : "4@vs",
        right : "4@s"
    },
    transactionListSelectorCont : {
        height : "48@vs",
        backgroundColor : Colors.blackF2,
        borderRadius : "100@ms",
        marginBottom : "10@vs",
        padding : "10@vs"
    },
    transactionListSelectorbtn : {
        height : "40@vs",
        borderRadius : "100@ms",
        padding : "10@vs",
        width : "160@s"
    },
    transactionListSelectorText : {
        fontSize : "16@ms",
        fontFamily : "Roboto-Medium",
        color : Colors.black31
    }
})

export default TransactionHistory;