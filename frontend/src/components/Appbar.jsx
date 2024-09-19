import { useNavigate } from "react-router-dom"

export const Appbar = ({name}) => {
    const navigate=useNavigate();
    return <div className="shadow h-14 flex justify-between">
        <div className="flex flex-col justify-center h-full ml-4 font-bold text-xl">
            zipPay
        </div>
        <div className="flex">
            <button onClick={(e)=>{
                localStorage.removeItem('token')
                navigate('/signin')
            }} className="mx-5 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-1 my-2">Sign Out</button>
            <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                <div className="flex flex-col justify-center h-full text-xl">
                    {name[0]}
                </div>
            </div>
        </div>
    </div>
}