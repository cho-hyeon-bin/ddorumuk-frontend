import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomeComponent from '@/pages/home';

function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeComponent />} />
      </Routes>
    </Router>
  );
}

export default AppRouter;