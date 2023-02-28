import {
    Text,
} from "react-native";
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import Toast from "react-native-toast-message";
import Colors from "../styles/colors";

const ScanToSendOffline = (props) => {
    return (
        <QRCodeScanner
        onRead={() =>{
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
                Scan the QR-code on the receiver's screen
            </Text>
        }
        topViewStyle={{
            padding : 0
        }}
        />
    )
}

export default ScanToSendOffline;