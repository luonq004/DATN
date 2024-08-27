import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useEffect, useRef } from 'react'

const CountdownVoucher = () => {
    const { data, isLoading, isError } = useQuery({
        queryKey: ['voucher'],
        queryFn: async () => {
            const { data } = await axios.get(`http://localhost:8080/api/voucher`);
            return data;
        }
    });

    const intervals = useRef<{ [key: string]: NodeJS.Timeout }>({}); // Lưu trữ các interval

    useEffect(() => {
        if (data) {
            data.forEach((item: any) => {
                if (item.countdown) {
                    startCountdown(item.countdown, item.voucher._id);
                }
            });
        }

        document.addEventListener("visibilitychange", handleVisibilityChange);

        return () => {
            Object.values(intervals.current).forEach(clearInterval);
            document.removeEventListener("visibilitychange", handleVisibilityChange);
        };
    }, [data]);

    const handleVisibilityChange = () => {
        if (document.hidden) {
            // Dừng countdown khi tab không còn visible
            Object.values(intervals.current).forEach(clearInterval);
        } else {
            // Bắt đầu lại countdown khi tab visible
            if (data) {
                data.forEach((item: any) => {
                    if (item.countdown) {
                        startCountdown(item.countdown, item.voucher._id);
                    }
                });
            }
        }
    };

    function startCountdown(timeRemaining: number, id: string) {
        const countdownElement = document.getElementById(`countdown-${id}`);

        if (!countdownElement) return;

        intervals.current[id] = setInterval(() => {
            if (timeRemaining <= 0) {
                clearInterval(intervals.current[id]);
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
            <h1>Voucher:</h1>
            {data.map((item: any) => (
                <div key={item.voucher._id} style={{ marginBottom: '20px' }}>
                    <h2>{item.voucher.code}</h2>
                    <div id={`countdown-${item.voucher._id}`}></div>
                </div>
            ))}
        </div>
    );
}

export default CountdownVoucher;
