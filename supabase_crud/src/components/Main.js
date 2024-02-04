import { useState, useEffect } from 'react';
import { supabase } from './supabase';
import Post from './Post';

export default function Read() {
    const [data, setData] = useState([]);
    const [isEditing, setEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState("");
    const [editedContent, setEditedContent] = useState("");
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
    const editRow = async (rowId, title, content) => {
        await supabase
            .from('newTable')
            .update({ 'title': title, 'content': content })
            .eq('id', rowId)
        fetchData()
    }

    const handleEditClick = (rowId, title, content) => {
        setEditing(!isEditing);
        setEditedRowId(rowId);
        setEditedTitle(title);
        setEditedContent(content);
        if (editedRowId !== null) {
            editRow(editedRowId, editedTitle, editedContent);
            setEditedRowId(null);
        }
    };

    const titleChange = (e) => {
        setEditedTitle(e.target.value);
    };

    const contentChange = (e) => {
        setEditedContent(e.target.value);
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

    const inputTitleStyle = {
        width: '100%',
        height: '30px',
        padding: '0 0 0 0',
        border: '1px solid black',
        borderLeftStyle: 'none',
        borderRightStyle: 'none',
        borderBottomStyle: 'none',
        borderTopStyle: 'none',
        fontFamily: 'NanumGothic',
    }

    const inputContentStyle = {
        width: '100%',
        height: '80px',
        padding: '0 0 0 0',
        border: '1px solid black',
        borderLeftStyle: 'none',
        borderRightStyle: 'none',
        borderTopStyle: 'none',
        fontFamily: 'NanumGothic',
    }

    const postStyle = {
        height: "110px",
        display: 'flex',
        justifyContent: 'space-between',
        padding: '15px 10px 0 10px',
        border: '1px solid black',
        borderLeftStyle: 'none',
        borderRightStyle: 'none',
        borderTopStyle: 'none',
        fontSize: '23px',
        fontFamily: 'NanumGothic',
    }

    const contentStyle = {
        margin: '17px 0 0 0',
    }

    const postGroupStyle = {
        height: '600px',
        overflowY: 'auto'
    }

    const editBtn = {
        width: '40px',
        height: '28px',
        backgroundColor: 'white',
        borderRadius: '5px',
        border: '1px solid black'
    }

    const deleteBtn = {
        width: '40px',
        height: '28px',
        backgroundColor: 'white',
        borderRadius: '5px',
        border: '1px solid black',
        margin: '0 0 0 3px'
    }

    const titleEditBtn = {
        display: 'flex',
        margin: '15px 10px 0 0'
    }

    return (
        <div>
            <Post submitFunction={post} />
            <div style={postGroupStyle}>
                {data.map((item) => (
                    <div>
                        {isEditing && editedRowId === item.id ? (
                            <>
                                <div style={titleEditBtn}>
                                    <input
                                        style={inputTitleStyle}
                                        type="text"
                                        defaultValue={item.title}
                                        onChange={titleChange}
                                    />
                                    <button style={editBtn} onClick={() => handleEditClick(item.id)}>수정</button>
                                </div>
                                <input
                                    style={inputContentStyle}
                                    type="text"
                                    defaultValue={item.content}
                                    onChange={contentChange}
                                />
                            </>
                        ) : (
                            <li style={postStyle}>
                                <div>
                                    <div>{item.title}</div>
                                    <div style={contentStyle}>{item.content}</div>
                                </div>
                                <div>
                                    <button style={editBtn} onClick={() => handleEditClick(item.id)}>수정</button>
                                    <button style={deleteBtn} onClick={() => deleteRow(item.id)}>삭제</button>
                                </div>
                            </li>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}