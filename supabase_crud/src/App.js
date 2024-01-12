const { createClient } = require('@supabase/supabase-js')
const SUPABASE_URL = process.env.REACT_APP_SUPABASE_URL
const SUPABASE_KEY = process.env.REACT_APP_SUPABASE_KEY

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

function App() {
  const main = async () => {
    let { data, error } = await supabase
      .from('newTable')
      .select("*")

    if (error) {
      console.error(error)
    }

    console.log(data)
  }

  main()
  return (
    <div className="App">
    </div>
  );
}

export default App;
