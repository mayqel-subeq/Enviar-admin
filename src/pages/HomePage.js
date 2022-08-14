import axios from "axios"
import { useState, useEffect } from "react"
import NavbarComponent from "../components/NavbarComponent"
import HomeTableComponent from "../components/HomeTableComponent"
export default function HomePage() {
    const [listPackage, setListPackage] = useState([])
    const getListPackage = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/listStoreStatus`, {
                headers: {
                    'access_token': localStorage.getItem('access_token')
                }
            })
            // console.log(response.data);
            setListPackage(response.data)
        }
        catch (err) {
            console.log(err);
        }

    }
    useEffect(() => {
        getListPackage()
    }, [])
    if (!listPackage) {
        return (
            <h3>loading</h3>
        )
    }
    if (listPackage) {
        return (
            <>
                <NavbarComponent />
                <h1>home page</h1>
                <HomeTableComponent lists={listPackage} />
            </>
        )

    }
}