import { Stack, Typography, Paper, IconButton, TextField } from "@mui/material";
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
				paddingLeft: {
					sm: 3,
					xs: 1
				},
				paddingRight: 3,
				paddingTop: "2px",
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
			<Stack direction="row" alignItems="center" sx={{ paddingTop: 1 }}>
				<Paper
					component="form"
					onSubmit={() => {}}
					sx={{
						display: "flex",
						width: {
							md: "382px",
							sm: "282px"
						},
						height: {
							lg: "40px",
							md: "35px",
							sm: "30px"
						},
						borderTopLeftRadius: 20,
						borderBottomLeftRadius: 20,
						border: "1px solid #4f4f4f",
						bgcolor: "#131212",
						alignContent: "center",
					}}
				>
					<input className="searchBar" placeholder="Search" />
				</Paper>
				<IconButton
					aria-label="search"
					size="small"
					sx={{
						width: "70px",
						height: {
							lg: "41px",
							md: "36px",
							sm: "31px"
						},
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
