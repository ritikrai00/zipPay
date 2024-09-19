import { useEffect, useState } from "react";
import { Appbar } from "../components/Appbar";
import { Balance as BalanceComponent } from "../components/Balance";
import { Users } from "../components/Users";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Dashboard = () => {
    const [balance, setBalance] = useState(0);
    const [name, setName]=useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const navigate= useNavigate();

    const fetchBalance = async () => {
        try {
            const response = await axios.get('https://zip-pay-api.vercel.app/api/v1/account/balance', {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem("token"),
                },
            });
            setBalance(response.data.balance);
            setName(response.data.name);
        } catch (error) {
            setError('Incorrect credentials! Please signin');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBalance();
    }, []);
    
    if (loading) return <div>Loading...</div>;
    if (error) {
        setTimeout(() => {
            navigate('/signin');
        }, 2500);

        return (
            <div>
                {error}
            </div>
        );
    }

    return (
        <div>
            <Appbar name={name} />
            <div className="m-8">
                <h1 className="text-xl font-semibold">{name}</h1>
                <BalanceComponent value={balance} />
                <Users />
            </div>
        </div>
    );
};
