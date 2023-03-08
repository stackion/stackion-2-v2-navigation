import {useState, useEffect} from "react";
import {
    Text,
    View,
    StyleSheet,
    Alert
} from "react-native";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

import * as encryptedStorage from "../functions/encrypted-storage";
import Colors from "../styles/colors";
import DefaultStyle from "../styles/defaults";
import {Btn} from "../components/button";
import {InAppHB} from "../components/in-app-h-b-f";

const TransactionHistory = (props) => {
    const [historyContent, setHistoryContent] = useState(
        <Text style={{fontSize : 12, color : Colors.black46, fontFamily : "Roboto-Regular"}}>
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
                    //the value of the history data should be set in accordance
                    //set the history content
                    /*
                <View style={[style.contentsInBodyCont, style.historyContentCont]}>
                    <Text style={[style.historyTitle]}>
                        Received
                    </Text>
                    <Text style={[style.historyText]}>
                        N 2,000 from @johndoe. -Offline token(s)
                    </Text>
                    <Text style={[style.historyDate]}>
                        {new Date().toUTCString()}
                    </Text>
                </View>
                <View style={[style.contentsInBodyCont, style.historyContentCont]}>
                    <Text style={[style.historyTitle]}>
                        Deposited
                    </Text>
                    <Text style={[style.historyText]}>
                        N 2,000 via crypto
                    </Text>
                    <Text style={[style.historyDate]}>
                        {new Date().toUTCString()}
                    </Text>
                </View>
                <View style={[style.contentsInBodyCont, style.historyContentCont]}>
                    <Text style={[style.historyTitle]}>
                        Withdrew
                    </Text>
                    <Text style={[style.historyText]}>
                        N 2,000 to external account.
                    </Text>
                    <Text style={[style.historyDate]}>
                        {new Date().toUTCString()}
                    </Text>
                </View>
                <View style={[style.contentsInBodyCont, style.historyContentCont]}>
                    <Text style={[style.historyTitle]}>
                        Sent
                    </Text>
                    <Text style={[style.historyText]}>
                        N 2,000 to @johndoe. -Offline token(s)
                    </Text>
                    <Text style={[style.historyDate]}>
                        {new Date().toUTCString()}
                    </Text>
                </View>
                <View style={[style.contentsInBodyCont, style.historyContentCont]}>
                    <Text style={[style.historyTitle]}>
                        Sent
                    </Text>
                    <Text style={[style.historyText]}>
                        N 2,000 to @johndoe. -Fiat
                    </Text>
                    <Text style={[style.historyDate]}>
                        {new Date().toUTCString()}
                    </Text>
                </View>
                <View style={[style.contentsInBodyCont, style.historyContentCont]}>
                    <Text style={[style.historyTitle]}>
                        Received
                    </Text>
                    <Text style={[style.historyText]}>
                        N 2,000 from @johndoe. -Fiat
                    </Text>
                    <Text style={[style.historyDate]}>
                        {new Date().toUTCString()}
                    </Text>
                </View>
                */
                } else {
                    setHistoryContent(
                        <Text style={{fontSize : 12, color : Colors.black46, fontFamily : "Roboto-Regular"}}>
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
    historySectionTitle : {
        marginTop : 60,
        height : 40,
        borderBottomColor : Colors.blackF2,
        borderBottomWidth : 3,
    },
    historySectionTitleText : {
        fontSize : 20,
        fontWeight : 600,
        color : Colors.black31,
        fontFamily : "Roboto-Medium",
    },
    historyContentSection : {
        marginTop : 2,
        minHeight : 120,
    },
    historyContentCont : {
        marginTop : 8,
        height : 80,
        padding : 5,
        backgroundColor : Colors.white,
        borderColor : Colors.blackF2,
        borderWidth : 0.6,
        borderStyle : "solid",
    },
    historyTitle : {
        fontSize : 12,
        color : Colors.black31,
        fontFamily : "Roboto-Medium",
        alignSelf : "flex-start",
    },
    historyText : {
        fontSize : 12,
        color : Colors.black46,
        fontFamily : "Roboto-Regular",
        alignSelf : "flex-start",
    },
    historyDate : {
        fontSize : 12,
        fontWeight : 500,
        color : Colors.black46,
        fontFamily : "Roboto-Regular",
        alignSelf : "flex-end",
        position : "absolute",
        bottom : 4,
        right : 4
    },
})

export default TransactionHistory;