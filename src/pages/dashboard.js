import { useCallback } from "react";
import {
    Text,
    View,
    StyleSheet,
    Alert,
    BackHandler
} from "react-native";
import Toast from 'react-native-toast-message';
import { useFocusEffect } from '@react-navigation/native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import Colors from "../styles/colors";
import DefaultStyle from "../styles/defaults";
import {Btn} from "../components/button";
import InAppHBF from "../components/in-app-h-b-f";

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
            return false;
          }
        };
  
        BackHandler.addEventListener('hardwareBackPress', onBackPress);
  
        return () => BackHandler.removeEventListener('hardwareBackPress', onBackPress);
      }, [])
    );
  
    return (
        <InAppHBF activePage="home" navigation={props.navigation}  headerTitleText={"Hey, John!"} whenHeaderMenuBtnIsPressed={() => Alert.alert("Open menu ?")} >
            <View style={[style.dashboardAssetValueDisplayRect, style.contentsInBodyCont]}>
                <View style={[DefaultStyle.centeredX]}>
                    <Text style={[style.Balance]}>Balance</Text>
                </View>
                <View style={[DefaultStyle.centeredX]}>
                    <Text style={[style.balanceAmount]}>$ 1,000,000.00</Text>
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
                <View style={[style.quickActionBtn, {
                            backgroundColor : "#0052cc"
                    }]} >
                    <Btn text={
                        (
                            <>
                            <Text style={style.quickActionBtnTextContents}>Send</Text>
                            <Text style={style.quickActionBtnTextContents} >
                                <FontAwesomeIcon icon="paper-plane" size={20} color={Colors.white} />
                            </Text>
                            </>
                        )
                    } style={[
                        DefaultStyle.WHSpanParent,
                        {
                            padding : 12,
                        }
                    ]} textStyle={style.quickActionBtnText} onPress={() => {
                        props.navigation.navigate("SendViaInternet")
                    }} />
                </View>
                <View  style={[style.quickActionBtn, {
                                backgroundColor : "#4da6ff"
                    }]} >
                    <Btn text="Receive" style={[
                            DefaultStyle.WHSpanParent,
                            {
                                padding : 12,
                            }
                    ]} textStyle={style.quickActionBtnText} onPress={() => {
                        props.navigation.navigate("ReceiveViaOnline")
                    }}  />
                </View>
                <View  style={[style.quickActionBtn, {
                                backgroundColor : "#0066ff"
                    }]} >
                    <Btn text="Deposit" style={[
                            DefaultStyle.WHSpanParent,
                            {
                                padding : 12,
                            }
                    ]} textStyle={style.quickActionBtnText} />
                </View>
                <View  style={[style.quickActionBtn, {
                                backgroundColor : "#0047b3"
                    }]} >
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
        justifyContent : "center"
    },
    quickActionBtn : {
        height : 104,
        width : 121,
        margin : 15.5,
        borderRadius : 7,
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
        fontSize : 16,
        color : Colors.white,
        fontWeight : 300,
        fontFamily : "Comfortaa-Medium",
    },
    quickActionBtnTextContents : {
        margin : 2
    }
})

export default Dashboard;