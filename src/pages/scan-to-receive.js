import {useState} from "react";
import {
    Text
} from "react-native";
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import Toast from "react-native-toast-message";
import Colors from "../styles/colors";
import * as encryptedStorage from "../functions/encrypted-storage";

const ScanToReceive = (props) => {
    const storeReceivedOfOfflineTokens = async (receipt) => {
        receipt = JSON.parse(receipt);
        if(receipt.key == "stackion-offline-token") {
            const userSession = await encryptedStorage.getItem("user_session");
            if(userSession) {
                let parsedSession = JSON.parse(userSession);
                let offlineBalance = parsedSession.ofline_token_balance;
                if(receipt.username == parsedSession.user_online_data.username && receipt.receiverDeviceId == parsedSession.device_id) {
                    let offlineReceipts = [parsedSession.receipts_db];
                    if(offlineReceipts.some(e => e.receiptId == receipt.receiptId)) {
                        //-
                    }
                    else {
                        Toast.show({
                            type: 'error',
                            text1: 'Failed attempt, can not be reused',
                            text2: 'This receipt has been previously added to your offline balance'
                        });
                    }
                }
                else if(receipt.username == parsedSession.user_online_data.username && receipt.receiverDeviceId != parsedSession.device_id) {
                    Toast.show({
                        type: 'error',
                        text1: 'Opps! Wrong device',
                        text2: 'This receipt is tied to the device the sender scanned at first'
                    });
                }
                else {
                    Toast.show({
                        type: 'error',
                        text1: 'Failed attempt',
                        text2: 'This receipt is not meant for you'
                    });
                }
                offlineBalance += receipt.amount;
                parsedSession.ofline_token_balance = offlineBalance;
                parsedSession.receipts_db.push(receipt);
            }
        }
        else {
            Toast.show({
                type: 'info',
                text1: 'Opps!',
                text2: 'The code you scaned is not a valid QR-receipt'
            });
        }
    }
    return (
        <QRCodeScanner
        onRead={(e) =>{
                Toast.show({
                    type: 'success',
                    text1: 'Scanned',
                    text2: 'Your have received offline tokens 🙌'
                });
        }}
        containerStyle={{backgroundColor : Colors.white}}
        permissionDialogTitle="😪"
        permissionDialogMessage="Need camera permission to scan"
        showMarker={true}
        markerStyle={{
            borderColor : Colors.defaultBlue,
            borderRadius : 10
        }}
        flashMode={RNCamera.Constants.FlashMode.auto}
        topContent={
            <Text style={{textAlign : "center"}}>
                Scan the QR-code receipt on the sender's screen
            </Text>
        }
        topViewStyle={{
            padding : 0
        }}
        />
    )
}

export default ScanToReceive;