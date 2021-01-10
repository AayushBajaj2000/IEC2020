import React from 'react';
import { useStateValue } from "./StateProvider"

function Barcode() {
    var ReactDOM = require('react-dom');
    var Barcode = require('react-barcode');
    const [{ user, credit, points }, dispatch] = useStateValue();


    return (
        <div>
            <Barcode value={user?.Barcode_Number} />
        </div>
    )
}

export default Barcode
