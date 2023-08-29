import axios from "axios";
import { Button } from '../../components/buttons/Button';
import { useNavigate } from "react-router-dom";

export const Dashboard = () => {
	const navigate = useNavigate();

	function handleLogout() {
		axios.post(`${import.meta.env.VITE_API_URL}/auth/logout`, null, {
			withCredentials: true
		}).then((res) => {
			navigate('/auth/login')


		}).catch((err) => {
			console.log("Error while Logging out");
		});

	}

	return (
		<>
			<h1>Hello</h1>
			<Button onClick={handleLogout}>Log out</Button>
		</>
	)
}