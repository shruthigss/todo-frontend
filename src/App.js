import './App.css';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Signup from './components/signup/signup';
import Signin from './components/signin/signin';
import Home from './components/Home/Home';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
      <Route exact path="/" element={<Signin/>}/>
        <Route exact path="/signup" element={<Signup/>}/>
        <Route exact path="/signin" element={<Signin/>}/>
        <Route exact path="/home" element={<Home/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;