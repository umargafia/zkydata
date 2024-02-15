import { NativeSyntheticEvent, TextInputChangeEventData } from 'react-native';
import { KeyboardTypeOptions } from 'react-native';
import React from 'react';
import {
  FormControl,
  FormControlHelper,
  FormControlHelperText,
  FormControlLabel,
  FormControlLabelText,
  Input,
  InputField,
} from '@gluestack-ui/themed';
import MyIcon from './MyIcon';

type props = {
  text?: string;
  value?: string;
  password?: boolean;
  helperText?: string;
  type?: KeyboardTypeOptions;
  icon?: string;
  onChange?:
    | ((e: NativeSyntheticEvent<TextInputChangeEventData>) => void)
    | undefined;
  isInvalid?: boolean;
};
const MyInput: React.FC<props> = ({
  text,
  password,
  value,
  helperText,
  type,
  icon,
  onChange,
  isInvalid,
}) => {
  return (
    <FormControl
      isDisabled={false}
      isInvalid={isInvalid}
      isReadOnly={false}
      isRequired={true}
      alignSelf="stretch"
      mt={-15}
    >
      <FormControlLabel>
        <FormControlLabelText textTransform="capitalize">
          {text}
        </FormControlLabelText>
      </FormControlLabel>
      <Input rounded="$lg" alignItems="center" pl={3} size="xl">
        <MyIcon name={icon} size={25} />
        <InputField
          type={password ? 'password' : 'text'}
          value={value}
          keyboardType={type}
          onChange={onChange}
          placeholder={text}
        />
      </Input>
      <FormControlHelper>
        <FormControlHelperText>{helperText}</FormControlHelperText>
      </FormControlHelper>
    </FormControl>
  );
};

export default MyInput;
