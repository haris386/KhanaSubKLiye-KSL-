import logo from '../../images/KSLLogo.png'
import { auth, createUserWithEmailAndPassword, db, doc, setDoc } from "../../firebaseConfig"
import React, { useState } from 'react';
import {
  Box,
  VStack,
  Text,
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


export default function SignUp({ navigation }) {
  const [username, setUserName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')


  const SignUpData = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        setDoc(doc(db, "users", user.uid), {
          username: username,
          email: email,
          User: true,
          isSubmitted: false,
          isAccepted: false
        })
        console.log(user)
        ToastAndroid.show('Successfully Signed Up', ToastAndroid.SHORT)
        navigation.navigate('Login')
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        ToastAndroid.show(errorMessage, ToastAndroid.SHORT)
        console.log(errorCode, '/n', errorMessage)
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
              <FormControl.Label>Name</FormControl.Label>
              <Input value={username}
                onChangeText={text => setUserName(text)} />
            </FormControl>
            <FormControl>
              <FormControl.Label>Email ID</FormControl.Label>
              <Input value={email}
                onChangeText={text => setEmail(text)} />
            </FormControl>
            <FormControl>
              <FormControl.Label>Password</FormControl.Label>
              <Input type="password" secureTextEntry={true}
                value={password}
                onChangeText={text => setPassword(text)}
                placeholder="Password" />
            </FormControl>
            <HStack justifyContent="center">
              <Text
                fontSize="sm"
                color="coolGray.600"
                _dark={{
                  color: "warmGray.200",
                }}
              >
                Already a member?{" "}
              </Text>
              <Link
                _text={{
                  color: "indigo.500",
                  fontWeight: "medium",
                  fontSize: "sm",
                }}
                onPress={() => navigation.navigate('Login')}
              >
                Login
              </Link>
            </HStack>
            <Button
              style={{ width: '50%', borderRadius: 50, marginHorizontal: '25%' }}
              colorScheme='green'
              endIcon={<Icon as={Ionicons} name="checkmark-done-sharp" size="md" />}
              onPress={SignUpData}
            >
              Sign Up
            </Button>
          </VStack>
        </Box>
      </Center>
    </NativeBaseProvider>

  )
}
