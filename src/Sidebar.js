import React, {useState,useEffect} from 'react';
import './Sidebar.css';
import { Avatar, IconButton } from "@material-ui/core";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import ChatIcon from "@material-ui/icons/Chat";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import {SearchOutlined} from "@material-ui/icons";
import SidebarChat from "./SidebarChat";
import db from './firebase';
import {LogoutIcon} from "@material-ui/icons"
import { useStateValue } from './StateProvider';
// import LogoutIcon from '@mui/icons-material/Logout';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { Link } from 'react-router-dom';

function Sidebar(props) {

    const [rooms, setRooms] = useState([]);
    const [{user},dispatch] = useStateValue();
    const [contacts, setContacts] = useState([]);
    // const [clist, setClist] = useState([]);

    useEffect(() => {
        const unsubscribe = db.collection('rooms').onSnapshot(snapshot => (
            setRooms(snapshot.docs.map(doc => (
                {
                    id: doc.id,
                    data: doc.data()
                }
            )

            ))
        ));

        return () => {
            unsubscribe();
        }
    },[]); 
           

    function logout() {
        window.location.reload(false);
    }

    return (
        <div className="sidebar">
            <div className="sidebar_header">
                <Link to={`/profile`}>
                    <div>
                        <Avatar src={user?.photoURL}/>
                        <h5> Logged in as {user.displayName}</h5>
                    </div>
                </Link>
                <div className="sidebar_headerRight">
                    <IconButton>
                        <DonutLargeIcon/>
                    </IconButton>
                    <IconButton>
                        <ChatIcon/>
                    </IconButton>
                    <IconButton onClick={logout}>
                        <ExitToAppIcon/>
                    </IconButton>
                    
                </div>
            </div>
            <div className="sidebar_search">
                <div className="sidebar_searchContainer">
                    <SearchOutlined />
                    <input type="text" placeholder="Search or start new chat"/>
                </div>
            </div>
            <div className="sidebar_chats">
                <SidebarChat addNewChat/>
                {rooms.map(room=> (
                    <SidebarChat key={room.id} id={room.id} name={room.data.name}/>
                ))}                                             
            </div>
        </div>
    );
}

export default Sidebar;