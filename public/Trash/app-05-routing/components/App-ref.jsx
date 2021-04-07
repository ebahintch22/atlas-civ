/*App.jsx*/
const App = () => (
<div>
	<nav>
		<Link to="/dashboard">Dashboard</Link>
	</nav>
	<div>
		<Route path="/dashboard" component={Dashboard} />
	</div>
</div>
);