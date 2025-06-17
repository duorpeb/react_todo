// CSS
import './shared/css/App.css';
import './shared/css/reset.css';

// React HooK
import React, { useState } from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import { RefreshContext } from './RefeshContext';
import { DarkContext } from './DarkContext';

// MyFile
import HeadPrint from './init/HeadPrint';
import InitPrint from './init/InitPrint';
import List from './printlist/List';
import MyCalendar from './printcalendar/MyCalendar';
import MoreVIew from './viewid/MoreVIew';
import ToDoUpdate from './updateid/ToDoUpdate';

function App() {
  const [refresh, setRefresh] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <>
    <DarkContext.Provider    value={{ darkMode, setDarkMode }}>
    <RefreshContext.Provider value={{ refresh, setRefresh }}>
      <BrowserRouter>
        <div 
          className="body"
          style = {{
            backgroundColor : darkMode ? '#7a7a7a' : 'transparent'
          }}
          >
        <div id = "tit">
          <Link to = '/'>
            <h2>To do App</h2>
            {/* <span>
            <img src = './shared/img/logo.png' />
            </span> */}
          </Link> 
        </div>
            
          <Routes>
            <Route 
              path="/" 
              element={
                <>
                  <HeadPrint />
                  <InitPrint />
                </>
              } 
            />

            <Route 
              path="/insert"
              element={
                <>
                  <HeadPrint /> 
                  <InitPrint />
                </>
              }
            />

            <Route 
              path="/printlist" 
              element={
                <>
                  <HeadPrint />
                  <List />
                </>
              } 
            />

            <Route 
              path="/printcalendar" 
              element={
                <>
                  <HeadPrint />
                  <MyCalendar />
                </>
              } 
            />

            <Route 
              path="/view/:id"
              element={
                <>
                  <HeadPrint />
                  <MoreVIew />
                </>
              }
            />

            <Route 
              path="/update/:id"
              element={
                <>
                  <HeadPrint />
                  <ToDoUpdate />
                </>
              }
            />
            
            <Route 
              path="/category/:category"
              element={
                <>
                  <HeadPrint />
                </>
              }
            />
          </Routes>
        </div>
      </BrowserRouter>
    </RefreshContext.Provider>
    </DarkContext.Provider>
    </>
  );
}

export default App;
