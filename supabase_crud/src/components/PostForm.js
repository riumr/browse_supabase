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
        height: '30px',
        padding: '0 0 0 0',
        border: '1px solid black',
        borderLeftStyle: 'none',
        borderRightStyle: 'none',
        borderBottomStyle: 'none',
        borderRadius: '20px 20px 0 0'
    }

    const inputContentStyle = {
        width: '100%',
        height: '80px',
        padding: '0 0 0 0',
        border: '1px solid black',
        borderLeftStyle: 'none',
        borderRightStyle: 'none',
        borderTopStyle: 'none',
    }

    const postButtonStyle = {
        width: '100%',
        height: '100%',
        margin: "0 0 0 0",
        borderStyle: 'none'
    }

    const testStyle = {
        position: 'sticky',
        top: '90px'
    }

    return (
        <div style={testStyle}>
            <div>
                <input
                    style={inputTitleStyle}
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                />
                <input
                    style={inputContentStyle}
                    value={content}
                    onChange={e => setContent(e.target.value)}
                />
            </div>
            <button style={postButtonStyle} onClick={handleOnclickEvent}>post</button>
        </div>
    )
}

