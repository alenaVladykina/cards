import React from "react";
import {createBrowserRouter} from "react-router-dom";
import {App} from "../../app/App";
import {AuthorisationForm} from "../../features/auth/authorisationForm/AuthorisationForm";
import {Packs} from "../../features/packs/Packs";
import {Profile} from "../../features/profile/Profile";
import {GlobalError} from "../GlobalError";
import {ProtectedRoute} from "./ProtectedRoute";
import {Cards} from "../../features/cards/Cards";
import {RegistrationForm} from "../../features/auth/registrationForm/RegistrationForm";
import {MessageForm} from "../../features/auth/messageForm/MessageForm";
import {ChangeEmailForm} from "../../features/auth/chandeEmailForm/ChandeEmailForm";
import {ChangePasswordForm} from "../../features/auth/changePasswordForm/ChagePasswordForm";


const publicRoutes = [
  {
    path: '/auth',
    element: <AuthorisationForm/>,
  },
  {
    path: "/registration",
    element: <RegistrationForm/>,
  },
  {
    path: "/request-password",
    element: <ChangeEmailForm/>,
  },
  {
    path: "/set-new-password",
    element: <MessageForm/>,
  },
  {
    path: "/set-new-password/new-password/:token",
    element: <ChangePasswordForm/>,
  },
  {
    path: 'profile',
    element: <Profile/>
  },

]


const privateRoutes = [
  {
    path: 'packs',
    element: (
      <ProtectedRoute>
        <Packs/>
      </ProtectedRoute>
    ),
  },
  {
    //path: 'packs/:packId/cards/:cardId',
    path: 'packs/:packId/:cardId',
    element:
      <ProtectedRoute>
        <Cards/>
      </ProtectedRoute>,
  }


]


export const router = createBrowserRouter([
  ...publicRoutes,
  {
    path: '/',
    element: <App/>,
    //errorElement: <GlobalError/>,
    children: privateRoutes
  }
]);


// export const router = createHashRouter([
//   // {
//   //   path: "/",
//   //   element: <App/>,
//   // },
//   {
//     path: "/",
//     element: <AuthorisationForm/>,
//   },
//   {
//     path: "/registration",
//     element: <RegistrationForm/>,
//   },
//   {
//     path: '/packs/:packId',
//     element: <Packs/>,
//   },
//   {
//     path: '/packs/:packId/cards/:cardId',
//     element: <Cards/>,
//   },
//   {
//     path: "/request-password",
//     element: <ChangeEmailForm/>,
//   },
//   {
//     path: "/set-new-password/",
//     element: <MessageForm/>,
//   },
//   {
//     path: "/set-new-password/new-password/:token",
//     element: <ChangePasswordForm/>,
//   },
//   {
//     path: "/profile",
//     element: <Profile/>,
//   }
// ]);

