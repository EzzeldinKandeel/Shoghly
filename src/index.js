import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Login from './routes/login'
import HomeScreen from './routes/HomeScreen'
import ChooseAccountType from './routes/ChooseAccountType'
import WorkerSignUp from './routes/WorkerSignUp';
import ClientSignUp from './routes/ClientSignUp';
import Profession from './routes/professions';
import SingleProfession from './routes/SingleProfession';
import WorkerPage from './routes/WorkerPage';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path='' element={<HomeScreen />} />
        <Route path="login" element={<Login />} />
        <Route path='choose-account-type' element={<ChooseAccountType />} />
        <Route path='signup-as-a-worker' element={<WorkerSignUp />} />
        <Route path='signup-as-a-client' element={<ClientSignUp />} />
        <Route path='professions' element={<App />}>
          <Route path='' element={<Profession />} />
          <Route path=':professionEnglish' element={<SingleProfession />} />
        </Route>
        <Route path='worker-:workerId' element={<WorkerPage />} />
      </Route>
    </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
