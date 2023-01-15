import React from 'react';
import  { Paystack }  from 'react-native-paystack-webview';
import { View } from 'react-native';
import { WEB_URL, PAYSTACK_KEY } from '../../constant/urls';

function PaySubscription(props) {
    const email = props.navigation.getParam('email');
    const mobile = props.navigation.getParam('mobile');
    const user = props.navigation.getParam('name');
    const amount = props.navigation.getParam('amount');


  return (
    <View style={{ flex: 1 }}>
      <Paystack  
        paystackKey={PAYSTACK_KEY}
        amount={amount}
        billingEmail={email}
        billingMobile={mobile}
        billingName={user}
        activityIndicatorColor="green"
        onCancel={(e) => {
            props.navigation.navigate('Profile')
        }}
        onSuccess={(res) => {
          // handle response here
        }}
        autoStart={true}
        channels={["card","bank","ussd"]}
      />
    </View>
  );
}

export default PaySubscription;