import './App.css';
import Navbar from './components/Navbar';
import Signup from './pages/Signup';
import AllRoutes from './routes/AllRoutes';
function App() {
  return (
    <div className="App">
       <Navbar />
       <AllRoutes />
    </div>
  );
}

export default App;
