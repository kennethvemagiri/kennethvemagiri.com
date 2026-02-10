/**
 * Main entry point for the React application
 * This file initializes React and mounts the App component to the DOM
 */

import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'

const root = document.getElementById('root')
if (root) {
  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <BrowserRouter basename="/featured-projects/MWF">
        <App />
      </BrowserRouter>
    </React.StrictMode>,
  )
}

