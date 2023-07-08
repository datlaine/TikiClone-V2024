import ReactDOM from 'react-dom/client';
import '../src/component/Main/main.css';
import App from './App'
import '@fortawesome/fontawesome-free/css/all.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Buy from './component/Content/Content_right/Buy/Buy.js'
import ChangeAddress from './component/commingSoon/ChangeAddress';
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
 <BrowserRouter>
 
 <Routes>
 <Route path='/' element={<App />}/>
 <Route path="/Buy" element={<Buy />}/>
 <Route path="/ChangeAddress" element={<ChangeAddress />}/>
</Routes>


 </BrowserRouter>

);




