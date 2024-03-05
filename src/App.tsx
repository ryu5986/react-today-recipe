import './App.css'
import AlertDialog from './components/common/AlertDialog'
import { BrowserRouter } from 'react-router-dom'
import Layout from './components/layout/layout'

function App() {

  return (
    <>
      <AlertDialog/>   
        <BrowserRouter>
          <Layout/>
        </BrowserRouter>
    </>
  )
}

export default App
