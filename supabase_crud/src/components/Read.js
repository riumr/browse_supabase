import { useState, useEffect } from 'react';
import { supabase } from './supabase';

export default function Read() {
    const [data, setData] = useState([]);
    const [isEditing, setEditing] = useState(false);
    const [text, setText] = useState("")
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
    const editRow = async (rowId, text) => {
        await supabase
            .from('newTable')
            .update({ 'oneColumn': text })
            .eq('id', rowId)
        fetchData() // 수정 후 다시 데이터 불러오기
    }

    const handleEditClick = () => {
        setEditing(true);
    };

    const handleBlur = () => {
        setEditing(false);
        editRow()
    };

    const handleInputChange = (e) => {
        setText(e.target.value);
    };

    return (
        <ul>
            {data.map((item) => (
                <>
                    {isEditing ? (
                        <input
                            type="text"
                            value={item.oneColumn}
                            onChange={handleInputChange}
                            onBlur={handleBlur}
                        />
                    ) : (
                        <li key={item.id} onClick={handleEditClick}>{item.oneColumn || text}</li>
                    )}
                    <button onClick={() => deleteRow(item.id)}>Delete</button>
                </>
            ))}
        </ul>
    )
}