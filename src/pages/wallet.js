import {
    Text,
    View,
    StyleSheet,
    Alert
} from "react-native";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import Colors from "../styles/colors";
import DefaultStyle from "../styles/defaults";
import {Btn} from "../components/button";
import InAppHBF from "../components/in-app-h-b-f";

const Wallet = (props) => {
    return (
        <InAppHBF activePage="wallet" navigation={props.navigation} headerTitleText={"Wallet"} whenHeaderMenuBtnIsPressed={() => Alert.alert("Open menu ?")} >
            <View style={[style.dashboardAssetValueDisplayRect, style.contentsInBodyCont]}>
                <View style={[DefaultStyle.centeredX]}>
                    <Text style={[style.Balance]}>Total balance</Text>
                </View>
                <View style={[DefaultStyle.centeredX]}>
                    <Text style={[style.balanceAmount]}>N 1,000,000.00</Text>
                </View>
            </View>
            <View style={[style.contentsInBodyCont, style.historySectionTitle ]} >
                <Text style={[style.historySectionTitleText, {textAlign : "center"}]} >
                    Assets
                </Text>
            </View>
            <View style={style.contentsInBodyCont}>
                <View style={[DefaultStyle.centeredYSpaceBetweenX, DefaultStyle.WSpanParent, style.assetCont]}>
                    <View>
                        <Text style={style.assetsInfo}>
                            Fiat
                        </Text>
                    </View>
                    <View>
                        <Text style={style.assetsInfo}>
                            N 900000
                        </Text>
                    </View>
                </View>
                <View style={[DefaultStyle.centeredYSpaceBetweenX, DefaultStyle.WSpanParent, style.assetCont]}>
                    <View>
                        <Text style={style.assetsInfo}>
                            Offline tokens
                        </Text>
                    </View>
                    <View>
                        <Text style={style.assetsInfo}>
                            N 100000
                        </Text>
                    </View>
                </View>
            </View>
            <View style={[style.contentsInBodyCont, style.historySectionTitle ]} >
                <Text style={[style.historySectionTitleText]} >
                    Transaction History
                </Text>
            </View>
            <View style={[style.historyContentSection, DefaultStyle.centeredXY, style.contentsInBodyCont]} >
                {/*the content would be displayed based on state / other */}
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
                <Text style={{fontSize : 12, color : Colors.black46, fontFamily : "Roboto-Regular"}}>
                    No History
                </Text>
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

export default Wallet;