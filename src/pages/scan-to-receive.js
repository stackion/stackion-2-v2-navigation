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
        try {
            receipt = JSON.parse(receipt);
            if(receipt.key == "stackion-offline-token") {
                const userSession = await encryptedStorage.getItem("user_session");
                if(userSession) {
                    let parsedSession = JSON.parse(userSession);
                    let offlineBalance = parsedSession.offline_token_balance;
                    if(receipt.username == parsedSession.user_online_data.username && receipt.receiverDeviceId == parsedSession.device_id) {
                        let offlineReceipts = parsedSession.receipts_db;
                        if(offlineReceipts.some(e => e.receipt_id == receipt.receipt_id)) {
                            Toast.show({
                                type: 'error',
                                text1: 'Failed attempt, can not be reused',
                                text2: 'This receipt has been previously added to your offline balance'
                            });
                        }
                        else {
                            offlineBalance += receipt.amount;
                            parsedSession.offline_token_balance = offlineBalance;
                            parsedSession.receipts_db.push(receipt);
                            await encryptedStorage.setItem("user_session", JSON.stringify(parsedSession));
                            Toast.show({
                                type: 'success',
                                text1: 'Transaction successful',
                                text2: 'Your newly received offline tokens has been stored'
                            });
                            props.navigation.navigate("Dashboard");
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
        catch(err) {
            //The error likely to be generated is related to trying to parse a non STRINGIFIED JSON data or a data that is not in json format.
            Toast.show({
                type: 'error',
                text1: 'Processing error',
                text2: 'An error occured while processing the QR-code you scanned'
            });
        }
    }
    return (
        <QRCodeScanner
        onRead={(e) =>{
            storeReceivedOfOfflineTokens(e);
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