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
    const deleteRow = async (rowId) => {
        await supabase
            .from('newTable')
            .delete()
            .eq('id', rowId)
    }
    return (
        <ul>
            {data.map((item) => (
                <>
                    <li key={item.id}>{item.oneColumn}</li>
                    <button onClick={() => deleteRow(item.id)}>Delete</button>
                </>
            ))}
        </ul>
    )
}