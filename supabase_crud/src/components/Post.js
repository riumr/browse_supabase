import { supabase } from "./supabase"

export default function Post() {
    return (
        <div>
            <button onClick={post}>post</button>
        </div>
    )
}

const post = async () => {
    await supabase
        .from('newTable')
        .insert({ id: "5", oneColumn: 'added' })
}