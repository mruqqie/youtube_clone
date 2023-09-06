import { Stack, Typography, Paper, IconButton } from "@mui/material";
import YouTubeIcon from "@mui/icons-material/YouTube";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";

const NavBar = () => {
	return (
		<Stack
			direction="row"
			alignItems="center"
			sx={{
				position: "sticky",
				paddingLeft: 3,
				paddingRight: 3,
				paddingTop: 1,
				justifyContent: "space-between",
			}}
		>
			<Stack direction="row" spacing={3} alignItems="center">
				<MenuIcon sx={{ color: "#9a9898" }} fontSize="medium" />
				<Stack direction="row" alignItems="center">
					<YouTubeIcon sx={{ color: "#ff0000" }} fontSize="large" />
					<Typography
						className="yt"
						variant="h6"
						sx={{ color: "#ffffff" }}
					>
						YouTube
					</Typography>
				</Stack>
			</Stack>
			<Stack direction="row">
				<Paper
					component="form"
					onSubmit={() => {}}
					sx={{
						width: "400px",
						height: "40px",
						borderTopLeftRadius: 20,
						borderBottomLeftRadius: 20,
						pl: 2,
						pr: 2,
						border: "1px solid #4f4f4f",
						bgcolor: "#131212",
					}}
				>
					<input className="searchBar" placeholder="Search" />
				</Paper>
				<IconButton
					sx={{
						width: "70px",
						height: "42px",
						border: "1px solid #4f4f4f",
						borderRadius: 0,
						borderTopRightRadius: 20,
						borderBottomRightRadius: 20,
						bgcolor: "#323232",
					}}
				>
					<SearchIcon sx={{ color: "#ffffff" }} />
				</IconButton>
			</Stack>
		</Stack>
	);
};

export default NavBar;
