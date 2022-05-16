import { Button } from '@material-ui/core';
import React from 'react';
import './Login.css';
import {auth,provider} from './firebase';
import { actionTypes } from './reducer';
import { useStateValue } from './StateProvider';

function Login() {
    const [{},dispatch] = useStateValue();
    const signIn = () => {
        auth
            .signInWithPopup(provider)
            .then((result) => {
                dispatch({
                    type: actionTypes.SET_USER,
                    user: result.user,
                })
            })
            .catch((error) => alert(error.message));
    }
    return (
        <div className="login">
           <div className="login_container">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTebRyQtgHDVfaavy19CsneLMSB91jrSXpSSA&usqp=CAU" alt=""/> 
                <div className="login_text">
                    <h1>Sign in to Sypher</h1>
                </div>
                <div className='form-field'>
                    <form>
                        <div className='username'>
                            <label>                            
                                <input type="text" name="name" placeholder='Username'/>
                            </label>
                        </div>
                        <div className='password'>                          
                            <label>                             
                                    <input type="text" name="password" placeholder='Password'/>
                            </label>
                        </div>
                        <div className='submit'>                          
                            <Button type="submit">Sign in</Button>
                        </div>
                    </form>
                </div>              
                <Button type="submit" onClick={signIn}>Sign in With Google</Button>
           </div>
        </div>
    );
}

export default Login
