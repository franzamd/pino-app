import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet} from 'react-native';
import {Input, FormControl, Icon, Text} from 'native-base';

const InputGroup = ({
  label,
  handleInput,
  error,
  value,
  secureTextEntry,
  type,
  rows,
}) => {
  return (
    <>
      <FormControl.Label>{label}</FormControl.Label>
      <Input
        type={type}
        onChangeText={handleInput}
        secureTextEntry={secureTextEntry}
        value={value}
        w="100%"
        numberOfLines={rows}
      />
      <Icon name="close" tintColor="red"></Icon>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </>
  );
};

const styles = StyleSheet.create({
  errorText: {
    color: 'red',
    marginLeft: 16,
  },
});

InputGroup.propTypes = {
  label: PropTypes.string,
  handleInput: PropTypes.func,
  messageError: PropTypes.string,
  secureTextEntry: PropTypes.bool,
  type: PropTypes.string,
};

InputGroup.defaultProps = {
  label: '',
  handleInput: null,
  value: '',
  rows: 1,
  type: 'text',
  error: false,
  messageError: '',
  secureTextEntry: false,
};

export default InputGroup;
