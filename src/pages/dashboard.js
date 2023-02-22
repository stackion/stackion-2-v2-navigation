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

const Dashboard = (props) => {
    return (
        <InAppHBF activePage="home" navigation={props.navigation}  headerTitleText={"Hey, John!"} whenHeaderMenuBtnIsPressed={() => Alert.alert("Open menu ?")} >
            <View style={[style.dashboardAssetValueDisplayRect, DefaultStyle.centeredYSpaceBetweenX, style.contentsInBodyCont]}>
                <View style={[style.balanceAmountTextAndDisplayCont]}>
                    <View style={[DefaultStyle.centeredYSpaceBetweenX]}>
                        <Text style={[style.Balance]}>Balance</Text>
                        <Btn text={(
                            <FontAwesomeIcon icon="eye" color={Colors.black31} size={18} />
                        )} onPress={() => Alert.alert("Change balance visibility ?")} />
                    </View>
                    <View>
                        <Text style={[style.balanceAmount]}>$ 1,000,000.00</Text>
                    </View>
                </View>
                <Btn text={(
                    <FontAwesomeIcon icon="arrow-right" color={Colors.black31} size={21} />
                )} onPress={() => props.navigation.navigate("Wallet")} />
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
                <View style={style.quickActionBtn}>
                    <Btn text="Send" style={[
                        DefaultStyle.WHSpanParent,
                        {
                            padding : 12,
                        }
                    ]} textStyle={style.quickActionBtnText} onPress={() => {
                        props.navigation.navigate("SendViaInternet")
                    }} />
                </View>
                <View  style={style.quickActionBtn} >
                    <Btn text="Receive" style={[
                            DefaultStyle.WHSpanParent,
                            {
                                padding : 12,
                            }
                    ]} textStyle={style.quickActionBtnText} onPress={() => {
                        props.navigation.navigate("ReceiveViaOnline")
                    }}  />
                </View>
                <View  style={style.quickActionBtn} >
                    <Btn text="Deposit" style={[
                            DefaultStyle.WHSpanParent,
                            {
                                padding : 12,
                            }
                    ]} textStyle={style.quickActionBtnText} />
                </View>
                <View  style={style.quickActionBtn} >
                    <Btn text="Withdrawl" style={[
                            DefaultStyle.WHSpanParent,
                            {
                                padding : 12,
                            }
                    ]} textStyle={style.quickActionBtnText} />
                </View>
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
        backgroundColor : Colors.blackF2,
        height : 124,
        padding : 10,
        borderRadius : 15,
    },
    balanceAmountTextAndDisplayCont : {
        height : "80%",
        flexGrow : 0.7,
        justifyContent : "space-between"
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
    quickActionsHeadingSectionCont : {
        height : 50,
        marginTop : 20,
        borderBottomStyle : "solid",
        borderBottomWidth : 3,
        borderBottomColor : Colors.blackF2
    },
    QuickActions : {
        fontSize : 12,
        color : Colors.black31,
        fontFamily : "Roboto-Medium",
        fontWeight : 300
    },
    quickActionsSectionCont : {
        height : 320,
        marginTop : 30,
        flexDirection : "row",
        flexWrap : "wrap",
        justifyContent : "space-around"
    },
    quickActionBtn : {
        height : 104,
        width : 121,
        margin : 15,
        borderRadius : 7,
        backgroundColor : Colors.blackF2,
        shadowColor: Colors.black,
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 1,
    },
    quickActionBtnText : {
        fontSize : 16,
        color : Colors.black46,
        fontWeight : 300,
        fontFamily : "Comfortaa-Medium"
    }
})

export default Dashboard;