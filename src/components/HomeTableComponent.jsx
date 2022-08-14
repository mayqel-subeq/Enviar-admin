import { useNavigate } from 'react-router-dom'

export default function HomeTableComponent({ lists }) {
    const navigate = useNavigate()
    const openDetail = (e, id) => {
        e.preventDefault()
        navigate(`package/${id}`)
    }
    return (
        <table class="hover:table-fixed border-separate border border-slate-400">
            <thead>
                <tr>
                    <th className="border border-slate-300">Receipt Number</th>
                    <th className="border border-slate-300">Product Type</th>
                    <th className="border border-slate-300">Status</th>
                    <th className="border border-slate-300">Action</th>
                </tr>
            </thead>
            <tbody>
                {
                    lists.map(el => {
                        return (
                            <tr>
                                <td className="border border-slate-300">{el[0].Product.receiptNumber}</td>
                                <td className="border border-slate-300">{el[0].Product.typeProduct}</td>
                                <td className="border border-slate-300">{el[0].notes}</td>
                                <td className="border border-slate-300">
                                    <button onClick={(e) => openDetail(e, el[0].id)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                        Detail
                                    </button>

                                </td>
                            </tr>
                        )
                    })
                }
                {/* <tr>
                        <td>The Sliding Mr. Bones (Next Stop, Pottersville)</td>
                        <td>Malcolm Lockyer</td>
                        <td>1961</td>
                    </tr> */}

            </tbody>
        </table>
    )
}