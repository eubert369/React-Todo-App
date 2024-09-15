// import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home';
// import Todo from './Todos';
// import CreateTodo from './Create';
// import DoneTodo from './Done';

function App() {
  return (
    <div className="App">
      <div className='container-fluid bg-dark min-vh-100'>
        <div className='container'>
          <BrowserRouter>
            <Routes>
              <Route exact path='/' element={<Home />} />
              {/* <Route path='/create' element={ <CreateTodo /> } />
            <Route path='/done' element={ <DoneTodo /> } /> */}
            </Routes>
          </BrowserRouter>
        </div>
      </div>
    </div>
  );
}

export default App;
