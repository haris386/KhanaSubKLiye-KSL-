import logo from '../../images/KSLLogo.png'
import { auth, signInWithEmailAndPassword } from "../../firebaseConfig"

import React, { useState } from 'react';
import {
  Box,
  Text,
  VStack,
  FormControl,
  Input,
  Link,
  Button,
  HStack,
  Center,
  NativeBaseProvider,
  Image,
  Icon,
} from "native-base"
import { Ionicons } from "@expo/vector-icons"
import { ToastAndroid } from "react-native";


export default function Login({ navigation }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const LoginData = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user, 'signed in succesfully!')
        ToastAndroid.show('Please wait a moment', ToastAndroid.SHORT)
        navigation.navigate('DB')

      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        ToastAndroid.show(errorMessage, ToastAndroid.SHORT)
        console.log(errorMessage)
      });

  }


  return (
    <NativeBaseProvider>
      <Center flex={1} >
        <Box safeArea p="2" py="8" w="100%" maxW="290">
          <Image
            size={300}
            resizeMode={"contain"}
            borderRadius={500}
            source={logo}
            alt="KSL Logo"
          />
          <VStack space={3}>
            <FormControl>
              <FormControl.Label>Email ID</FormControl.Label>
              <Input value={email}
                onChangeText={text => setEmail(text)} />
            </FormControl>
            <FormControl>
              <FormControl.Label>Password</FormControl.Label>
              <Input type="password" secureTextEntry={true}
                placeholder="Password"
                value={password}
                onChangeText={text => setPassword(text)} />
            </FormControl>
            <HStack justifyContent="center">
              <Text
                fontSize="sm"
                color="coolGray.600"
                _dark={{
                  color: "warmGray.200",
                }}
              >
                Not a member?{" "}
              </Text>
              <Link
                _text={{
                  color: "indigo.500",
                  fontWeight: "medium",
                  fontSize: "sm",
                }}
                onPress={() => navigation.navigate('SignUp')}
              >
                Sign Up
              </Link>
            </HStack>
            <Button
              style={{ width: '50%', borderRadius: 50, marginHorizontal: '25%' }}
              colorScheme='green'
              endIcon={<Icon as={Ionicons} name="log-in" size="md" />}
              onPress={LoginData}
            >
              Login
            </Button>
          </VStack>
        </Box>
      </Center>
    </NativeBaseProvider>

  )
}
