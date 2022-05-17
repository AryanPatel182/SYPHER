import React, { useEffect, useState } from 'react';
import { Avatar } from "@material-ui/core";
import './Profile.css';
import { useStateValue } from './StateProvider';

const Profile = () => {
    const [{ user }, dispatch] = useStateValue();
    const [seed, setSeed] = useState("");

    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000));
    }, []);

  return (
    // <div>Hello From Profile Page</div>
      <div className='card'>           
          <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />             
          <h1>{user.displayName}</h1>
            <p className='title'>Country : India </p>
            <p>DAIICT</p>            
            <p><button>Contact</button></p>
      </div>
    
  )
}

export default Profile