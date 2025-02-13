import React from 'react';
import { Outlet } from 'react-router-dom';

const Layout: React.FC = () => {
	return (
		<div className="layout">
			<h1>헤더</h1>
			<main className="main-content">
				<Outlet />
			</main>
			<h1>푸터</h1>
		</div>
	);
};

export default Layout;