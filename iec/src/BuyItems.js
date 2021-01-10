import React, { useState } from 'react';
import { Card, Statistic, Container, Button, Form, Progress, Grid, Input } from 'semantic-ui-react';
import { useStateValue } from "./StateProvider";
import { db } from './firebase';

export default function BuyItems() {

    const [{ user, points, credit }, dispatch] = useStateValue();
    const smallTier = [{ item: "Pencil", price: 5 }, { item: "Calculator", price: 5 }, { item: "Mug", price: 5 }];
    const medTier = [{ item: "T-shirt", price: 15 }, { item: "Lab Coat", price: 12 }, { item: "Backpack", price: 14 }];
    const lgTier = [{ item: "Calculus Textbook", price: 25 }, { item: "Physics Textbook", price: 28 }, { item: "UOIT x Adidas Clothing", price: 30 }];

    const UsePoints = (purchase) => {
        //get the user's points
        let usr = db.collection("Accounts").doc(user?.Barcode_Number.toString());

        let newPoints = points - purchase;
        if (newPoints > 0) {
            //update account
            usr.update({
                Total_Points: newPoints
            }).then(() => {
                console.log("Updated pts");
            });
        }
        dispatch({
            type: "Add_points",
            item: newPoints
        });
    }

    const mapItems = (list) => {
        return list.map(item => (
            <Card>
                <Card.Content>
                    <Card.Header>{item.item}</Card.Header>
                    <Card.Description>{item.price}pts</Card.Description>
                </Card.Content>
                <Card.Content extra>
                    <div className='ui buttons'>
                        <Button color='green' onClick={() => UsePoints(item.price)}>Use Points</Button>
                    </div>
                </Card.Content>
            </Card>
        ));
    }

    return (
        <Grid container columns={3}>
            <Grid.Row><h3>Small Priced Items</h3></Grid.Row>
            <Grid.Row>
                <Card.Group >
                    {mapItems(smallTier)}
                </Card.Group>
            </Grid.Row>
            <Grid.Row><h3>Medium Priced Items</h3></Grid.Row>
            <Grid.Row>
                <Card.Group >
                    {mapItems(medTier)}
                </Card.Group>
            </Grid.Row>
            <Grid.Row><h3>Large Priced Items</h3></Grid.Row>
            <Grid.Row>
                <Card.Group >
                    {mapItems(lgTier)}
                </Card.Group>
            </Grid.Row>
        </Grid >
    );
}