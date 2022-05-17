import { Button } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import './Login.css';
import {auth,provider} from './firebase';
import { actionTypes } from './reducer';
import { useStateValue } from './StateProvider';
import db from './firebase';
import Register from './Register';


function Login() {
    const [clist, setClist] = useState([]);
    const [uname, setUname] = useState([]);
    const [pwd, setPwd] = useState([]);
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
    const signIn2 = () => {
        // console.log(clist[0].data.name)
        let p = 0;
        for(let i=0; i<clist.length; i++)
        {   
            if(clist[i].data.displayName === uname && clist[i].data.password === pwd)
            {
                dispatch({
                    type: actionTypes.SET_USER,
                    user: {'displayName':clist[i].data.displayName} 
                })
                p=1;
                break;
            }
        }
        
        if(p==0)
        {
            alert("Wrong Username or Password!")
        }
        // const roomName = prompt("Please Enter Name for Chat", clist[1].data.name);
    }
    
    // const signUp = () => {
       
    // };
    
    const signUp = () => {
        const nuname = prompt("Please Enter Username");
        const npwd = prompt("Please Enter Password");

        if (uname && npwd) {
            db.collection("user").add({
                displayName: nuname,
                password: npwd
            })
        }
        if(uname && npwd)
        {
            alert("You have been registered successfully!")
        }
    };
    
    
    useEffect(() => {
        const getclist = db.collection('user').onSnapshot(snapshot => (
            setClist(snapshot.docs.map(doc => (
                {
                    id: doc.id,
                    data: doc.data()
                }
            )

            ))
        ));

        return () => {
            getclist();            
        }
    }, []); 

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
                                <input value={uname} onChange={(e) => setUname(e.target.value)} type="text" name="name" placeholder='Username'/>
                            </label>
                        </div>
                        <div className='password'>                          
                            <label>                             
                                <input value={pwd} onChange={(e) => setPwd(e.target.value)} type="password" name="password" placeholder='Password'/>
                            </label>
                        </div>
                        <div className='submit'>                          
                            <Button type="submit" onClick={signIn2}>Sign in</Button>
                        </div>
                    </form>
                </div>              
                <Button type="submit" onClick={signIn}>Sign in With Google</Button>
                <p>Or</p>
                <div>
                    <Button type="submit" onClick={signUp}>Register</Button>                
                </div>
                {/* <Register/> */}
           </div>
        </div>
    );
}

export default Login
