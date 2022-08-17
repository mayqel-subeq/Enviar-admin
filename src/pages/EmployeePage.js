import { useState, useEffect } from "react"
import axios from 'axios'
import EmployeeTableComponent from "../components/EmployeeTableComponent"
import ModalEdit from "../components/ModalEdit"

export default function EmployeePage() {

    const [employee, setEmployee] = useState([])
    const [emplo, setEmplo] = useState({})
    const [loading, setLoading] = useState(true)
    const [showModal, setShowModal] = useState(false)
    const getEmployee = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/getEmployee`, {
                headers: {
                    access_token: localStorage.getItem("access_token")
                }
            })
            // console.log(response.data.data);
            setEmployee(response.data.data)
            setLoading(false)
        }
        catch (err) {
            console.log(err);
        }
    }

    const deleteEmployee = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:3000/deleteEmployee/${id}`, {
                headers: {
                    access_token: localStorage.getItem("access_token")
                }
            })

            console.log(response.data.message);
            getEmployee()
        }
        catch (err) {
            console.log(err);
        }
    }

    const getEmployeeById = async (id) => {
        try {
            const response = await axios.get(`http://localhost:3000/getEmployeeId/${id}`, {
                headers: {
                    access_token: localStorage.getItem("access_token")
                }
            })
            console.log(response.data);
            setEmplo(response.data)
            if (emplo.firstname) {
                setShowModal(true)

            }
        }
        catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getEmployee()
    }, [])
    if (loading) {
        return (
            <h1>loading</h1>
        )
    }
    if (!loading) {

        return (
            <>
                <h1>ini employee page</h1>
                <div className="mt-5" >

                    <EmployeeTableComponent lists={employee} funcId={getEmployeeById} funcDelete={deleteEmployee} />
                    <ModalEdit show={showModal} setShow={setShowModal} data={emplo} setData={setEmplo} getAll={getEmployee} />
                </div>
            </>
        )
    }
}