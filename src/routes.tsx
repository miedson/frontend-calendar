import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Login from './pages/Login'
import Home from './pages/Home'

function routes() {
    return (
        <Router>
            <Routes>
                <Route path='login' element={<Login />}></Route>
                <Route path='/' element={<Home />}></Route>
            </Routes>
        </Router>
    )
}

export default routes