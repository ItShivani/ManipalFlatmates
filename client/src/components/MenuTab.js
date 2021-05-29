import React, { useContext,useState } from 'react'
import { Input, Menu } from 'semantic-ui-react'
import {Link} from 'react-router-dom';
import {AuthContext} from '../context/auth'

function MenuTab() {
  const {user,logout} = useContext(AuthContext);
  const pathname = window.location.pathname;

  const path = pathname === '/' ? 'home' : pathname.substr(1)
  const [activeItem,setActiveItem] = useState(path);
  const handleItemClick = (e, { name }) => setActiveItem(name);

  const menuTab = user ? (
      <Menu pointing size="huge" color="teal">
        <Menu.Item name ={user.username} active as={Link} to="/"/>

        <Menu.Menu position="right">
            <Menu.Item name="logout" onClick={logout}/>
        </Menu.Menu>
      </Menu>
    ) : (
            <Menu pointing size="huge" color="teal">
          <Menu.Item
            name='home'
            active={activeItem === 'home'}
            onClick={handleItemClick}
            as={Link}
            to="/"
          />
          <Menu.Menu position='right'>
              <Menu.Item
            name='login'
            active={activeItem === 'login'}
            onClick={handleItemClick}
            as={Link}
            to="/login"
          />
          <Menu.Item
            name='register'
            active={activeItem === 'register'}
            onClick={handleItemClick}
            as={Link}
            to="/register"
          />
          </Menu.Menu>
        </Menu>
    )

    return menuTab;
}

export default MenuTab;