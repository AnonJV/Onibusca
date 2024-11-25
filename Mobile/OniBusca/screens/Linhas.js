import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Linhas = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.info}>Olá</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f4f4f4',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    color: '#3C554F',
  },
  info: {
    fontSize: 18,
    marginBottom: 10,
  },
});

export default Linhas;