import Read from "./components/Read";
import Post from "./components/Post";
import Edit from "./components/Edit";
import Form from "./components/Form";

function App() {
  return (
    <div className="App">
      <h1>Supabase Data</h1>
      <Form />
      <Read />
      <Post />
      <Edit />
    </div>
  );
}

export default App;