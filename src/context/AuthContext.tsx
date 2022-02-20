/* eslint-disable react/react-in-jsx-scope */
// import React, { createContext, Dispatch, ReactElement, SetStateAction, useContext, useEffect, useState } from "react";
// import { CognitoUser } from '@aws-amplify/auth';
// import { Auth, Hub } from "aws-amplify";

// const userContext = createContext<CognitoUser | null>(null)
// interface UserContextType {
//     user: CognitoUser | null;
//     setUser: Dispatch<SetStateAction<CognitoUser>>
// }

// interface Props {
//     children: React.ReactElement
// }

// // eslint-disable-next-line no-empty-pattern
// export const AuthContext = ({children}: Props): ReactElement => {
//     const [user, setUser] = useState<UserContextType>({} as UserContextType)
//     useEffect(() => {
//         checkUser()
//     }, [])
//     useEffect(() => {
//         Hub.listen('auth', () => {
//             checkUser()
//         })
//     }, [])
//     const checkUser = async () => {
//         try{
//             const amplifyUser = await Auth.currentAuthenticatedUser()
//             setUser(amplifyUser)
//             // if(amplifyUser) {
//                 // setUser(amplifyUser)
//             // }
//         }catch(error) {
//             setUser(null)
//         }
//     }
//     return (
//         <userContext.Provider value={{user, setUser}}>
//             {children}
//         </userContext.Provider>
//     )
// }

// export const useUser = () : UserContextType => useContext(userContext)


import {
  createContext,
  Dispatch,
  ReactElement,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { CognitoUser } from "@aws-amplify/auth";
import { Auth, Hub } from "aws-amplify";

interface UserContextType {
  user: CognitoUser | null;
  setUser: Dispatch<SetStateAction<CognitoUser>>;
}

const UserContext = createContext<UserContextType>({} as UserContextType);

interface Props {
  children: React.ReactElement;
}

export default function AuthContext({ children }: Props): ReactElement {
  const [user, setUser] = useState<CognitoUser | null>(null);

  useEffect(() => {
    checkUser();
  }, []);

  useEffect(() => {
    Hub.listen("auth", () => {
      // perform some action to update state whenever an auth event is detected.
      checkUser();
    });
  }, []);

  async function checkUser() {
    try {
      const amplifyUser = await Auth.currentAuthenticatedUser();
      setUser(amplifyUser);
    } catch (error) {
      // No current signed in user.
      console.error(error);
      setUser(null);
    }
  }

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = (): UserContextType => useContext(UserContext);


