import React from 'react';
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
  Keyboard,
} from 'react-native';
import {useTheme} from '@react-navigation/native';

import useStyles from './useStyles';
import useCommonStyles from '@config/useCommonStyles';
import OptimizedScene from '@components/optimizedScene';

import Header from '@components/header';
import CustomStatusBar from '@components/customStatusBar';
import useGetTheme from '@utils/useGetTheme';
import InputStructure from '@src/components/inputStructure/inputStructure';
import useCreateEditAddressState from './useCreateEditAddressState';

const CreateEditAddress = (props: any) => {
  const {colors} = useTheme();
  const commonStyles = useCommonStyles();
  const styles = useStyles();
  const {isDark} = useGetTheme();
  const {
    errors,
    touched,
    setFieldValue,
    setFieldTouched,
    values,
    loading,
    handleSubmit,
  } = useCreateEditAddressState(props);

  return (
    <>
      <CustomStatusBar
        color={colors.background}
        barStyle={isDark ? 'light-content' : 'dark-content'}
      />
      <OptimizedScene>
        <View
          style={[
            commonStyles.container,
            {backgroundColor: colors.background},
          ]}>
          <Header title={'Create Address'} />
          <ScrollView
            keyboardDismissMode="interactive"
            keyboardShouldPersistTaps="handled"
            style={[styles.container]}
            contentContainerStyle={styles.contentContainer}>
            <InputStructure
              label={'Address Title'}
              error={
                errors.address_title && touched.address_title
                  ? errors.address_title
                  : ''
              }>
              <TextInput
                maxFontSizeMultiplier={1}
                placeholder={'Address Title'}
                style={styles.input}
                placeholderTextColor={colors.border}
                value={values.address_title}
                onChangeText={(v: string) => {
                  setFieldValue('address_title', v);
                }}
                onBlur={() => {
                  setFieldTouched('address_title');
                }}
              />
            </InputStructure>
            <InputStructure
              label={'Addres Line 1'}
              error={
                errors.address_line1 && touched.address_line1
                  ? errors.address_line1
                  : ''
              }>
              <TextInput
                maxFontSizeMultiplier={1}
                placeholder={'Addres Line 1'}
                style={styles.input}
                placeholderTextColor={colors.border}
                value={values.address_line1}
                onChangeText={(v: string) => {
                  setFieldValue('address_line1', v);
                }}
                onBlur={() => {
                  setFieldTouched('address_line1');
                }}
              />
            </InputStructure>
            <InputStructure
              label={'Addres Line 2'}
              error={
                errors.address_line2 && touched.address_line2
                  ? errors.address_line2
                  : ''
              }>
              <TextInput
                maxFontSizeMultiplier={1}
                placeholder={'Addres Line 2'}
                style={styles.input}
                placeholderTextColor={colors.border}
                value={values.address_line2}
                onChangeText={(v: string) => {
                  setFieldValue('address_line2', v);
                }}
                onBlur={() => {
                  setFieldTouched('address_line2');
                }}
              />
            </InputStructure>
            <InputStructure
              label={'City'}
              error={errors.city && touched.city ? errors.city : ''}>
              <TextInput
                maxFontSizeMultiplier={1}
                placeholder={'City'}
                style={styles.input}
                placeholderTextColor={colors.border}
                value={values.city}
                onChangeText={(v: string) => {
                  setFieldValue('city', v);
                }}
                onBlur={() => {
                  setFieldTouched('city');
                }}
              />
            </InputStructure>
            <InputStructure
              label={'State'}
              error={errors.state && touched.state ? errors.state : ''}>
              <TextInput
                maxFontSizeMultiplier={1}
                placeholder={'State'}
                style={styles.input}
                placeholderTextColor={colors.border}
                value={values.state}
                onChangeText={(v: string) => {
                  setFieldValue('state', v);
                }}
                onBlur={() => {
                  setFieldTouched('state');
                }}
              />
            </InputStructure>
            <InputStructure
              label={'Country'}
              error={errors.country && touched.country ? errors.country : ''}>
              <TextInput
                maxFontSizeMultiplier={1}
                placeholder={'Country'}
                style={styles.input}
                placeholderTextColor={colors.border}
                value={values.country}
                onChangeText={(v: string) => {
                  setFieldValue('country', v);
                }}
                onBlur={() => {
                  setFieldTouched('country');
                }}
              />
            </InputStructure>
            <InputStructure
              label={'Pincode'}
              error={errors.pincode && touched.pincode ? errors.pincode : ''}>
              <TextInput
                maxFontSizeMultiplier={1}
                placeholder={'Pincode'}
                style={styles.input}
                placeholderTextColor={colors.border}
                value={values.pincode}
                onChangeText={(v: string) => {
                  setFieldValue('pincode', v);
                }}
                onBlur={() => {
                  setFieldTouched('pincode');
                }}
              />
            </InputStructure>
            <InputStructure
              label={'Phone'}
              error={errors.phone && touched.phone ? errors.phone : ''}>
              <TextInput
                maxFontSizeMultiplier={1}
                placeholder={'Phone'}
                style={styles.input}
                placeholderTextColor={colors.border}
                value={values.phone}
                onChangeText={(v: string) => {
                  setFieldValue('phone', v);
                }}
                onBlur={() => {
                  setFieldTouched('phone');
                }}
              />
            </InputStructure>

            <View style={styles.bottom}>
              <Pressable
                style={[styles.btnContainer, styles.btnStyle]}
                android_ripple={{
                  radius: 20,
                  borderless: true,
                  color: colors.white,
                }}
                onPress={() => {
                  Keyboard.dismiss();
                  handleSubmit();
                }}>
                {loading ? (
                  <ActivityIndicator color={colors.white} size="small" />
                ) : (
                  <Text maxFontSizeMultiplier={1} style={[styles.btnTitle]}>
                    Submit
                  </Text>
                )}
              </Pressable>
            </View>
          </ScrollView>
        </View>
      </OptimizedScene>
    </>
  );
};

export default CreateEditAddress;
