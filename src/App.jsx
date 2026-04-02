import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Background from './components/Background';
import HomePage from './pages/HomePage';
import ServerPage from './pages/ServerPage';

export default function App() {
  return (
    <>
      <Background />
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/:slug/" element={<ServerPage />} />
        <Route path="/:slug" element={<ServerPage />} />
      </Routes>
    </>
  );
}
