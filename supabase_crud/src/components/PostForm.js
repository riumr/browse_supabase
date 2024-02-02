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
        padding: '0 0 0 0',
        border: '1px solid black',
        borderLeftStyle: 'none',
        borderRightStyle: 'none',
        borderBottomStyle: 'none',
        borderRadius: '20px 20px 0 0',
        fontSize: '20px',
    }

    const inputContentStyle = {
        width: '100%',
        height: '80px',
        padding: '0 0 0 0',
        border: '1px solid black',
        borderLeftStyle: 'none',
        borderRightStyle: 'none',
        borderTopStyle: 'none',
        fontSize: '20px',
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
                    placeholder="   Title"
                />
                <input
                    style={inputContentStyle}
                    value={content}
                    onChange={e => setContent(e.target.value)}
                    placeholder="   Content"
                />
            </div>
            <button style={postButtonStyle} onClick={handleOnclickEvent}>post</button>
        </div>
    )
}

