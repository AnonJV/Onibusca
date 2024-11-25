import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const Top = () => {
  return (
    <View style={styles.header}>
      <Image
        source={require('../assets/LogoOniBusca.png')}
        style={styles.logo}
      />
      <View style={styles.profileContainer}>
        <Image
          source={require('../assets/user.png')}
          style={styles.image}
        />
        <Text style={styles.profileText}>Meu perfil</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  logo: {
    width: 60,
    height: 60,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 30,
    height: 30,
    marginRight: 5,
  },
  profileText: {
    fontSize: 16,
  },
});

export default Top;