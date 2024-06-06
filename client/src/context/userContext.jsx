/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import newRequest from '@/utils/axios-utils';
import { createContext, useEffect, useState } from 'react';

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
    const [user, setUser] = useState({});

    const isObjectEmpty = objectName => {
        return (
            Object.keys(objectName).length === 0 &&
            objectName.constructor === Object
        );
    };

    useEffect(() => {
        if (isObjectEmpty(user)) {
            newRequest
                .get('/users/token/getProfile')
                .then(({ data }) => setUser(data));
        }
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
}
