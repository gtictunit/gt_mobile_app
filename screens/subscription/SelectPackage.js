import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Image, Text, Dimensions, SafeAreaView, Button } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';

const { width, height } = Dimensions.get('window');

function SelectPackage(props) {

  const email = props.navigation.getParam('email');
  const mobile = props.navigation.getParam('mobile');
  const user = props.navigation.getParam('name');

  const Separator = () => (
    <View style={styles.separator} />
  );


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.icon}>
        <Ionicons
          name="arrow-back"
          size={height / 30}
          color='black'
          onPress={() => props.navigation.goBack()}
        />
      </View>


      <View>
        <Text style={styles.title}>
          MONTHLY SUBSCRIPTION
        </Text>
        <Button
          title="Monthly - ₦500"
          onPress={() => 
            props.navigation.navigate('PaySubscription', {
            amount: "500.0",
            email: email,
            mobile: mobile,
            name: user,
          })}
        />
      </View>
      <Separator />
      <View>
        <Text style={styles.title}>
          QUARTERLY SUBSCRIPTION
        </Text>
        <Button
          title="Quarterly - ₦1300"
          color="#f194ff"
          onPress={() => 
            props.navigation.navigate('PaySubscription', {
            amount: "1300.0",
            email: email,
            mobile: mobile,
            name: user,
          })}
        />
      </View>
      <Separator />
      <View>
        <Text style={styles.title}>
          YEARLY SUBSCRIPTION
        </Text>
        <Button
          title="Yearly - ₦5000"
          disabled
          onPress={() => 
            props.navigation.navigate('PaySubscription', {
            amount: "5000.0",
            email: email,
            mobile: mobile,
            name: user,
          })}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 16,
  },
  title: {
    textAlign: 'center',
    marginVertical: 8,
  },
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});

export default SelectPackage;
