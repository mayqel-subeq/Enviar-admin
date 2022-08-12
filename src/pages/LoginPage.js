import { useState } from "react"
import { useNavigate } from 'react-router-dom';
import axios from "axios"

export default function LoginPage() {
    const navigate = useNavigate()
    const [inputFormUser, setInputFormUser] = useState({
        email: '',
        password: ''
    })
    const handleInputChange = (e) => {
        e.preventDefault()
        const newInput = {
            ...inputFormUser,
        }
        newInput[e.target.name] = e.target.value
        setInputFormUser(newInput)
    }

    const handleLogin = async (e) => {
        try {
            const response = await axios.post(`http://localhost:3000/login`, {
                email: inputFormUser.email,
                password: inputFormUser.password
            })
            // console.log(response.data);
            localStorage.setItem("access_token", response.data.access_token)
            navigate('/')
        }
        catch (err) {
            console.log(err.response.data.error.message);
        }
        finally {
            setInputFormUser({
                email: '',
                password: ''
            })
        }
    }

    return (
        <div className="mt-4">
            <h1>login</h1>
            <div className="mt-4">
                <input
                    className="border"
                    value={inputFormUser.email}
                    onChange={(e) => handleInputChange(e)}
                    placeholder="Email Address"
                    type="email"
                    name="email"
                />
                <input
                    className=" border ml-3"
                    value={inputFormUser.password}
                    onChange={(e) => handleInputChange(e)}
                    type="password"
                    placeholder="Password"
                    name="password"
                />
                <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-3" onClick={(e) => handleLogin(e)}>Login</button>
            </div>
        </div>
    )
}