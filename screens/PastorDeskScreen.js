import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Dimensions, FlatList, AsyncStorage} from 'react-native';

const {width, height} = Dimensions.get('window');

import HTMLView from 'react-native-htmlview';

function PastorDeskScreen (props) {



    return(
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>{props.title}</Text>
            <Text>{props.date}</Text>
            <HTMLView value={props.content} />
        </View>
    );
}

export default PastorDeskScreen;