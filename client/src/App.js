import React from 'react';
import 'mdbreact/dist/css/mdb.css';
import './App.css';
import './components/css/queue.css';
import './components/css/forms.css';

import Header from './components/header'
import Main from './components/main'

function App() {
	return (
		<div>
			<Header />
			<Main />
		</div>
	);
}

export default App;
