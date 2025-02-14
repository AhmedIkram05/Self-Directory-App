import React from 'react'
import ReactDOM from 'react-dom/client'
import StaffDirectory from './pages/SelfDirectoryApp'
import UserProfile from './pages/Profile'

// Determine which component to render based on the current page
const isProfilePage = window.location.pathname.includes('profile.html');
const Component = isProfilePage ? UserProfile : StaffDirectory;

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Component />
  </React.StrictMode>
)
