import Read from "./components/Read";
import Post from "./components/Post";
import Edit from "./components/Edit";

function App() {
  return (
    <div className="App">
      <h1>Supabase Data</h1>
      <Read />
      <Post />
      <Edit />
    </div>
  );
}

export default App;