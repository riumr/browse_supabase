import { useState, useEffect } from 'react';
import { supabase } from './supabase';

export default function Read() {
    const [data, setData] = useState([]);
    useEffect(() => {
        fetchData()
    }, []);
    const fetchData = async () => {
        try {
            let { data, error } = await supabase
                .from('newTable')
                .select('*');

            if (error) {
                console.error(error);
            }
            setData(data || []);
        } catch (error) {
            console.error('Error fetching data:', error.message);
        }
    }
    fetchData()
    return (
        <div>
            <ul>
                {data.map((item) => (
                    <li key={item.id}>{item.oneColumn}</li>
                ))}
            </ul>
        </div>
    )
}