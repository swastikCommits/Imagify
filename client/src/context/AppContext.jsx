import { createContext, useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from 'axios';
import { useNavigate } from "react-router-dom";


export const AppContext = createContext();

const AppContextProvider = (props)=>{
    const [user, setUser] = useState(null);
    const [showLogin, setShowLogin] = useState(false);
    const [token, setToken] = useState(localStorage.getItem('token'));

    const [credit, setCredit] = useState(false);

    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const navigate = useNavigate();


const loadCreditsData = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/user/credits', { headers: { token } });
    
            if (data.success) {
                setCredit(data.credits);
                setUser(data.user);
            } 
        } catch (error) {
            console.error(error);
            toast.error(error.message);
        }
}

const generateImage = async (prompt) => {
    try {
        const { data } = await axios.post(backendUrl + '/api/image/generate-image', { prompt }, { headers: { token } });
        console.log("Response from image generation:", data);

        if (data.resultImage) {
            await loadCreditsData();
            return data.resultImage;
        } else {
            toast.error(data.message || "Failed to generate image.");
            await loadCreditsData();
            if (data.creditBalance === 0) {
                navigate('/buy');
            }
        }
    } catch (error) {
        console.error("Error generating image:", error);
        toast.error(error.response?.data?.message || error.message);
        await loadCreditsData();
        if (error.response?.data?.creditBalance === 0) {
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
            loadCreditsData();
        }
}, [token]);

    const value={
        user, setUser, showLogin, setShowLogin, backendUrl, token, setToken, credit, setCredit, loadCreditsData, logout, generateImage
    }       
    return (
        <AppContext.Provider value={value}>
            {props.children}        
        </AppContext.Provider>
    )   

}

export default AppContextProvider
