import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useEffect } from 'react'

const CountdownVoucher = () => {
    const idVoucher = '66b37d03f6af5d85e5cfffab';

    const { data, isLoading, isError } = useQuery({
        queryKey: ['voucher'],
        queryFn: async () => {
            const { data } = await axios.get(`http://localhost:8080/api/voucher/${idVoucher}`);
            return data;
        }
    });

    useEffect(() => {
        if (data?.countdown) {
            startCountdown(data.countdown);
        }
    }, [data]);

    function startCountdown(timeRemaining: number) {
        const countdownElement = document.getElementById('countdown');

        if (!countdownElement) return;

        const interval = setInterval(() => {
            if (timeRemaining <= 0) {
                clearInterval(interval);
                countdownElement.innerText = "Voucher đã hết hạn";
                return;
            }

            const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

            countdownElement.innerText = `${days}d ${hours}h ${minutes}m ${seconds}s`;

            timeRemaining -= 1000;
        }, 1000);
    }

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error</div>;
    return (
        <div>
            <h1>Voucher: {data?.voucher.code}</h1>
            <div id="countdown"></div>
        </div>
    );
}

export default CountdownVoucher;
