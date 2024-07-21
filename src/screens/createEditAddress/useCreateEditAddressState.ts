import {useEffect, useState} from 'react';
import * as Yup from 'yup';
import {useDebouncedCallback} from 'use-debounce';
import {FormikHelpers, useFormik} from 'formik';
import AddressService, {AddressType} from '@src/services/address.service';
import showToast from '@src/utils/showToast';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '@src/navigations/routes';

function useCreateEditAddressState(props: any) {
  const [loading, setLoading] = useState(false);
  const {goBack} = useNavigation<StackNavigationProp<RootStackParamList>>();

  const AddressSchema = Yup.object().shape({
    address_title: Yup.string().required('Address Title is Required'),
    address_line1: Yup.string().required('Address Line 1 is Required'),
    address_line2: Yup.string().required('Address Line 2 is Required'),
    city: Yup.string().required('City is Required'),
    state: Yup.string().required('State is Required'),
    country: Yup.string().required('Country is Required'),
    address_type: Yup.string().required('Address Type is Required'),
    pincode: Yup.string().required('Pincode is Required'),
    phone: Yup.string()
      .matches(
        /([0-9\ \+\_\-\,\.\*\#\(\)]){1,20}$/,
        'Please enter a valid Phone number',
      )
      .required('Phone is Required'),
  });

  const onSubmit = async (
    values: AddressType,
    {setSubmitting, resetForm, setErrors}: FormikHelpers<AddressType>,
  ) => {
    try {
      let res: any;
      if (props.route?.params?.address) {
        res = await AddressService.updateAddress({
          ...values,
          name: props.route.params.address.name,
        });
      } else {
        res = await AddressService.addAddress(values);
      }
      if (res.status_code === 200) {
        showToast(
          props.route?.params?.address ? 'Address Updated' : 'Address Added',
        );
        resetForm();
        goBack();
      } else if (res.status_code === 403) {
        setErrors({
          address_title: res.data.address_title,
          address_line1: res.data.address_line1,
          address_line2: res.data.address_line2,
          city: res.data.city,
          state: res.data.state,
          country: res.data.country,
          address_type: res.data.address_type,
          pincode: res.data.pincode,
          phone: res.data.phone,
        });
      } else {
        throw new Error(res.message);
      }
    } catch (err: any) {
      showToast(err.message || 'Something went wrong');
    } finally {
      setSubmitting(false);
    }
  };

  const debouncedSubmit = useDebouncedCallback(onSubmit, 300);

  const {
    handleChange,
    setFieldTouched,
    values,
    handleSubmit,
    touched,
    errors,
    setFieldValue,
    setValues,
  } = useFormik({
    initialValues: {
      address_title: '',
      address_line1: '',
      address_line2: '',
      city: '',
      state: '',
      country: '',
      address_type: props.route?.params?.addressType || 'Billing',
      pincode: '',
      phone: '',
    },
    validationSchema: AddressSchema,
    onSubmit: debouncedSubmit,
  });

  useEffect(() => {
    if (props.route?.params?.address) {
      let copy = props.route.params.address;
      setValues({
        address_title: copy.address_title,
        address_line1: copy.address_line1,
        address_line2: copy.address_line2,
        city: copy.city,
        state: copy.state,
        country: copy.country,
        address_type: copy.address_type,
        pincode: copy.pincode,
        phone: copy.phone,
      });
    }
  }, [props.route?.params?.address, setValues]);

  return {
    loading,
    handleChange,
    setFieldTouched,
    values,
    handleSubmit,
    touched,
    errors,
    setFieldValue,
    setLoading,
  };
}

export default useCreateEditAddressState;
