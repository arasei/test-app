import { Home } from './pages/Home'
import { HomeDetail } from './pages/HomeDetail'
import { Header } from './components/Header';
import { Routes, Route } from "react-router-dom";


function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="./posts/:id" element={<HomeDetail />}/>
      </Routes>
    </div>
  )
}

export default App;