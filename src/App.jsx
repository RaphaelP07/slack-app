import './App.css';
import Header from './components/Header'
import SideBar from './components/SideBar'
import Chat from './components/Chat'

function App() {
  return (
    <div className="main-container">
      <Header />
      <SideBar />
      <Chat />
    </div>
  );
}

export default App;
