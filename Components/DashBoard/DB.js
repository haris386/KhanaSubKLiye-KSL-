import React, { useState } from 'react'
import {
    Text,
    VStack,
    FormControl,
    Input,
    NativeBaseProvider,
    Center,
    ScrollView,
    CheckIcon,
    Select,
    Button
} from "native-base";
import { ToastAndroid} from "react-native";

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { auth, onAuthStateChanged, doc, getDoc, db, updateDoc } from '../../firebaseConfig'
import QRC from '../QRCODE/QRC';

import { View } from 'react-native';

function FormSceen() {
    const [userUID, setUserUID] = useState('')

    onAuthStateChanged(auth, (user) => {
        if (user) {
            const uid = user.uid;
            setUserUID(uid)
        } else {
            // User is signed out
            // ...
        }
    });
    const [formData, setData] = React.useState({});
    // const [helpType, setHelpType] = React.useState("")
    // const [dailyhelp, setDailyhelp] = React.useState("")

    const docRef = doc(db, "users", userUID || "uids");
    const update = async () => {
        await updateDoc(docRef, {
            formData
        });
        ToastAndroid.show('Submitted', ToastAndroid.SHORT)
    }


    return (

        <NativeBaseProvider>
            <ScrollView>
                <Center flex={1} safeAreaTop>
                    <VStack width="85%" mx="3">
                        <FormControl isRequired>
                            <FormControl.Label _text={{ bold: true }}>Enter Name</FormControl.Label>
                            <Input
                                placeholder="Abc"
                                onChangeText={(value) => setData({ ...formData, name: value })}
                            />
                            <FormControl.HelperText _text={{ fontSize: 'xs' }}>
                                Enter the name.
                            </FormControl.HelperText>
                            <FormControl.Label _text={{ bold: true }}>Father Name</FormControl.Label>
                            <Input
                                placeholder="John"
                                onChangeText={(value) => setData({ ...formData, fatherName: value })}
                            />
                            <FormControl.HelperText _text={{ fontSize: 'xs' }}>
                                Enter father name.
                            </FormControl.HelperText>
                            <FormControl.Label _text={{ bold: true }}>CNIC number</FormControl.Label>
                            <Input
                                placeholder="*****-*******-*"
                                onChangeText={(value) => setData({ ...formData, CNIC: value })}
                            />
                            <FormControl.HelperText _text={{ fontSize: 'xs' }}>
                                CNIC number should contain 15 Numbers.
                            </FormControl.HelperText>
                            <FormControl.Label _text={{ bold: true }}>Date of Birth</FormControl.Label>
                            <Input
                                placeholder="dd/mm/yyyy"
                                onChangeText={(value) => setData({ ...formData, DOB: value })}
                            />
                            <FormControl.HelperText _text={{ fontSize: 'xs' }}>
                                Enter Date Of Birth                     </FormControl.HelperText>
                            <FormControl.Label _text={{ bold: true }}>Number of
                                family members</FormControl.Label>
                            <Input
                                placeholder="1,2,3..."
                                onChangeText={(value) => setData({ ...formData, noFM: value })}
                            />

                            <FormControl.Label _text={{ bold: true }}>Monthly Income</FormControl.Label>
                            <Input
                                placeholder="000000"
                                onChangeText={(value) => setData({ ...formData, income: value })}
                            />
                            <FormControl.HelperText _text={{ fontSize: 'xs' }}>
                                Enter you monthly income.
                            </FormControl.HelperText>
                            <Select
                                selectedValue={formData.HelpType}
                                minWidth="200"
                                accessibilityLabel="Choose Help Type"
                                placeholder="Choose Help Type"
                                _selectedItem={{
                                    bg: "teal.600",
                                    endIcon: <CheckIcon size="5" />,
                                }}
                                mt={1}
                                onValueChange={(itemValue) => setData({ ...formData, HelpType: itemValue })}

                            >
                                <Select.Item label="Monthly Ration" value="Monthly Ration" />
                                <Select.Item label="Daily" value="Daily" />
                            </Select>
                            <Select
                                selectedValue={formData.DailyHelpType}
                                minWidth="200"
                                accessibilityLabel="Choose Help Type"
                                placeholder="If Daily Choose Time"
                                _selectedItem={{
                                    bg: "teal.600",
                                    endIcon: <CheckIcon size="5" />,
                                }}
                                mt={1}
                                onValueChange={(itemValue) => setData({ ...formData, DailyHelpType: itemValue })}

                            >
                                <Select.Item label="1" value="1" />
                                <Select.Item label="2" value="2" />
                                <Select.Item label="3" value="3" />

                            </Select>
                            <Button
                                variant="subtle"
                                colorScheme="green"
                                onPress={update}  >
                                Submit Application
                            </Button>
                        </FormControl>
                    </VStack>
                </Center>
            </ScrollView>
        </NativeBaseProvider>
    );
}


const Tab = createMaterialTopTabNavigator();

export default function DB({ navigation }) {
    const [userUID, setUserUID] = useState("Fetching...")

    onAuthStateChanged(auth, async (user) => {
        if (user) {
            const uid = user.uid;
            console.log(uid)
            const docRef = doc(db, "users", uid);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                console.log("Document data:", docSnap.data());
                let snapdata = docSnap.data()
                console.log("75456hs", snapdata.username)
                setUserUID(snapdata.username)
                setIsData(true)

            } else {
                console.log("No such document!");
            } // ...
        } else {
            // User is signed out
            // ...
        }
    });
    return (
        <>
            <NativeBaseProvider>
                <View style={{ padding: 10 }}>
                    <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 20 }}>{userUID}</Text></View>
                <Tab.Navigator
                    initialRouteName="Feed"
                    screenOptions={{
                        tabBarActiveTintColor: 'black',
                        tabBarLabelStyle: { fontSize: 20 },
                    }}
                >
                    <Tab.Screen
                        name="Form"
                        component={FormSceen}
                        options={{ tabBarLabel: 'Form' }}
                    />

                    <Tab.Screen
                        name="QR"
                        component={QRC}
                        options={{ tabBarLabel: 'QR Code' }}
                    />
                </Tab.Navigator>
            </NativeBaseProvider>
        </>
    )
}
