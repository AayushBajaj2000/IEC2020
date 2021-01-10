import React, { useState, useEffect } from 'react';
import { Menu } from 'semantic-ui-react';
import { useStateValue } from "../StateProvider";

function MainMenu() {
    const [test, dispatch] = useStateValue();
    const [logout, setLogout] = useState(false); 
    const [actv, setActv] = useState("home");

    const handleLogout = () => {
        setLogout(true)
    }

    const handleMenuClick = (e, name) => {
        setActv(name)
        if (name === "logout"){
            handleLogout();
        }
    }
    
    useEffect(() => {
        /*
        dispatch({
        type: "Add_test",
        item: a
        });
        */ 
    }, [])
    return (
        <div>
            <Menu pointing secondary>
                <Menu.Item
                    name='Home'
                    active={actv === 'home'}
                    onClick={handleMenuClick}
                />
                <Menu.Menu position='right'>
                    <Menu.Item
                        name='My Account'
                        active={actv === 'user'}
                        onClick={handleMenuClick}
                    />
                    <Menu.Item
                        name='Logout'
                        active={actv === 'logout'}
                        onClick={handleMenuClick}
                    />
                </Menu.Menu>
            </Menu>
        </div>
    );
}

export default MainMenu;