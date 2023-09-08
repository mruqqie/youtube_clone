import { Stack, IconButton, Tooltip } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import SubscriptionsOutlinedIcon from "@mui/icons-material/SubscriptionsOutlined";
import VideoLibraryOutlinedIcon from "@mui/icons-material/VideoLibraryOutlined";

const sideBar = () => {
	return (
		<Stack direction="column">
			<Tooltip title="Home">
				<IconButton>
					<HomeIcon
						sx={{ color: "#ffffff", border: "1px solid #ffffff" }}
					/>
				</IconButton>
			</Tooltip>
			<Tooltip title="Subscriptions">
				<IconButton>
					<SubscriptionsOutlinedIcon
						sx={{ color: "#ffffff", border: "1px solid #ffffff" }}
					/>
				</IconButton>
			</Tooltip>
			<Tooltip title="Library">
				<IconButton>
					<VideoLibraryOutlinedIcon
						sx={{ color: "#ffffff", border: "1px solid #ffffff" }}
					/>
				</IconButton>
			</Tooltip>
		</Stack>
	);
};

export default sideBar;
