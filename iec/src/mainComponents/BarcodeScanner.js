import React, { useState, useEffect } from 'react';
import BarcodeScannerComponent from "react-webcam-barcode-scanner";
import { useStateValue } from "../StateProvider";
import "../MyAccount.css";
import { db } from "../firebase";
import CashierApp from "./CashierApp";

function BarcodeScanner() {

    const [barcode, setBarcode] = useState('Not Found');
    const [{ barcode__scanned }, dispatch] = useStateValue();

    useEffect(() => {
        console.log(barcode);
        var docRef = db.collection("Accounts").doc(barcode.toString());

        docRef.get()
            .then(function (doc) {
                if (doc.exists) {
                    console.log("User successfully detected!");
                    // Adding the object which contains all the information about the user to the stateprovider
                    dispatch({
                        type: "Add_user",
                        item: doc.data()
                    });
                    // Adding the total credit that the user has to the stateprovider
                    dispatch({
                        type: "Add_credit",
                        item: doc.data().Total_Credit
                    });
                    // Adding the total points that the user has to the stateprovider
                    dispatch({
                        type: "Add_points",
                        item: doc.data().Total_Points
                    });
                } else {
                    // doc.data() will be undefined in this case
                    console.log("No such document!");
                }
            })
            .catch(function (error) {
                console.log("Error getting document:", error);
            });

    }, [barcode])

    return (
        <>
            { barcode === "Not Found" ?
                <BarcodeScannerComponent
                    width={500}
                    height={500}
                    onUpdate={(err, result) => {
                        if (result) {
                            setBarcode(result.text)
                        }
                        else setBarcode('Not Found')
                    }}
                />
                : <CashierApp />
            }
        </>
    )
}

export default BarcodeScanner;