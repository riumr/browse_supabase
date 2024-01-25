import { useState } from "react";

export default function PostForm({ runThis }) {
    const [rowId, setRowId] = useState(0);
    const [rowText, setRowText] = useState('');

    const handleOnclickEvent = () => {
        runThis({ id: rowId, oneColumn: rowText })
        setRowId(0)
        setRowText("")
    }

    return (
        <div>
            <label>
                rowId:
                <input
                    value={rowId}
                    onChange={e => setRowId(e.target.value)}
                    type="number"
                />
            </label>
            <label>
                rowText:
                <input
                    value={rowText}
                    onChange={e => setRowText(e.target.value)}
                />
            </label>
            <button onClick={handleOnclickEvent}>post</button>
        </div>
    )
}

