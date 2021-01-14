import React from 'react';
import { Card, Progress, Grid } from 'semantic-ui-react';
import { useStateValue } from "./StateProvider";
import "./index.css";

//displays the types of things you can get and pts and credit available
export default function CurrentPoints() {
    const [{ credit, points }] = useStateValue();
    return (
        <Grid container>
            <Grid.Row className="points__container">
                <Card>
                    <Card.Content>
                        <div >
                            <Card.Header>Points Available</Card.Header>
                            <Card.Meta>1pt = $5</Card.Meta>
                            <Card.Description>
                                <Progress warning total='30' value={points} progress='ratio' />
                                <h5>Trade is points for Items
                                    <ul>
                                        <li>10pts for Small Priced Item (ex: mug, pencils, stationary)</li>
                                        <li>20pts for Medium Priced Item (ex: clothes, scientific calculators)</li>
                                        <li>30pts for Large Priced Item (ex: textbooks)</li>
                                    </ul>
                                </h5>
                            </Card.Description>
                        </div>
                    </Card.Content>
                </Card>
            </Grid.Row>
            <Grid.Row className="points__container">
                <Card>
                    <Card.Content>
                        <Card.Header>Credit Available</Card.Header>
                        <Card.Description>
                            <h5>${credit}</h5>
                        </Card.Description>
                    </Card.Content>
                </Card>
            </Grid.Row >
        </Grid >
    );
}
