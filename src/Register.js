import { Button } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import './Login.css';
import { auth, provider } from './firebase';
import { actionTypes } from './reducer';
import { useStateValue } from './StateProvider';
import db from './firebase';


function Register() {
   
    const [uname, setUname] = useState([]);
    const [pwd, setPwd] = useState([]);
    
    const signUp = () => {
        

        if (uname && pwd) {
            db.collection("user").add({
                displayName: uname,
                password: pwd
            })
        }
        if (uname && pwd) {
            alert("You have been registered successfully!")
        }
    };
    

    return (

        <div className="login">
            <div className="login_container">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTebRyQtgHDVfaavy19CsneLMSB91jrSXpSSA&usqp=CAU" alt="" />
                <div className="login_text">
                    <h1>Sign Up to Sypher</h1>
                </div>
                <div className='form-field'>
                    <form>
                        <div className='username'>
                            <label>
                                <input value={uname} onChange={(e) => setUname(e.target.value)} type="text" name="name" placeholder='Username' />
                            </label>
                        </div>
                        <div className='password'>
                            <label>
                                <input value={pwd} onChange={(e) => setPwd(e.target.value)} type="password" name="password" placeholder='Password' />
                            </label>
                        </div>
                        <div className='submit'>
                            <Button type="submit" onClick={signUp}>Sign Up</Button>
                        </div>
                    </form>
                </div>                
            </div>
        </div>
    );
}

export default Register
