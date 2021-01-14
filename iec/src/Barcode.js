import React from 'react';
import { useStateValue } from "./StateProvider"
import "./index.css";

function Barcode() {

    var Barcode = require('react-barcode');
    const [{ user }] = useStateValue();

    return (
        <div>
            <p style={{ textAlign: "center" }}>Please show the barcode given below to the cashier so that they can help you with the purchase</p>
            <div className="barcode__container">
                <Barcode value={user?.Barcode_Number} />
            </div>
        </div>
    )
}

export default Barcode
