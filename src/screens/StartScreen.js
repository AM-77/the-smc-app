import React from 'react';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Button from '../components/Button';
import Paragraph from '../components/Paragraph';

export default function StartScreen({ navigation }) {
  return (
    <Background>
      <Logo />
      <Header>The Students Message Club</Header>
      <Paragraph>
        The best education isn’t given to students it is drawn out of them !
      </Paragraph>
      <Button
        mode="contained"
        onPress={() => navigation.navigate('LoginScreen')}
      >
        Admin area
      </Button>
      <Button
        mode="outlined"
        onPress={() => navigation.navigate('ScaningScreen')}
      >
        Scan a budge
      </Button>
    </Background>
  );
}
