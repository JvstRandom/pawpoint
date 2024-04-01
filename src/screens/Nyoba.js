import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';


const DropdownChoice = () => {
  const [selectedValue, setSelectedValue] = useState('option1');

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Select an option:</Text>
      
      <Text style={styles.selectedValueText}>Selected Value: {selectedValue}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontSize: 20,
    marginBottom: 10,
  },
  selectedValueText: {
    marginTop: 20,
    fontSize: 18,
  },
});

export default DropdownChoice;
