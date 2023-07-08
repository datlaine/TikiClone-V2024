import './component/Main/main.css'
import Header from './component/Header/header_main/Header';
import Content from "./component/Content/Content"
import Footer from "./component/Footer/Footer"
function App() {
  
 
  document.title = 'Tiki'

  return (
    <div id = "main">
    <Header>
    </Header>
      
    <Content>
    </Content>
   
    <Footer>
    </Footer>
    </div>
  );
}

export default App;
