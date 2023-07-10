import './component/Main/main.css'
import Header from './component/Header/header_main/Header'
import Content from './component/Content/Content'
function App() {
  document.title = 'Tiki'

  return (
    <div id='main'>
      <Header></Header>

      <Content></Content>
    </div>
  )
}

export default App
