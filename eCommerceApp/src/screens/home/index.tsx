import {Text} from 'react-native';
import React from 'react';
import Layout from 'layout';
import SignIn from 'screens/signin';

export default function Home() {
  return (
    <Layout>
      <Text>Home</Text>
      <SignIn />
    </Layout>
  );
}
