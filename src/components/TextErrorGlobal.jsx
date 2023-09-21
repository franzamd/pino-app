import React from 'react';
import PropTypes from 'prop-types';
import {View, Text, StyleSheet} from 'react-native';

const TextErrorGlobal = ({error}) => {
  return (
    <>
      {error && typeof error === 'string' && (
        <View style={styles.errorSection}>
          <Text style={styles.errorTextColor}>{error}</Text>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  errorSection: {
    marginTop: 20,
    alignItems: 'center',
  },
  errorTextColor: {
    color: 'red',
  },
});

TextErrorGlobal.propTypes = {
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.bool, PropTypes.object]),
};

TextErrorGlobal.defaultProps = {
  error: null,
};

export default TextErrorGlobal;
