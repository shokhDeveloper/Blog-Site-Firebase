import {Routes, Route} from "react-router-dom"
import { Header } from './Components';
import { CreatePost, Home, Sign, UpdatePost } from './Pages';
function App() {
  
  return (
    <div className="App">
      <Header/>
      <main>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/create-post' element={<CreatePost/>}/>
        <Route path='/sign' element={<Sign/>}/>
        <Route path='/posts/:postId' element={<UpdatePost/>}/>
      </Routes>
      </main>
    </div>
  );
}

export default App;
