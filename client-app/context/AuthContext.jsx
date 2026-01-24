import { useEffect, useState,useCallback } from "react"
import axios from "axios"
import toast from "react-hot-toast"
import { io } from "socket.io-client"
import { AuthContext } from "./useAuth.js"

const backendUrl = import.meta.env.VITE_BACKEND_URL 
axios.defaults.baseURL = backendUrl

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem("token"))
    const [authUser, setAuthUser] = useState(null)
    const [onlineusers, setOnlineUsers] = useState([])
    const [socket, setSocket] = useState(null)

    const connectSocket = useCallback((userData) => {
        if(!userData || (socket && socket.connected)) return 
        console.log("Connected to: ",backendUrl);
        
        const newSocket = io(backendUrl,{
            query:{
                userId :userData._id
            }
        })

        newSocket.on("connect",()=>{
            console.log("Socket connection Successful:",newSocket.id);
            
        })
        newSocket.on("Error",(error)=>{
            console.log("connection error:",error);
            
        })

        newSocket.on("getOnlineUsers",(userIds)=>{
            setOnlineUsers(userIds)
        })
        newSocket.connect()
        setSocket(newSocket)
    }, [socket])
    
    const checkAuth =useCallback( async () => {
        try {
            const{data}=await axios.get("/api/auth/check")
            if(data.success){
                setAuthUser(data.user)
                connectSocket(data.user)
            }
        } catch (error) {
            toast.error(error.message)
        }
    },[connectSocket])

    const login = async(state,credentials)=>{
        try {
            const {data} = await axios.post(`/api/auth/${state}`,credentials)
            if(data.success){
                setAuthUser(data.user)
                connectSocket(data.user)
                axios.defaults.headers.common["token"] = data.token;
                setToken(data.token)
                localStorage.setItem("token",data.token)
                toast.success(data.message)
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const logout= async () => {
        localStorage.removeItem("token")
        setAuthUser(null)
        setToken(null)
        setOnlineUsers([])
        axios.defaults.headers.common["token"] = null;
        toast.success("Kripya Punah Padhaare")
        if(socket) socket.disconnect();
    }

    const updateProfile = async (body) => {
        try {
            const {data} = await axios.put("/api/auth/update-profile",body)
            if(data.success){
                setAuthUser(data.user)
                toast.success("Jaankari Badal Di Gayi hai")
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    

    useEffect(()=>{
        if(token){
            axios.defaults.headers.common["token"] = token;
        }
        checkAuth();
    },[token,checkAuth])

    const value = {
        axios,
        authUser,
        onlineusers,
        socket,
        login,
        logout,
        updateProfile
    } 
    return(
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}