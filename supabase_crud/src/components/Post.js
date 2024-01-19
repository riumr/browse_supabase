import { useState } from "react";
import { supabase } from "./supabase"

export default function Post() {
    const [rowId, setRowId] = useState(0);
    const [rowText, setRowText] = useState('');
    const post = async () => {
        await supabase
            .from('newTable')
            .insert({ id: rowId, oneColumn: rowText })
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
            <button onClick={post}>post</button>
        </div>
    )
}

