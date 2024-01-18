import { useState } from 'react';

export default function Form() {
    const [rowId, setRowId] = useState(0);
    const [rowText, setRowText] = useState('');
    return (
        <>
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
        </>
    );
}
