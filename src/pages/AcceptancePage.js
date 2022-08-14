import { useState } from "react"
import axios from "axios"
export default function AcceptancePage() {
    const [total, setTotal] = useState([{ receipt: '' }])
    const addTotal = (e) => {
        e.preventDefault()
        setTotal([...total, { receipt: '' }])
    }

    const addDb = async () => {
        try {
            const response = await axios.post(`http://localhost:3000/acceptance`, {
                receiptNumber: total
            }, {
                headers: {
                    access_token: localStorage.getItem('access_token')
                }
            })
            console.log(response.data);

        }
        catch (err) {
            console.log(err);
        }
    }

    const handleAdd = (e) => {
        e.preventDefault()
        // console.log(total);
        addDb()
    }

    const handleDelete = (e, index) => {
        const list = [...total]
        list.splice(index, 1)
        setTotal(list)
        console.log(index);
    }

    const handleInputChange = (e, index) => {
        const { value, name } = e.target
        const list = [...total]
        list[index][name] = value;
        setTotal(list)
    }
    return (
        <>
            <h1 className="mt-3">acceptance page</h1>
            <div className="mt-5">
                {
                    total.map((el, number) => {
                        return (
                            <>
                                <input onChange={(e) => handleInputChange(e, number)} name="receipt" className="border border-1" placeholder="Receipt Number" />
                                {total.length > 1 ? <p onClick={(e) => handleDelete(e, number)}>delete</p> : null}
                                <br />

                            </>
                        )
                    })


                }

                <br />

                <button onClick={(e) => addTotal(e)} className="bg-black hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">More field</button>
                <button onClick={(e) => handleAdd(e)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Add</button>
            </div>
        </>
    )
}