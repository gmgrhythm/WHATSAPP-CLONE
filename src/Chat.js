import { Avatar } from '@mui/material';
import React, { useState, useEffect } from 'react'
import "./Chat.css";
import { IconButton } from "@mui/material"
import AttachFile from '@mui/icons-material/AttachFile';
import MoreVert from '@mui/icons-material/MoreVert';
import SearchOutlined from '@mui/icons-material/SearchOutlined';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';

import MicIcon from '@mui/icons-material/Mic';
import { useParams } from 'react-router-dom';
import { collection, onSnapshot, doc, getDoc, orderBy, snapshotEqual, addDoc, Firestore, query } from 'firebase/firestore';
import db from './firebase';
import { useStateValue } from './StateProvider';

/*<div className='chat__body'>
        {messages.map(message => (
          <p className={`chat__message ${true &&
            'chat__reciever'}`}>
            <span className='chat__name'>{message.name}</span>
              {message.message}
            <span className='chat__timestamp'>
              {new Date(message.timestamp?.toDate()).toUTCString()}
            </span>

          </p>

        ))}
        
      </div> */


function Chat() {
  const [input, setinput] = useState("");
  const [seed, setSeed] = useState('');
  const { roomId } = useParams();
  const [roomName, setRoomName] = useState("");
  const [messages, setMessages] = useState([]);
  const [{ user }, dispatch] = useStateValue();
  useEffect(() => {
    if (roomId) {
      onSnapshot(doc(collection(db, "rooms"), roomId), (Snapshot) => (
        setRoomName(Snapshot.data().name)
      ))
      onSnapshot(query(collection(doc(collection(db, "rooms"), roomId), "messages"),orderBy('timestamp','asc')), snapshot => (
        setMessages(snapshot.docs.map(doc => doc.data()))//order-by
      ))

    }

  }, [roomId])
  const sendMessage = (e) => {
    e.preventDefault()
    console.log("you typed >>>>", input);
    console.log(user);
    addDoc(collection(doc(collection(db, "rooms"), roomId), "messages"), {
      message: input,
      name: user.displayName,
      timestamp: new Date(),
    })


    setinput("");
  }
  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));


  }, [roomId]);


  return (
    <div className='chat'>
      <div className='chat__header'>
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
        <div className='chat__headerInfo'>
          <h3>{roomName}</h3>
          <p>Last seen {
            new Date(
              messages[messages.length - 1]?.timestamp?.toDate()
            ).toUTCString()
          }</p>
        </div>
        <div className='chat__headerRight'>
          <IconButton>
            <SearchOutlined />
          </IconButton>
          <IconButton>
            <AttachFile />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>

        </div>

      </div>
      <div className='chat__body'>
     

        {messages.map(message => (
          <p className={`chat__message ${ message.name === user.displayName &&
            'chat__reciever'}`}>
            <span className='chat__name'>{message.name}</span>
            {message.message}
            <span className='chat__timestamp'>
              {new Date(message.timestamp?.toDate()).toUTCString()}
            </span>

          </p>

        ))}

      </div>


      <div className='chat__footer'>
        <InsertEmoticonIcon />


        <form>
          <input value={input} onChange={e => setinput(e.target.value)} placeholder="Type a message" type="text" />
          <button onClick={sendMessage} type="submit">Send a meessage</button>
        </form>
        <MicIcon />

      </div>
    </div>
  )
}

export default Chat