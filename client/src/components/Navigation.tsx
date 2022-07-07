/* eslint-disable max-len */
import React, {useState} from 'react';
import {
  Menu,
  MenuItem,
} from '@mui/material';
import {anchors} from '../utils/arrays';
import logo from '../Logo/2011_Logo_white.png';
import '../Logo/logo.css';
import {useAuth0} from '@auth0/auth0-react';
import {MenuIcon, XIcon} from '@heroicons/react/outline';

const Navigation = ({
  icon,
}: {
  icon: any,
}) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const [nav, setNav] = useState(false);
  const handleClick2 = () => setNav(!nav);

  const handleClose = () => {
    setAnchorEl(null);
  };
  const {user} = useAuth0();
  // const {name, picture, email} = user;
  const {picture} = user;

  return (
    <div className='w-screen h-[80px] z-10 bg-zinc-900 drop-shadow-lg'>
      <div className='px-2 flex justify-between items-center w-full h-full '>
        <div className='flex flex-row gap-4  items-center ml-4 '>
          <a href="https://portlandplayhouse.org/">
            <img src={logo} className="logo_size"></img>
          </a>

          <a href="/">
            <p className="text-white text-xl font-bold md:flex hidden">WonderTix CRM</p>
          </a>

        </div>
        <div className='md:flex flex-row items-center hidden '>
          {anchors.map((anchor) => (
            <a
              href={anchor.link}
              key={anchor.title}
              className='text-white hover:scale-105 duration-300 ml-4 hover:bg-zinc-400 px-3 py-2 rounded-lg'
            >
              {anchor.title}
            </a>
          ))}
          <button
            id="basic-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
            className='text-white ml-4  hover:scale-105 duration-300 hover:bg-zinc-400 px-3 py-2 rounded-lg '>
            Task
          </button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <MenuItem
              onClick={handleClose}
            >
              <a
                href="/tasks/create"
                className='text-black'
              >
                Create
              </a>
            </MenuItem>
            <MenuItem
              onClick={handleClose}
            >
              <a
                href="/tasks/edit"
                className='text-black'
              >
                Edit
              </a>
            </MenuItem>
            <MenuItem
              onClick={handleClose}
            >
              <a
                href="/tasks/accountInformation"
                className='text-black'
              >
                Account Information
              </a>
            </MenuItem>
          </Menu>

          <div className='ml-6 mr-4 '>
            <img src={picture} className='rounded-3xl w-12 h-12  ' />
          </div>
        </div>
        <div className='md:hidden ' onClick={handleClick2}>
          {!nav ? <MenuIcon className='w-5 mr-2 text-white'/> : <XIcon className = 'w-5 text-white mr-2' />}
        </div>
      </div>
      <div className={!nav ? 'hidden' :'absolute bg-zinc-900 w-full flex flex-col items-center px-8 '}>
        <a href="/">
          <div className="text-white hover:scale-105 duration-300  border-b border-b-zinc-500 px-[30rem] p-9  ">Home</div>
        </a>
        {anchors.map((anchor) => (
          <a
            href={anchor.link}
            key={anchor.title}
            className='text-white hover:scale-105 duration-300  border-b border-b-zinc-500 px-[30rem] p-9'
          >
            {anchor.title}
          </a>
        ))}
        <button
          id="basic-button"
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
          className='text-white mt-8  hover:scale-105 duration-300 mb-8 border-b-white '>
              Task
        </button>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          <MenuItem
            onClick={handleClose}
          >
            <a
              href="/tasks/create"
              className='text-black'
            >
                  Create
            </a>
          </MenuItem>
          <MenuItem
            onClick={handleClose}
          >
            <a
              href="/tasks/edit"
              className='text-black'
            >
                  Edit
            </a>
          </MenuItem>
          <MenuItem
            onClick={handleClose}
          >
            <a
              href="/tasks/accountInformation"
              className='text-black'
            >
                  Account Information
            </a>
          </MenuItem>
        </Menu>


      </div>

    </div>
  );
};

export default Navigation;
