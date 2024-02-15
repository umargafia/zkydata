import { StyleSheet, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import {
  Button,
  ButtonText,
  HStack,
  Heading,
  Link,
  LinkText,
  Text,
  Toast,
  ToastDescription,
  ToastTitle,
  VStack,
} from '@gluestack-ui/themed';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useToast } from '@gluestack-ui/themed';
import * as LocalAuthentication from 'expo-local-authentication';

import MyContainer from '../global/MyContainer';
import MyInput from '../global/MyInput';
import { ColorConstant, WindowConstant } from '../../utilities/Theme';
import { RootStackParamList } from '../../base/NativeStack';
import MyIcon from '../global/MyIcon';
import useCheckFingerPrint from '../../hooks/CheckFingerPrint';
import { sendPostRequest } from '../../utilities/Api';
import { saveEncryptedData } from '../../utilities/SaveData';

type navProps = NativeStackNavigationProp<RootStackParamList, 'login'>;

type responseProp = {
  msg?: string;
  status?: 'success' | 'invalid';
  name?: string;
  phone?: string;
};
const Form = () => {
  const navigation = useNavigation<navProps>();
  const [number, setNumber] = useState<string | undefined>('');
  const [password, setPassword] = useState<string>('');
  const { loginDetails, useFinger, usePassword, setFinger, setUsePassword } =
    useCheckFingerPrint();
  const [error, setError] = useState<{ num: boolean; pass: boolean }>({
    num: false,
    pass: false,
  });
  const [isLoading, setLoading] = useState<boolean>(false);
  const toast = useToast();

  const resetInput = (value: string) => {
    setError((prev) => {
      return {
        ...prev,
        [value]: false,
      };
    });
  };

  const validatesInput = () => {
    if (number?.trim().length !== 11) {
      setError((prev) => {
        return {
          ...prev,
          num: true,
        };
      });
    }
    if (password.trim() === '' || password.trim().length < 8) {
      setError((prev) => {
        return {
          ...prev,
          pass: true,
        };
      });
    }
  };

  const showError = (response: responseProp) => {
    toast.show({
      placement: 'top',
      render: ({ id }) => {
        const toastId = 'toast-' + id;
        return (
          <Toast
            nativeID={toastId}
            width={WindowConstant.width - 20}
            mt={40}
            action="error"
            variant="accent"
          >
            <VStack space="xs">
              <ToastTitle>Login Fail</ToastTitle>
              <ToastDescription>{response?.msg}</ToastDescription>
            </VStack>
          </Toast>
        );
      },
    });
  };

  useEffect(() => {
    if (usePassword) {
      setNumber(loginDetails.number);
    }
  }, [useFinger, loginDetails, usePassword]);
  const handleLogin = async () => {
    validatesInput();

    if (
      number?.trim() === '' ||
      password.trim().length < 8 ||
      number?.trim().length !== 11
    ) {
      return;
    }

    try {
      setLoading(true);
      const response: responseProp = await sendPostRequest(number, password);
      setLoading(false);
      if (response?.status !== 'success') {
        return showError(response);
      }

      await saveEncryptedData(response, password);
      navigation.replace('home', { phone: number, password });
    } catch (error) {}
  };

  const handleBioAuth = async () => {
    try {
      //  authenticate the user using the fingerprint sensor
      const biometricAuth = await LocalAuthentication.authenticateAsync({
        promptMessage: 'Login with Fingerprint',
        disableDeviceFallback: true,
        cancelLabel: 'Cancel',
      });

      if (biometricAuth.success) {
        //if the device authentication is successful login the user automatic
        navigation.replace('home', {
          phone: loginDetails?.number,
          password: loginDetails?.password,
        });
      }
    } catch (error) {
      showError({ msg: 'something went wrong' });
      setFinger(false);
    }
  };

  const handleChangeNumber = () => {
    setNumber('');
    setFinger(false);
    setUsePassword(false);
  };

  return (
    <MyContainer
      style={{
        alignItems: 'center',
        paddingVertical: WindowConstant.width * 0.05,
      }}
    >
      <Heading mb={!usePassword ? '$5' : 0}>Welcome Back!</Heading>
      {usePassword && (
        <>
          <Heading mb="$2" textTransform="capitalize">
            {loginDetails.name}
          </Heading>
          <Link mb="$6" onPress={handleChangeNumber}>
            <LinkText textDecorationLine="none">Change Phone Number</LinkText>
          </Link>
        </>
      )}
      {!usePassword && (
        <MyInput
          text="Phone Number"
          type="phone-pad"
          icon="call"
          value={number}
          isInvalid={error.num}
          onChange={(e) => {
            resetInput('num');
            setNumber(e.nativeEvent.text);
          }}
        />
      )}
      <MyInput
        text="Password"
        password
        value={password}
        icon="lock-closed"
        isInvalid={error.pass}
        helperText="Password should be at least 8 characters"
        onChange={(e) => {
          resetInput('pass');
          setPassword(e.nativeEvent.text);
        }}
      />
      <HStack alignSelf="stretch" mt={'$4'}>
        <Button
          style={styles.button}
          borderRadius={'$md'}
          size="xl"
          mb="$2"
          flex={1}
          bgColor={ColorConstant.primary}
          onPress={handleLogin}
          isDisabled={isLoading}
          elevation="$1"
        >
          <ButtonText>{isLoading ? 'Loading...' : 'Login'}</ButtonText>
        </Button>

        {useFinger && (
          <Button
            size="xl"
            elevation="$1"
            borderRadius={'$md'}
            bgColor={ColorConstant.primary}
            ml={'$3'}
            onPress={handleBioAuth}
          >
            <MyIcon name="finger-print" color="white" />
          </Button>
        )}
      </HStack>
      <TouchableOpacity onPress={() => navigation.navigate('forgetPassword')}>
        <HStack>
          <Text>Forgot your password?</Text>
          <Text color="$blue500"> Recover</Text>
        </HStack>
      </TouchableOpacity>
    </MyContainer>
  );
};

export default Form;

const styles = StyleSheet.create({
  button: {},
});
