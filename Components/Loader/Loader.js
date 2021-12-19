import React, { useState } from 'react';
import { Button, Stack, Center, NativeBaseProvider, Text, Spinner } from "native-base"
import { auth, onAuthStateChanged, doc, getDoc, db, updateDoc } from '../../firebaseConfig'

export default function Loader({ navigation }) {
    onAuthStateChanged(auth, async (user) => {
        if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/firebase.User
            const uid = user.uid;
            console.log(uid)
            const docRef = doc(db, "users", uid);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                console.log("Document data:", docSnap.data());
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            } // ...
        } else {
            // User is signed out
            // ...
        }
    });

    const [isData, setIsData] = useState(false)
    return (
        <>
            {isData ? (<Text>Hello</Text>) : (< NativeBaseProvider >
                <Center flex={1} px="3">
                    <Spinner color="emerald.500" size="lg" />
                </Center>
            </NativeBaseProvider >)
            }

        </>
    )
}