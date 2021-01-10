import React, { useState } from 'react';
import { Card, Statistic, Container, Button, Form, Progress, Grid, Input } from 'semantic-ui-react';
import { useStateValue } from "./StateProvider";
import { db } from './firebase';
import firebase from "firebase";

// component for getting the currentpoints
export function CurrentPoints() {
    // This gives the user and the credit points for that user
    const [{ user, credit }, dispatch] = useStateValue();
    return (
        <Grid columns={2}>
            <Grid.Row>
                <Grid.Column>
                    {/* Cards for each thing on the component, done using semantic UI */}
                    <Card>
                        <Card.Content>
                            <Card.Header>Points Available</Card.Header>
                            <Card.Meta>1pt = $5</Card.Meta>
                            <Card.Description>
                                <Progress warning total='30' value={user?.Total_Points} progress='ratio' />
                                <h5>Trade is points for Items
                                    <ul>
                                        <li>10pts for Small Priced Item (ex: mug, pencils, stationary)</li>
                                        <li>20pts for Medium Priced Item (ex: clothes, scientific calculators)</li>
                                        <li>30pts for Large Priced Item (ex: textbooks)</li>
                                    </ul>
                                </h5>
                            </Card.Description>
                        </Card.Content>
                    </Card>
                </Grid.Column>
                <Grid.Column>
                    {/* Cards for each thing on the component, done using semantic UI */}
                    <Card>
                        <Card.Content>
                            <Card.Header>Credit Available</Card.Header>
                            <Card.Description>
                                <h5>${credit}</h5>
                            </Card.Description>
                        </Card.Content>
                    </Card>
                </Grid.Column>
            </Grid.Row >
        </Grid >
    );
}

{/* This is the function that we use for showing the use of points when you buy any item */ }
function UsePoints(purchase) {
    //get the user's points
    const [{ user }, dispatch] = useStateValue();
    let usr = db.collection("Accounts").doc(user?.Barcode_Number.toString());

    //update account
    usr.update({
        Totaloints: firebase.firestore.FieldValue.decrement(purchase)
    }).then(() => {
        console.log("Updated pts");
    });
}

// this is the component that renders all the items that we have available in the store
export function BuyItems() {
    const smallTier = [{ item: "Pencil", price: 5 }, { item: "Calculator", price: 5 }, { item: "Mug", price: 5 }];
    const medTier = [{ item: "T-shirt", price: 15 }, { item: "Lab Coat", price: 12 }, { item: "Backpack", price: 14 }];
    const lgTier = [{ item: "Calculus Textbook", price: 25 }, { item: "Physics Textbook", price: 28 }, { item: "UOIT x Adidas Clothing", price: 30 }];

    // mapping through all the items and showing them on the screen
    const mapItems = (list) => {
        return list.map(item => (
            <Grid.Column>
                <Card>
                    <Card.Content>
                        <Card.Header>{item.item}</Card.Header>
                        <Card.Description>{item.price}pts</Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                        <div className='ui buttons'>
                            <Button color='green' onClick={UsePoints}>Use Points</Button>
                        </div>
                    </Card.Content>
                </Card>
            </Grid.Column>
        ));
    }
    return (
        <Grid columns={3}>
            <Grid.Row>
                <h3>Small Priced Items</h3>
                <Card.Group >
                    {mapItems(smallTier)}
                </Card.Group>
            </Grid.Row>
            <Grid.Row>
                <h3>Medium Priced Items</h3>
                <Card.Group >
                    {mapItems(medTier)}
                </Card.Group>
            </Grid.Row>
            <Grid.Row>
                <h3>Large Priced Items</h3>
                <Card.Group >
                    {mapItems(lgTier)}
                </Card.Group>
            </Grid.Row>
        </Grid >
    );
}


