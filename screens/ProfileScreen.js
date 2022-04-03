import React from 'react';
import { ActivityIndicator, Image, StyleSheet, Text, View } from 'react-native';

const ProfileScreen = props => {

  return (
      <View>
          <Text>This is a Profile</Text>
      </View>
  );
};

const styles = StyleSheet.create({
  ImageMm: {
    height: '100%',
    width: '100%',
  },
  Viewhl: {
    flexGrow: 1,
    minHeight: '50%',
    maxHeight: '50%',
    flexShrink: 0,
  },
  TextuW: {
    marginRight: 6,
    fontSize: 18,
    lineHeight: 24,
    fontFamily: 'System',
    fontWeight: '700',
  },
  View_1E: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 18,
  },
  TouchableNn: {
    alignItems: 'center',
  },
  ViewHd: {
    flexDirection: 'row',
    marginTop: 6,
    maxWidth: '25%',
    justifyContent: 'space-between',
  },
  TextQG: {
    textTransform: 'uppercase',
    fontFamily: 'System',
    fontWeight: '400',
    fontSize: 11,
    marginTop: 18,
  },
  TextRr: {
    fontSize: 12,
    lineHeight: 18,
    marginTop: 12,
  },
  Text_3x: {
    marginTop: 16,
    marginTop: 24,
    textTransform: 'uppercase',
    fontFamily: 'System',
    fontWeight: '400',
    fontSize: 11,
  },
  TextIx: {
    fontSize: 10,
    fontFamily: 'System',
    fontWeight: '700',
  },
  View_6L: {
    marginRight: 8,
    paddingBottom: 8,
    paddingTop: 8,
    paddingRight: 16,
    paddingLeft: 16,
  },
  Text_5j: {
    fontSize: 10,
    fontFamily: 'System',
    fontWeight: '700',
  },
  ViewPW: {
    marginRight: 8,
    paddingBottom: 8,
    paddingTop: 8,
    paddingRight: 16,
    paddingLeft: 16,
  },
  Textwe: {
    fontSize: 10,
    fontFamily: 'System',
    fontWeight: '700',
  },
  View_0b: {
    marginRight: 8,
    paddingBottom: 8,
    paddingTop: 8,
    paddingRight: 16,
    paddingLeft: 16,
  },
  Viewy7: {
    flexDirection: 'row',
    marginTop: 12,
  },
  Viewg3: {
    marginLeft: 18,
    marginRight: 18,
    flexGrow: 1,
    flexShrink: 0,
    minHeight: '50%',
  },
});

export default ProfileScreen;