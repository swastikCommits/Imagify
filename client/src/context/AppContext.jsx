import { createContext, useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from 'axios';

export const AppContext = createContext();

const AppContextProvider = (props)=>{
    const [user, setUser] = useState(null);
    const [showLogin, setShowLogin] = useState(false);
    const [token, setToken] = useState(localStorage.getItem('token'));

    const [credit, setCredit] = useState(false);

    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const navigate = useNavigate();


    const loadCreditData = async () => {
        try {
            const {data} = await axios.get(backendUrl + '/api/user/credits', {headers: {token}});

            if(data.success){
                setCredit(data.credits);
                setUser(data.user);
            }
        } catch (error) {
            console.error(error);  
            toast.error(error.message);     
        }
    }

    const generateImage = async (prompt) => {
        try{
            const {data} = await axios.post(backendUrl + '/api.image/generate-image', {prompt}, {headers: {token}});

            if(data.success){
                loadCreditData;
                return data.resultImage;
            }
        }
        catch(error){
            toast.error(data.message);
            loadCreditData();
            if(data.creditBalance === 0){
                navigate('/buy');
            }
    }
}
    const logout = () => {
        localStorage.removeItem('token');
        setToken('');
        setUser(null);
    }
    useEffect(() => {
        if(token){
            loadCreditData();
        }
    }, [token]);

    const value={
        user, setUser, showLogin, setShowLogin, backendUrl, token, setToken, credit, setCredit, loadCreditData, logout
    }       
    return (
        <AppContext.Provider value={value}>
            {props.children}        
        </AppContext.Provider>
    )   

}

export default AppContextProvider
