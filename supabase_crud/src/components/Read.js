import { useState, useEffect } from 'react';
import { supabase } from './supabase';

export default function Read() {
    const [data, setData] = useState([]);
    const [isEditing, setEditing] = useState(false);
    const [editedText, setEditedText] = useState("");
    const [editedRowId, setEditedRowId] = useState(null);

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

    // 열 삭제
    const deleteRow = async (rowId) => {
        await supabase
            .from('newTable')
            .delete()
            .eq('id', rowId)
        fetchData()
    }

    // 열 수정
    const editRow = async (rowId, text) => {
        await supabase
            .from('newTable')
            .update({ 'oneColumn': text })
            .eq('id', rowId)
        fetchData()
    }

    const handleEditClick = (rowId, oneColumn) => {
        setEditing(true);
        setEditedRowId(rowId);
        setEditedText(oneColumn);
    };

    const handleBlur = () => {
        if (editedRowId !== null) {
            setEditing(false);
            editRow(editedRowId, editedText);
            setEditedRowId(null);
        }
    };

    const handleInputChange = (e) => {
        setEditedText(e.target.value);
    };

    return (
        <ul>
            {data.map((item) => (
                <>
                    {isEditing && editedRowId === item.id ? (
                        <input
                            type="text"
                            value={editedText}
                            onChange={handleInputChange}
                            onBlur={handleBlur}
                        />
                    ) : (
                        <li onClick={() => handleEditClick(item.id, item.oneColumn)}>
                            {item.oneColumn}
                        </li>
                    )}

                    <button onClick={() => deleteRow(item.id)}>Delete</button>
                </>
            ))}
        </ul>
    )
}