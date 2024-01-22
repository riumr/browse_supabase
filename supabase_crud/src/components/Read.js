import { useState, useEffect } from 'react';
import { supabase } from './supabase';

export default function Read() {
    const [data, setData] = useState([]);
    const [isEditing, setEditing] = useState(false);
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

    // 열 삭제
    const deleteRow = async (rowId) => {
        await supabase
            .from('newTable')
            .delete()
            .eq('id', rowId)
    }

    // 열 수정
    const editRow = async (rowId) => {
        await supabase
            .from('newTable')
            .update({ 'oneColumn': 'column changed' })
            .eq('id', rowId)
    }

    const handleEditClick = () => {
        setEditing(true);
    };

    const handleBlur = () => {
        setEditing(false);
    };

    return (
        <ul>
            {data.map((item) => (
                <>
                    {isEditing ? (
                        <input
                            type="text"
                            value={item.oneColumn}
                            onChange={editRow}
                            onBlur={handleBlur}
                        />
                    ) : (
                        <li key={item.id} onClick={handleEditClick}>{item.oneColumn}</li>
                    )}
                    <button onClick={() => deleteRow(item.id)}>Delete</button>
                    <button onClick={() => editRow(item.id)}>Edit</button>
                </>
            ))}
        </ul>
    )
}