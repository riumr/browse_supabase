import { useState } from "react";

export default function PostForm({ submitFunction }) {
    const [rowId, setRowId] = useState(0);
    const [rowText, setRowText] = useState('');

    const handleOnclickEvent = () => {
        submitFunction({ id: rowId, oneColumn: rowText })
        setRowId(0)
        setRowText("")
    }

    // 스타일
    const inputIdStyle = {
        width: '100%',
        padding: '0 0 0 0',
        margin: '20px 0 0 0',
        border: 'none',
    }

    const inputTextStyle = {
        width: '100%',
        height: '80px',
        padding: '0 0 0 0',
        margin: '0 0 0 0',
        border: 'none',
        verticalAlign: 'top',
    }

    const postButtonStyle = {
        width: '100%',
    }

    return (
        <div>
            <div>
                <input
                    style={inputIdStyle}
                    value={rowId}
                    onChange={e => setRowId(e.target.value)}
                    type="number"
                />
            </div>
            <div>
                <input
                    style={inputTextStyle}
                    value={rowText}
                    onChange={e => setRowText(e.target.value)}
                />
            </div>
            <button style={postButtonStyle} onClick={handleOnclickEvent}>post</button>
        </div>
    )
}

