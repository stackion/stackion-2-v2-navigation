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
                            N 900000
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
                            N 100000
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
        fontSize : 16,
        fontWeight : 800,
        color : Colors.black46,
        fontFamily : "Roboto-Medium",
    },
    goToHistoryBtn : {
        height : 60,
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