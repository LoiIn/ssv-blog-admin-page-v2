import React, {useState, useEffect} from 'react';

export const AdminContext = React.createContext();

const AdminContextProvider = ( {children} ) => {
    const [admin, setAdmin] = useState(
        localStorage.getItem('admin') === null ? 
        {
            email: "",
            name: "",
            birthday: "",
            social_link: "",
        } 
        : localStorage.getItem('admin')
    );

    useEffect( () => {
        localStorage.setItem('admin', admin);
    }, []);

    return (
        <AdminContext.Provider value={[admin, setAdmin]}>
            {children}
        </AdminContext.Provider>
    )
}

export default AdminContextProvider;