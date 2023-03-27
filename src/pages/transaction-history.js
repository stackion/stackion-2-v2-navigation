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

const TransactionHistory = (props) => {
    const [historyContent, setHistoryContent] = useState(
        <Text style={{fontSize : moderateScale(12), color : Colors.black46, fontFamily : "Roboto-Regular"}}>
            No History
        </Text>
        );
    useEffect(() => {
        (async () => {
            const userSession = await encryptedStorage.getItem("user_session");
            if(userSession) {
                let parsedSession = JSON.parse(userSession);
                let onlineTransactionHistory = parsedSession.user_online_data.transaction_records_db;
                if(onlineTransactionHistory.length > 0) {
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
                                    {transaction.date.replace(/GMT/g,"")}
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
    }, [])
    return (
        <InAppHB navigation={props.navigation} headerStyle={{justifyContent : "center", paddingLeft : 0}} headerTitleText={"Transaction History"} >
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
        marginTop : "2@vs",
        minHeight : "120@vs",
    },
    historyContentCont : {
        marginTop : "8@vs",
        height : "80@vs",
        padding : "5@ms",
        backgroundColor : Colors.white,
        borderColor : `${Colors.black46}e2`,
        borderWidth : 0.6,
        borderStyle : "solid",
    },
    historyTitle : {
        fontSize : "12@ms",
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
})

export default TransactionHistory;