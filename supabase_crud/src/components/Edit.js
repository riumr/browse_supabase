import { supabase } from "./supabase"

export default function Edit() {
    return (
        <div>
            <button onClick={edit}>Edit</button>
        </div>
    )
}

const edit = async () => {
    await supabase
        .from('newTable')
        .update({ 'oneColumn': 'column changed' })
        .eq('id', 1)
}