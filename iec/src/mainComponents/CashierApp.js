import React, { useState } from 'react';
import { Card, Container, Button, Form, Input } from 'semantic-ui-react';
import { useStateValue } from "../StateProvider";
import { db } from '../firebase';
import "../MyAccount.css";

// The component function for the Myaccount

export default function CashierApp() {

    // functions for the myaccount
    const [{ user, credit, points }, dispatch] = useStateValue();
    const [funds, setFunds] = useState(0);
    const [name, setName] = useState('');
    const [card, setCard] = useState('');
    const [expire, setExpire] = useState('');
    const [ccv, setCcv] = useState('');

    const handleName = (val) => {
        setName(val);
    }
    const handleCard = (val) => {
        setCard(val);
    }
    const handleExpire = (val) => {
        setExpire(val);
    }
    const handleCcv = (val) => {
        setCcv(val);
    }

    //update account
    let usr = db.collection("Accounts").doc(user?.Barcode_Number.toString());
    console.log(usr);

    // ADD FUNDS TO CREDIT
    const handleAddFundsSubmit = () => {
        if (funds.value > 0) {
            let newFunds = parseFloat(credit) + parseFloat(funds.value);
            usr.update({
                Total_Credit: newFunds
            }).then(() => {
                console.log("Updated funds");
            });
            dispatch({
                type: "Add_credit",
                item: newFunds
            });
            setFunds(0);
        } else {
            alert("Please input the right amount");
        }

    }

    const handleAddCardSubmit = () => {
        setName('');
        setCard('');
        setExpire('');
        setCcv('');
        console.log("Added Cards");
    }

    return (
        <div className="center">
            <Container>
                <Card>
                    <Card.Content>
                        <Card.Header>Name</Card.Header>
                        <Card.Description>{user?.name}</Card.Description>
                    </Card.Content>
                </Card>
                <Card>
                    <Card.Content>
                        <Card.Header>Email</Card.Header>
                        <Card.Description>{user?.Email}</Card.Description>
                    </Card.Content>
                </Card>
                <Card>
                    <Card.Content>
                        <Card.Header>Points Available</Card.Header>
                        <Card.Description>{points}</Card.Description>
                    </Card.Content>
                </Card>
                <Card>
                    <Card.Content>
                        <Card.Header>Add Funds</Card.Header>
                        <Card.Meta>{credit}</Card.Meta>
                        <Card.Description>
                            <Form>
                                <Form.Field>
                                    <label>Amount $</label><Input value={funds.value} onChange={(e, data) => setFunds(data)} />
                                </Form.Field>
                            </Form>
                        </Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                        <Button onClick={handleAddFundsSubmit} primary>Add Funds</Button>
                    </Card.Content>
                </Card>
                <Card>
                    <Card.Content>
                        <Card.Header>Enter Payment Info</Card.Header>
                        <Card.Description>
                            <Form>
                                <Form.Field>
                                    <label>Card Holder Name</label><input value={name.value} onChange={handleName} />
                                </Form.Field>
                                <Form.Field>
                                    <label>Card Number</label><input value={card.value} onChange={handleCard} />
                                </Form.Field>
                                <Form.Field>
                                    <label>CCV</label><input value={ccv.value} onChange={handleCcv} />
                                </Form.Field>
                                <Form.Field>
                                    <label>Expiry Date 'mm/yy'</label><input value={expire.value} onChange={handleExpire} />
                                </Form.Field>
                            </Form>
                        </Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                        <Button onClick={handleAddCardSubmit} primary>Add Card</Button>
                    </Card.Content>
                </Card>
            </Container >
        </div >
    );

}
