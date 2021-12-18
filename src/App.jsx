import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CreatePosts from './Components/CreatePosts';
import EditPosts from './Components/EditPosts';
import useFetch from './HOOKS/useFetch';
import Home from './Pages/Home';
import Navbar from './Pages/Navbar';
import DeletePost from './Components/DeletePost';

const App = () => {
    // let covidApi = useFetch("https://api.covidtracking.com/v1/status.json");
    // console.log(covidApi);
    // let githubApi = useFetch("https://api.github.com/users");
    // console.log(githubApi)
    return (
        <Router>
            <section>
                <header>
                    <Navbar/>
                </header>
                <main>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/create-posts" element={<CreatePosts />} />
                        <Route path="/edit-post/:id" element={<EditPosts />} />
                        <Route path="/delete-posts/:id" element={<DeletePost/>}/>
                    </Routes>
                </main>
                <footer>
                </footer>
            </section>

    </Router>
    )
}

export default App
