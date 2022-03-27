import './App.css';
import Navbar from './components/navbar'
import MainContent from './components/main-content';
import Footer from './components/footer';
import Login from './components/login';
import ClientSignup from './components/client-signup';
import WorkerSignup from './components/worker-signup';
import AccountType from './components/account-type';

function App() {
  return (
    <div className="App">
      {/* <Navbar /> */}
      {/* <MainContent /> */}
      {/* <Login /> */}
      <AccountType />
      {/* <ClientSignup /> */}
      {/* <WorkerSignup /> */}
      {/* <Footer /> */}
    </div>
  );
}

export default App;
