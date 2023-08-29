import { Box } from "@mui/material";
import styled from "@emotion/styled";
import { Header } from "../../components/Header/Header";
import { SideNavigation } from "../../components/navigation/SideNavigation";

export const Dashboard = () => {


	const ContentWrapper = styled(Box)`
		height: 100vh;
	`;

	const MainWrapper = styled(Box)`
		display:flex;
		height: 100%;
	`;

	return (
		<ContentWrapper>
			<Header />
			<MainWrapper>
				<SideNavigation />
				<main>main view</main>
			</MainWrapper>
		</ContentWrapper>



	)
}