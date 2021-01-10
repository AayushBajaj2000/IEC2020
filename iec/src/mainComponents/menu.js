import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useStateValue } from "../StateProvider";
import { Menu, Button, Header, Image, Modal, Input } from 'semantic-ui-react';
import { db, auth } from '../firebase';
import '../index.css';

function MainMenu() {

    // menu options for the semantic ui navbar
    const menuOpt = [
        { name: 'Home', link: "/" },
    ];

    // All the state options that we use for dealing with all the variables 
    const [{ user }, dispatch] = useStateValue();
    const [logout, setLogout] = useState(false);
    const [actv, setActv] = useState("Home");
    const [open1, setOpen1] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
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
        event.preventDefault();

        // firebase function for creating a user with the email and the password
        auth.createUserWithEmailAndPassword(email.value, password.value)
            .catch((error) => alert(error.message));

        // adding user to the state for the whole app
        dispatch({
            type: "Add_user",
            item: email.value
        });

        // The random barcode generated
        var bc_number = Math.floor(Math.random() * 1000000000);

        // Firebase databse adding the name and all the stuff that we need 
        db.collection("Accounts").doc(bc_number.toString()).set({
            name: name.value,
            Email: email.value,
            Total_Credit: 0,
            Total_Points: 0,
            Barcode_Number: bc_number
        })
            .then(function () {
                console.log("Document successfully written!");
            })
            .catch(function (error) {
                console.error("Error writing document: ", error);
            });

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
        // closing the modal
        setOpen1(false);
    }

    // handling the logout for the user
    const handleLogout = () => {
        dispatch({
            type: "Add_user",
            item: null
        });
    }

    //  handling the signin for the user
    const handleSignin = (event) => {
        event.preventDefault();

        // Authentication for firebase for signing in
        auth.signInWithEmailAndPassword(email.value, password.value)
            .catch((error) => alert(error.message));

        dispatch({
            type: "Add_user",
            item: email.value
        });

        // Now we are adding the user to the database
        db.collection("Accounts")
            .get()
            .then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    // doc.data() is never undefined for query doc snapshots
                    if (doc.data().Email == email.value) {
                        dispatch({
                            type: "Add_user",
                            item: doc.data()
                        });
                        dispatch({
                            type: "Add_credit",
                            item: doc.data().Total_Credit
                        });
                        dispatch({
                            type: "Add_points",
                            item: doc.data().Total_Points
                        });
                    }
                });
            })
            .catch(function (error) {
                console.log("Error getting documents: ", error);
            });

        // Setting the password and email to be null 
        setEmail("");
        setPassword("");

        // closing the modal
        setOpen2(false);
    }

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
            <Menu pointing secondary color={'blue'} inverted>
                {headings}
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
                                onClick={handleOpen2}
                            /> :
                            <Menu.Item
                                name={'Logout'}
                                onClick={handleLogout}
                            />
                    }
                    <Menu.Item
                        name={"Signup"}
                        onClick={handleOpen1}
                    />
                </Menu.Menu>
            </Menu>
            {/* Modal for the signup*/}
            <Modal
                onClose={() => setOpen1(false)}
                onOpen={() => setOpen1(true)}
                open={open1}
            >
                <Modal.Header>Sign Up </Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                        <label className="modalLab">Name</label>
                        <Input placeholder='Name' value={name.value} onChange={(e, data) => setName(data)} />
                        <br /> <br />
                        <label className="modalLab">Email</label>
                        <Input placeholder='Email' value={email.value} onChange={(e, data) => setEmail(data)} />
                        <br /> <br />
                        <label className="modalLab">Passowrd</label>
                        <Input placeholder='password' type="password" value={password.value} onChange={(e, data) => setPassword(data)} />
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
            >
                <Modal.Header>Login</Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                        <label className="modalLab">Email</label>
                        <Input placeholder='Email' value={email.value} onChange={(e, data) => setEmail(data)} />
                        <br /> <br />
                        <label className="modalLab">Password</label>
                        <Input placeholder='password' type="password" value={password.value} onChange={(e, data) => setPassword(data)} />
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