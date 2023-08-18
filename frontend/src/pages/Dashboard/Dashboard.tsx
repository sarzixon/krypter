import axios from "axios";

export const Dashboard = () => {

	const id = localStorage.getItem('uid');

	if (id != null) {
		//get user Assets
		const assets = axios.get(`${import.meta.env.VITE_API_URL}/user/${id}/assets`);
	}


	return (
		<>Logged in!</>
	)
}