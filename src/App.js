import Chat from './Chat';
import './App.css';
import Sidebar from './Sidebar';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { useState } from 'react';
import Login from './Login';
import {useStateValue} from './StateProvider';
function App() {
  const [{user},dispatch] = useStateValue();
  return (
    //BEM naming convention
    <div className="app">
      {
      !user ? (
           <Login/>
      ):
      (
        <div className="app__body">
        <BrowserRouter>
        <Sidebar />
          <Routes>
              <Route path="/rooms/:roomId" element={<> <Chat /></>} />
              <Route path='/' element={<> <Chat /></>} />
          </Routes>
        </BrowserRouter>
      </div>
      )}
     
    </div >
  );
}

export default App;
