import React from 'react';
import {Pressable, ScrollView, Text, View} from 'react-native';
import {useTheme} from '@react-navigation/native';

import useStyles from './useStyles';
import useCommonStyles from '@config/useCommonStyles';
import {useAppDispatch, useAppSelector} from '@store/hooks';
import {setTheme, ThemeType} from '@store/slices/other';

const Form = () => {
  const {colors} = useTheme();
  const {theme} = useAppSelector(state => state.other);
  const dispatch = useAppDispatch();
  const commonStyles = useCommonStyles();
  const styles = useStyles();
  return (
    <View
      style={[
        commonStyles.innerContainer,
        {backgroundColor: colors.background},
      ]}>
      <ScrollView
        style={[commonStyles.scrollContainer]}
        contentContainerStyle={[commonStyles.scrollContent, styles.forms]}>
        <View style={styles.items}>
          <View style={[commonStyles.shadow, styles.card]}>
            <Text maxFontSizeMultiplier={1} style={styles.title}>
              Theme
            </Text>
            <View style={styles.radioContainer}>
              {['Light', 'Dark', 'System'].map(item => {
                return (
                  <Pressable
                    key={item}
                    style={styles.radioItem}
                    onPress={() => {
                      dispatch(setTheme(item.toLowerCase() as ThemeType));
                    }}>
                    <View
                      style={[
                        styles.radio,
                        item.toLowerCase() === theme ? styles.active : {},
                      ]}
                    />
                    <Text maxFontSizeMultiplier={1} style={styles.radioLabel}>
                      {item}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Form;
