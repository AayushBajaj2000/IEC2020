import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useStateValue } from "../StateProvider";
import { Menu, Button, Modal, Input } from 'semantic-ui-react';
import { db, auth } from '../firebase';
import '../index.css';

function MainMenu() {

    // The variable which will be used to navigate to diferent pages 
    let history = useHistory();
    // Menu options for the semantic ui navbar
    const menuOpt = [
        { name: 'Home', link: "/" },
    ];
    // Getting the user and the dispatch function from the stateprovider or ContextAPI
    const [{ user }, dispatch] = useStateValue();
    // Used for semantic-ui navbar to show which tab is active
    const [actv, setActv] = useState("Home");
    // Used for opening the modal for the signup
    const [open1, setOpen1] = useState(false);
    // Used for opening the modal for the login
    const [open2, setOpen2] = useState(false);
    // Used for getting their name from the input
    const [name, setName] = useState("");
    // Used for getting their email from the input
    const [email, setEmail] = useState("");
    // Used for getting their password from the input
    const [password, setPassword] = useState("");

    // Function for opening the modal for signup
    const handleOpen1 = () => {
        setOpen1(true)
    }
    // Function for opening the modal for the login
    const handleOpen2 = () => {
        setOpen2(true)
    }
    // Function for handling the signup
    const handleSignup = (event) => {
        // preventing the refresh when we click the login button
        event.preventDefault();
        // Firebase function for creating a user with the email and the password that they entered
        auth.createUserWithEmailAndPassword(email.value, password.value)
            .then((user) => {
                // Now the user is created
                // The random barcode generated which will be used by Barcode.js to generate a barcode
                var bc_number = Math.floor(Math.random() * 1000000000);
                // Adding the user with all their information to the firebase database  
                db.collection("Accounts").doc(bc_number.toString()).set({
                    name: name.value,
                    Email: email.value,
                    Total_Credit: 0,
                    Total_Points: 0,
                    Barcode_Number: bc_number
                })
                    .then(function () {
                        //The user is added successfully
                        console.log("User successfully added!");
                        //Adding the user with their information to the stateprovider
                        dispatch({
                            type: "Add_user",
                            item: {
                                name: name.value,
                                Email: email.value,
                                Total_Credit: 0,
                                Total_Points: 0,
                                Barcode_Number: bc_number
                            }
                        });
                    })
                    .catch(function (error) {
                        // If there is an error in adding the user
                        console.error("Error in adding the user to the database: ", error);
                    });
            })
            .catch((error) => {
                // If there is an error in creating the user
                alert("Error in creating the user : ", error.message);
            });
        // closing the modal
        setOpen1(false);
    }

    // Handling the logout for the user
    const handleLogout = () => {
        // Setting the user to null in the stateprovider which changes what is rendered
        dispatch({
            type: "Add_user",
            item: null
        });
        dispatch({
            type: "Add_credit",
            item: 0
        });
        dispatch({
            type: "Add_points",
            item: 0
        });
        // Go to the main page when the user has logged out
        history.push("./");
    }

    //  Handling the signin for the user
    const handleSignin = (event) => {
        // Preventing the default behaviour of the button
        event.preventDefault();
        // Signing the user in using firebase authentication
        auth.signInWithEmailAndPassword(email.value, password.value)
            .then((user) => {
                // The user is signed in
                // Getting the users information from the database according to their email
                db.collection("Accounts")
                    .get()
                    .then(function (querySnapshot) {
                        // Looping through each document 
                        querySnapshot.forEach(function (doc) {
                            // doc.data() is never undefined for query doc snapshots
                            //Checking if the email the user entered is the same as their email in the database to get their information
                            if (doc.data().Email === email.value) {
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
                            }
                        });
                        //Closing the login modal
                        setOpen2(false);
                        // Setting the password and email to be null 
                        setEmail("");
                        setPassword("");
                    })
                    .catch(function (error) {
                        // We can not get the documents from the database
                        console.log("Error getting documents: ", error);
                    });
            })
            .catch((error) => {
                // If the user has entered any wrong email or password then they get a message
                alert(error.message);
            });
    }
    // headings function which we use to display the navbar links at the start
    const headings = menuOpt.map(label => (
        <Link to={label.link}>
            <Menu.Item
                name={label.name}
                active={actv === label.name}
            />
        </Link>
    ));
    // returns the rendered component
    return (
        <div>
            {/*Menu component from semantic-ui*/}
            <Menu pointing secondary color={'blue'} inverted>
                {/* Displaying the headings */}
                {headings}
                {/* Displaying the navbar position on the right */}
                <Menu.Menu position='right'>
                    <Link to={"/myaccount"}>
                        {
                            user !== null ?
                                <Menu.Item
                                    name='My Account'
                                    active={actv === 'My Account'}
                                />
                                : null
                        }
                    </Link>
                    {
                        user === null ?
                            <Menu.Item
                                name={"Login"}
                                active={actv === 'Login'}
                                onClick={handleOpen2}
                            /> :
                            <Menu.Item
                                name={'Logout'}
                                active={actv === 'Logout'}
                                onClick={handleLogout}
                            />
                    }
                    <Menu.Item
                        name={"Signup"}
                        active={actv === 'Signup'}
                        onClick={handleOpen1}
                    />
                </Menu.Menu>
            </Menu>
            {/* Modal for the signup*/}
            <Modal
                onClose={() => setOpen1(false)}
                onOpen={() => setOpen1(true)}
                open={open1}
                className="modal__login"
            >
                <Modal.Header className="modal__heading">Sign Up </Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                        <div className="modal__main">
                            <label className="modal__label">Name</label>
                            <Input placeholder='Name' value={name.value} onChange={(e, data) => setName(data)} />
                            <br /> <br />
                            <label className="modal__label">Email</label>
                            <Input placeholder='Email' value={email.value} onChange={(e, data) => setEmail(data)} />
                            <br /> <br />
                            <label className="modal__label">Password</label>
                            <Input placeholder='password' type="password" value={password.value} onChange={(e, data) => setPassword(data)} />
                        </div>
                    </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                    <Button
                        primary
                        content="Signup"
                        labelPosition='right'
                        icon='checkmark'
                        onClick={handleSignup}
                    />
                </Modal.Actions>
            </Modal>
            {/* Modal for the signin*/}
            <Modal
                onClose={() => setOpen2(false)}
                onOpen={() => setOpen2(true)}
                open={open2}
                className="modal__login"
            >
                <Modal.Header className="modal__heading">Login</Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                        <div className="modal__main">
                            <label className="modal__label">Email</label>
                            <Input placeholder='Email' value={email.value} onChange={(e, data) => setEmail(data)} />
                            <br /> <br />
                            <label className="modal__label">Password</label>
                            <Input placeholder='password' type="password" value={password.value} onChange={(e, data) => setPassword(data)} />
                        </div>
                    </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                    <Button
                        primary
                        content="Login"
                        labelPosition='right'
                        icon='checkmark'
                        onClick={handleSignin}
                    />
                </Modal.Actions>
            </Modal>
        </div >
    );
}

export default MainMenu;