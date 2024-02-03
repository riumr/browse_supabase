import { useState } from "react";

export default function PostForm({ submitFunction }) {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleOnclickEvent = () => {
        submitFunction({ title: title, content: content })
        setTitle("")
        setContent("")
    }

    // 스타일

    const inputTitleStyle = {
        width: '100%',
        height: '40px',
        padding: '0 0 0 10px',
        border: '1px solid black',
        borderLeftStyle: 'none',
        borderRightStyle: 'none',
        borderBottomStyle: 'none',
        borderRadius: '20px 20px 0 0',
        fontSize: '20px',
        boxSizing: 'border-box'
    }

    const inputContentStyle = {
        width: '100%',
        height: '80px',
        padding: '20px 0 0 10px',
        border: '1px solid black',
        borderLeftStyle: 'none',
        borderRightStyle: 'none',
        borderTopStyle: 'none',
        fontSize: '20px',
        boxSizing: 'border-box'
    }

    const postButtonStyle = {
        width: '100%',
        height: '100%',
        margin: "0 0 0 0",
        borderStyle: 'none'
    }

    return (
        <div>
            <div>
                <input
                    style={inputTitleStyle}
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    placeholder="TITLE"
                />
                <textarea
                    style={inputContentStyle}
                    value={content}
                    onChange={e => setContent(e.target.value)}
                    placeholder="CONTENT"
                />
            </div>
            <button style={postButtonStyle} onClick={handleOnclickEvent}>post</button>
        </div>
    )
}

