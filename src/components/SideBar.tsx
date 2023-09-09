import { Stack, IconButton, Tooltip, Typography } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import SubscriptionsOutlinedIcon from "@mui/icons-material/SubscriptionsOutlined";
import VideoLibraryOutlinedIcon from "@mui/icons-material/VideoLibraryOutlined";

const sideBar = () => {
	return (
		<Stack
			gap={2}
			sx={{
				display: "flex", 
				justifyContent: "center",
				flexDirection: { sm: "column", xs: "row" },
				gap: {xs: 6, sm: 2}
			}}
		>
			<Tooltip title="Home" followCursor>
				<IconButton
					sx={{
						display: "flex",
						flexDirection: "column",
						gap: "5px",
					}}
				>
					<HomeIcon
						sx={{
							color: "#ffffff",
							fontSize: { md: "x-large", sm: "large" },
						}}
					/>
					<Typography
						sx={{
							color: "#ffffff",
							fontSize: {
								xs: "x-small"
							},
						}}
					>
						Home
					</Typography>
				</IconButton>
			</Tooltip>
			<Tooltip title="Subscriptions" followCursor>
				<IconButton
					sx={{
						display: "flex",
						flexDirection: "column",
						gap: "5px",
					}}
				>
					<SubscriptionsOutlinedIcon
						sx={{
							color: "#ffffff",
							fontSize: { md: "x-large", sm: "large" },
						}}
					/>
					<Typography
						sx={{
							color: "#ffffff",
							fontSize: {
								xs: "x-small",
							},
						}}
					>
						Subscriptions
					</Typography>
				</IconButton>
			</Tooltip>
			<Tooltip title="Library" followCursor>
				<IconButton
					sx={{
						display: "flex",
						flexDirection: "column",
						gap: "5px",
					}}
				>
					<VideoLibraryOutlinedIcon
						sx={{
							color: "#ffffff",
							fontSize: { md: "x-large", sm: "large" },
						}}
					/>
					<Typography
						sx={{
							color: "#ffffff",
							fontSize: {
								xs: "x-small",
							},
						}}
					>
						Library
					</Typography>
				</IconButton>
			</Tooltip>
		</Stack>
	);
};

export default sideBar;
