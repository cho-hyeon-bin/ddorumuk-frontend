import './App.css'
import { BrowserRouter as Router, Route, Routes, Outlet } from 'react-router-dom';
import HomeComponent from '@/pages/home';
function Layout() {
	return (
		<div>
			<h1>My Website</h1>
			<Outlet />
		</div>
	);
}

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route index element={<HomeComponent />} />
				</Route>
			</Routes>
		</Router>
	);
}

export default App