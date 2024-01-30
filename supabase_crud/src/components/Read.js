import { useState, useEffect } from 'react';
import { supabase } from './supabase';
import PostForm from './PostForm';

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
        setEditing(!isEditing);
        setEditedRowId(rowId);
        setEditedText(oneColumn);
        if (editedRowId !== null) {
            editRow(editedRowId, editedText);
            setEditedRowId(null);
        }
    };

    const onChangeFunction = (e) => {
        setEditedText(e.target.value);
    };

    // 열 추가
    const post = async (inputFromComponent) => {
        try {
            await supabase
                .from('newTable')
                .insert(inputFromComponent)
            fetchData()
        } catch (error) {
            console.error(error.message)
        }
    }

    const postStyle = {
        height: "80px",
        display: 'flex',
        justifyContent: 'space-between',
        padding: '15px 10px 0 10px',
        border: '1px solid black'
    }

    return (
        <>
            <PostForm submitFunction={post} />
            <div>
                {data.map((item) => (
                    <div>
                        {isEditing && editedRowId === item.id ? (
                            <>
                                <input
                                    style={postStyle}
                                    type="text"
                                    value={editedText}
                                    onChange={onChangeFunction}
                                />
                                <button onClick={() => handleEditClick(item.id)}>Update</button>
                            </>
                        ) : (
                            <li style={postStyle}>
                                {item.oneColumn}
                                <div>
                                    <button onClick={() => handleEditClick(item.id)}>수정</button>
                                    <img src="{deleteButton}" alt="deleteButton" onClick={() => deleteRow(item.id)} />

                                </div>
                            </li>
                        )}
                    </div>
                ))}
            </div>
        </>
    )
}