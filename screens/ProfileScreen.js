import React from 'react';
import * as ExampleDataApi from '../apis/ExampleDataApi.js';
import { Icon, ScreenContainer, Touchable, withTheme } from '@draftbit/ui';
import { useIsFocused } from '@react-navigation/native';
import { ActivityIndicator, Image, StyleSheet, Text, View } from 'react-native';
import { Fetch } from 'react-request';

const ProfileScreen = props => {
  const { theme } = props;

  return (
    <ScreenContainer hasSafeArea={false} scrollable={true}>
      <ExampleDataApi.FetchGetUserGET id={3}>
        {({ loading, error, data, refetchGetUser }) => {
          const getASpecificUserData = data;
          if (!getASpecificUserData || loading) {
            return <ActivityIndicator />;
          }

          if (error) {
            return (
              <Text style={{ textAlign: 'center' }}>
                There was a problem fetching this data
              </Text>
            );
          }

          return (
            <>
              <View style={styles.Viewhl} pointerEvents={'auto'}>
                <Image
                  style={[
                    styles.ImageMm,
                    { backgroundColor: theme.colors.background },
                  ]}
                  resizeMode={'cover'}
                  source={{ uri: `${getASpecificUserData?.avatar}` }}
                />
              </View>

              <View style={styles.Viewg3} pointerEvents={'auto'}>
                <View style={styles.View_1E}>
                  <Text style={[styles.TextuW, { color: theme.colors.strong }]}>
                    {getASpecificUserData?.fullName}
                  </Text>
                  <Icon
                    color={theme.colors.custom_rgb0_255_0}
                    size={18}
                    name={'AntDesign/checkcircle'}
                  />
                </View>

                <View style={styles.ViewHd}>
                  <Touchable>
                    <Icon
                      color={theme.colors.medium}
                      size={24}
                      name={'FontAwesome/twitter-square'}
                    />
                  </Touchable>

                  <Touchable>
                    <Icon
                      color={theme.colors.medium}
                      size={24}
                      name={'FontAwesome/google-plus-square'}
                    />
                  </Touchable>

                  <Touchable style={styles.TouchableNn}>
                    <Icon
                      color={theme.colors.medium}
                      size={24}
                      name={'FontAwesome/facebook-square'}
                    />
                  </Touchable>
                </View>

                <Text style={[styles.TextQG, { color: theme.colors.primary }]}>
                  {'About Me'}
                </Text>

                <Text style={[styles.TextRr, { color: theme.colors.strong }]}>
                  {getASpecificUserData?.bio}
                </Text>

                <Text style={[styles.Text_3x, { color: theme.colors.primary }]}>
                  {'Interests'}
                </Text>

                <View style={styles.Viewy7}>
                  <Touchable>
                    <View
                      style={[
                        styles.View_6L,
                        {
                          backgroundColor: theme.colors.divider,
                          borderRadius: theme.roundness,
                        },
                      ]}
                    >
                      <Text
                        style={[styles.TextIx, { color: theme.colors.strong }]}
                      >
                        {'NBA'}
                      </Text>
                    </View>
                  </Touchable>

                  <Touchable>
                    <View
                      style={[
                        styles.ViewPW,
                        {
                          backgroundColor: theme.colors.divider,
                          borderRadius: theme.roundness,
                        },
                      ]}
                    >
                      <Text
                        style={[styles.Text_5j, { color: theme.colors.strong }]}
                      >
                        {'Tacos'}
                      </Text>
                    </View>
                  </Touchable>

                  <Touchable>
                    <View
                      style={[
                        styles.View_0b,
                        {
                          backgroundColor: theme.colors.divider,
                          borderRadius: theme.roundness,
                        },
                      ]}
                    >
                      <Text
                        style={[styles.Textwe, { color: theme.colors.strong }]}
                      >
                        {'Sci-Fi Movies'}
                      </Text>
                    </View>
                  </Touchable>
                </View>
              </View>
            </>
          );
        }}
      </ExampleDataApi.FetchGetUserGET>
      <View pointerEvents={'auto'} />
    </ScreenContainer>
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

export default withTheme(ProfileScreen);