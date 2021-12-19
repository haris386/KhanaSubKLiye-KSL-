import React from 'react';
import { StyleSheet, View,TouchableOpacity} from 'react-native';
import Login from './Components/Auth/Login';
import SignUp from './Components/Auth/SignUp'
import DB from './Components/DashBoard/DB'
import Loader from './Components/Loader/Loader';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { auth, signOut } from "./firebaseConfig"
import { ToastAndroid } from "react-native";
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();

function LogOut() {
  signOut(auth).then(() => {
    ToastAndroid.show('LogOut', ToastAndroid.SHORT);
    navigation.goBack('Login')
    // Sign-out successful.
  }).catch((error) => {
    // An error happened.
  });
}

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} options={{
          headerShown: false,
        }} />
        <Stack.Screen name="SignUp" component={SignUp} options={{
          headerShown: false,
        }} />
        <Stack.Screen name="Loader" component={Loader} options={{
          headerShown: false,
        }} />
        <Stack.Screen name="DB" component={DB} options={{
           headerRight: () => {
            return (
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <TouchableOpacity style={{ marginHorizontal: 4 }}>
                  <Ionicons name="log-out" size={30} color="black" onPress={LogOut}/>
                </TouchableOpacity>

              </View>
            )
          },
          headerBackVisible: false, title: 'Welcome to KSL', headerTitleAlign: 'center'
        }}  />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
