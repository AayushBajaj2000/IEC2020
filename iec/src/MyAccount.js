import React, { useState } from 'react';
import { Card, Statistic, Container, Button, Form, Progress, Grid, Input } from 'semantic-ui-react';
import { useStateValue } from "./StateProvider";
import { db } from './firebase';
import "./MyAccount.css";

// The component function for the Myaccount

export default function MyAccount() {
    // functions for the myaccount
    const [{ user, credit, points }, dispatch] = useStateValue();
    const [funds, setFunds] = useState(0);
    const [name, setName] = useState('');
    const [card, setCard] = useState('');
    const [expire, setExpire] = useState('');
    const [ccv, setCcv] = useState('');

    const handleFunds = (data) => {
        setFunds(data);
    }
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

    // ADD FUNDS TO CREDIT
    const handleAddFundsSubmit = () => {
        let newFunds = parseFloat(user?.Total_Credit) + parseFloat(funds.value);
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
                <h3>Name : {user?.name}</h3>
                <h3>Email : {user?.Email}</h3>
                <h3>Points Available : {points}</h3>
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