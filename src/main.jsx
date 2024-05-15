import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Mail } from '@mui/icons-material'
import Main from './Resume/Main.jsx'
// import {Auth0Provider} from "@auth0/auth0-react"

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  //   <Main/>
  // </React.StrictMode>,
//   <Auth0Provider
//   domain="dev-2xdvey2e5vdy8yh7.us.auth0.com"
//   clientId="dNCRGizrJyXn46OGVPDrUmYRM93AIeR5"
//   authorizationParams={{
//     redirect_uri: window.location.origin
//   }}
// >
  <Main />
/* </Auth0Provider>, */

)
