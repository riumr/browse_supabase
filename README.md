# browse_supabase
### layout
![main-image](readme_image/main-page.png)
![전체레이아웃](readme_image/spaCollapseImg01.png)
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
![출력칸](readme_image/spaCollapseImg03.png)
![수정및삭제](readme_image/spaCollapseImg04.png)