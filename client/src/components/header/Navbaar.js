import React, { useContext, useEffect, useState } from 'react';
import "./navbar.css"
import SearchIcon from '@mui/icons-material/Search';
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Avatar from '@mui/material/Avatar';
import { NavLink } from 'react-router-dom';
import { LoginContext } from '../context/ContextProvider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import Rightheader from './Rightheader';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import LogoutIcon from '@mui/icons-material/Logout';


const Navbaar = () => {

  const { account, setAccount } = useContext(LoginContext);

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };

    const [dropen, setDropen] = useState(false);

    const getdetailvaliduser = async () => {
      const res = await fetch("/validuser", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json"
        },
        credentials: "include"
      });

      const data = await res.json();
      //console.log(data);

      if (res.status !== 201) {
        console.log("error");
      } else {
        console.log("data valid");
        setAccount(data);
      }
    };

    const handleopen = () => {
      setDropen(true);
    }

    const handledrclose = () => {
      setDropen(false);
    }

    useEffect(() => {
      getdetailvaliduser()
    }, [])

    return (
      <header>
        <nav>
          <div className="left">
            <IconButton className='hamburgur' onClick={handleopen}>
              <MenuIcon style={{ color: "#fff" }} />
            </IconButton>
            <Drawer open={dropen} onClose={handledrclose}>
              <Rightheader logclose={handledrclose} />
            </Drawer>
            <div className="navlogo">
              <NavLink to="/">   <img src="https://raw.githubusercontent.com/harsh17112000/E-commerceapp/main/client/public/amazon_PNG25.png" alt="" /> </NavLink>
            </div>
            <div className="nav_searchbaar">
              <input type="text" name="" id="" />
              <div className="search_icon">
                <SearchIcon id="search" />
              </div>
            </div>

          </div>
          <div className="right">
            <div className="nav_btn">
              <NavLink to="/login">signin</NavLink>
            </div>
            <div className="cart_btn">
              {
                account ? <NavLink to="/buynow">
                  <Badge badgeContent={account.carts.length} color="primary">
                    <ShoppingCartIcon id="icon" />
                  </Badge>
                </NavLink> : <NavLink to="/login">
                  <Badge badgeContent={0} color="primary">
                    <ShoppingCartIcon id="icon" />
                  </Badge>
                </NavLink>
              }


              <p>cart</p>
            </div>
            {
              account ? <Avatar className='avtar2'
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
              >{account.fname[0].toUpperCase()}</Avatar> :
                <Avatar className='avtar' ></Avatar>
            }
    
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
            >
              <MenuItem onClick={handleClose}>Profile</MenuItem>
              <MenuItem onClick={handleClose}>My account</MenuItem>
              {
                account? <MenuItem onClick={handleClose}><LogoutIcon/>Logout</MenuItem>:""
              }
             
            </Menu>

          </div>


        </nav>


      </header>
    )
  }

  export default Navbaar;
