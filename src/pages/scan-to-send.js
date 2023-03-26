import {useRef} from "react";
import {
    Text,
} from "react-native";
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import Toast from "react-native-toast-message";
import Colors from "../styles/colors";

const ScanToSendOffline = (props) => {
    const scannerRef = null;
    return (
        <QRCodeScanner
        onRead={(event) =>{
                let e = event.data
                try {
                    if(JSON.parse(e).key == "stackion-user-receive-via-offline") {
                        Toast.show({
                            type: 'success',
                            text1: 'Scanned',
                            text2: 'You are ready to send offline tokens 🙌'
                        });
                        props.navigation.navigate("SendOffline",{qrdata : JSON.parse(e)});
                    }
                    else {
                        Toast.show({
                            type: 'info',
                            text1: 'Opps',
                            text2: 'The code you scanned is not valid'
                        }); 
                        scannerRef.current.reactivate()
                    }
                }
                catch(error) {
                    Toast.show({
                        type: 'info',
                        text1: 'Opps',
                        text2: 'The code you scanned is not valid'
                    });
                    scannerRef.current.reactivate()
                }
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
        ref={scannerRef}
        />
    )
}

export default ScanToSendOffline;