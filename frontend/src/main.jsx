import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router'
import TodoContextProvider from './context/TodoContextProvider.jsx'
import UserContextProvider from './context/UserContextProvider.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    
      <UserContextProvider>
        <TodoContextProvider>
          <App />
        </TodoContextProvider>
      </UserContextProvider>
    
  </BrowserRouter>,
)
