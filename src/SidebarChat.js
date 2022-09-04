import { Avatar } from '@mui/material';
import React, { useEffect, useState } from 'react'
import './SidebarChat.css';
import { onSnapshot,collection,doc,addDoc, orderBy, query
} from 'firebase/firestore';
import db from './firebase';
import { Link } from 'react-router-dom';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import MicIcon from '@mui/icons-material/Mic';
import { useParams } from 'react-router-dom';
import { useStateValue } from './StateProvider';
function SidebarChat({id,name,addNewChat}) {
    const [seed,setSeed] = useState('');
    const [messages, setMessages] = useState([]);

    useEffect(() =>{
        if(id){
            onSnapshot(query(collection(doc(collection(db, "rooms"),id), "messages"),orderBy('timestamp','desc')), snapshot => (
                setMessages(snapshot.docs.map((doc) => doc.data()))//order-by
              ))
        }

    },[id])
    useEffect(() =>{
        setSeed(Math.floor(Math.random() * 5000));


    },[])
    const createChat = ()=>{
        const roomName = prompt("please enter the name for chatRoom");
        if(roomName){
            //do some clever database stuff...
            addDoc(collection(db,'rooms'),{
                name:roomName
            })
        }

    };
  return !addNewChat  ? (
    <Link to={`/rooms/${id}`}>
        <div className='sidebarChat'>
        <Avatar src = {`https://avatars.dicebear.com/api/human/${seed}.svg`}/>
        <div className='sidebarChat__info'>
            <h2>{name}</h2>
            <p>{messages[0]?.message}</p>
        </div>

    </div>
    </Link>
    
  ):(<div onClick = {createChat} className="sidebarChat">
      <h2>Add new Chat</h2>
  </div>);

}

export default SidebarChat