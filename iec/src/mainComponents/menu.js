import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';
import { useStateValue } from "../StateProvider";

function MainMenu() {
    const menuOpt = [
        {name:'Home', link:"/"}, 
        {name:'Wow', link:"/wow"}
    ];
    const [test, dispatch] = useStateValue();
    const [logout, setLogout] = useState(false); 
    const [actv, setActv] = useState("Home");

    const handleMenuClick = (e, data) => {
        setActv(data.name);
    }

    const handleLogout = () => {
        setLogout(true)
    }

    useEffect(() => {
        /*
        dispatch({
        type: "Add_test",
        item: a
        });
        */ 
    }, []);


    const headings = menuOpt.map(label => (
        <Link to={label.link}>
            <Menu.Item
                name={label.name}
                active={actv === label.name}
                onClick={handleMenuClick}
            />
        </Link>
    ));

    return (
        <div>
            <Menu pointing secondary>
                {headings}
                <Menu.Menu position='right'>
                    <Menu.Item
                        name='My Account'
                        active={actv === 'My Account'}
                        onClick={handleMenuClick}
                    />
                    <Menu.Item
                        name='Logout'
                        active={actv === 'Logout'}
                        onClick={handleMenuClick}
                    />
                </Menu.Menu>
            </Menu>
        </div>
    );
}

export default MainMenu;