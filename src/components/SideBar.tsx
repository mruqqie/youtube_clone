import { Stack, IconButton, Tooltip } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import SubscriptionsOutlinedIcon from "@mui/icons-material/SubscriptionsOutlined";
import VideoLibraryOutlinedIcon from "@mui/icons-material/VideoLibraryOutlined";

const sideBar = () => {
	return (
		<Stack direction="column">
			<Tooltip title="Home">
				<IconButton>
					<HomeIcon />
				</IconButton>
			</Tooltip>
		</Stack>
	);
};

export default sideBar;
