import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, useLocation, Route, Navigate } from 'react-router-dom';
import Login from './pages/login/Login';
import Home from './pages/home/Home';
import Profile from './pages/profile/Profile';
import Learn from './pages/learn/Learn';
import ModuleList from './pages/learn/ModuleList';
import Module from './pages/learn/Module';
import Quiz from './pages/learn/Quiz';
import Navbar from './navbar/Navbar';
import ProtectedRoute from './helper/ProtectedRoute';
import Leaderboard from './pages/leaderboard/Leaderboard';

const App = () => {
  const [user, setUser] = useState(null);
  const [planet, setPlanet] = useState(null);
  const [topic, setTopic] = useState('')
  const [paragraphs, setParagraphs] = useState('')
  const [questions, setQuestions] = useState('')
  const location = useLocation();

  return (
    <div>
      {location.pathname !== '/' && <Navbar setUser={setUser} />}

      <Routes>
        <Route
          path="/"
          element={<Login user={user} setUser={setUser} />}
        />
        <Route
          path="/home"
          element={
            <ProtectedRoute user={user}>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/module"
          element={
            <ProtectedRoute user={user}>
              <Module
                planet={planet}
                setTopic={setTopic}
                setParagraphs={setParagraphs}
                setQuestions={setQuestions}
                setPlanet={setPlanet}
                topic={topic}
              />
            </ProtectedRoute>
          }
        />
        <Route
          path="/quiz"
          element={
            <ProtectedRoute user={user}>
              <Quiz user={user} planet={planet} topic={topic} questions={questions} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/learn"
          element={
            <ProtectedRoute user={user}>
              <Learn planet={planet} topic={topic} paragraphs={paragraphs} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/modulelist"
          element={
            <ProtectedRoute user={user}>
              <ModuleList setPlanet={setPlanet} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/leaderboard"
          element={
            <ProtectedRoute user={user}>
              <Leaderboard user={user} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute user={user}>
              <Profile user={user} />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
};

export default App;