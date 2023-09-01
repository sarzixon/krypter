import { Box } from "@mui/material";
import styled from "@emotion/styled";
import { Header } from "../../components/Header/Header";
import { SideNavigation } from "../../components/navigation/SideNavigation";
import { ProfileContextProvider } from "../../contexts/ProfileContext";
import { useEffect, useState } from "react";
import axios from "axios";

const ContentWrapper = styled(Box)`
height: 100vh;
`;

const MainWrapper = styled(Box)`
display:flex;
height: 100%;
`;


type Asset = {
	id: number,
	ownerId: number,
	name: string,
	quantity: number,
	type: string
}

export const Dashboard = () => {
	const [assets, setAssets] = useState<Asset[] | null>(null);

	useEffect(() => {
		async function fetchAssets() {
			try {
				const { data } = await axios.get<Asset[]>(import.meta.env.VITE_API_URL + '/users/7/assets');
				console.log(data);

				setAssets(data);
			} catch (error) {
				console.log(error);

			}
		}

		fetchAssets();
	}, [])

	return (
		<ProfileContextProvider>
			<ContentWrapper>
				<Header />
				<MainWrapper>
					<SideNavigation />
					<main>
						<h1>main view</h1>
						{assets ? <ul>
							{
								assets.map(asset => {
									return <li key={asset.id}>
										<div>{asset.name}</div>
										<div>{asset.type}</div>
										<div>{asset.quantity}</div>
									</li>
								})
							}
						</ul> : <div>fetching Assets...</div>}
					</main>
				</MainWrapper>
			</ContentWrapper>
		</ProfileContextProvider>

	)
}