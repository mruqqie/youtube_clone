import { Stack, Grid, Skeleton } from "@mui/material";
import SideBar from "./SideBar";

const Feed = () => {
	return (
		<Grid
			direction="row"
			alignContent="flex-start"
			mt={3}
			sx={{ display: "flex", border: "1px solid #ffffff" }}
			container
		>
			<Grid item>
				<SideBar />
			</Grid>
			<Grid item>
				<Skeleton />
			</Grid>
		</Grid>
	);
};

export default Feed;
