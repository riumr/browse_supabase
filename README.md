# browse_supabase
> **전체 레이아웃**

![전체레이아웃](readme_image/spaCollapseImg01.png)

> **입력 칸**

![입력칸](readme_image/spaCollapseImg02.png)

```javascript
// Post.js
export default function Post({ submitFunction }) {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleOnclickEvent = () => {
        submitFunction({ title: title, content: content })
        setTitle("")
        setContent("")
    }
    return (
        <div>
            <div style={inputDivStyle}>
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
            <button style={postButtonStyle} onClick={handleOnclickEvent}>POST</button>
        </div>
    )
}
// Main.js
export default function Main() {
    // ...
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
    // ...
    return (
        // ...
        <Post submitFunction={post} />
        // ...
    )
}
```

> **출력 칸**

![출력칸](readme_image/spaCollapseImg03.png)

```javascript
// Main.js
const [data, setData] = useState([]);
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
```

> **수정 및 삭제**

![수정및삭제](readme_image/spaCollapseImg04.png)

```javascript
// Main.js
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
return (
    <div style={postGroupStyle}>
        {data.map((item) => (
            <div>
                {isEditing && editedRowId === item.id ? (
                    <div>
                        <div style={titleEditBtn}>
                            <input
                                style={inputTitleStyle}
                                type="text"
                                defaultValue={item.title}
                                onChange={titleChange}
                            />
                            <button className='editBtn' onClick={() => handleEditClick(item.id)}>수정</button>
                        </div>
                        <input
                            style={inputContentStyle}
                            type="text"
                            defaultValue={item.content}
                            onChange={contentChange}
                        />
                    </div>
                ) : (
                    <li style={postStyle}>
                        <div>
                            <div>{item.title}</div>
                            <div style={contentStyle}>{item.content}</div>
                        </div>
                        <div>
                            <button className='editBtn' onClick={() => handleEditClick(item.id)}>수정</button>
                            <button className='deleteBtn' onClick={() => deleteRow(item.id)}>삭제</button>
                        </div>
                    </li>
                )}
            </div>
        ))}
    </div>
)
```