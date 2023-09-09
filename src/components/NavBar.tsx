import {
	Stack,
	Typography,
	Paper,
	IconButton,
	useMediaQuery,
} from "@mui/material";
import YouTubeIcon from "@mui/icons-material/YouTube";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useState } from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
	const isXsScreen = useMediaQuery("(max-width:600px)");
	const [showSearchInput, setShowSearchInput] = useState(false);
	const renderSearchIcon = () => {
		if (isXsScreen) {
			return (
				<Stack alignItems="center" sx={{ paddingTop: 1 }}>
					<IconButton
						aria-label="search"
						size="small"
						sx={{
							borderRadius: 0,
							borderTopRightRadius: 20,
							borderBottomRightRadius: 20,
						}}
						onClick={() => {
							setShowSearchInput(true);
						}}
					>
						<SearchIcon sx={{ color: "#ffffff" }} />
					</IconButton>
				</Stack>
			);
		} else {
			return (
				<Stack
					direction="row"
					alignItems="center"
					sx={{ paddingTop: 1 }}
				>
					<Paper
						component="form"
						onSubmit={() => {}}
						sx={{
							display: "flex",
							width: {
								md: "382px",
								sm: "282px",
							},
							height: {
								lg: "40px",
								md: "35px",
								sm: "30px",
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
								sm: "31px",
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
			);
		}
	};

	const renderSearchInput = () => {
		if (showSearchInput) {
			return (
				<Stack
					direction="row"
					alignItems="center"
					justifyContent="center"
					sx={{ paddingTop: 1, paddingBottom: 1, bgcolor: "#212121" }}
				>
					<IconButton
						sx={{ width: "22px", paddingRight: 2 }}
						onClick={() => {
							setShowSearchInput(false);
						}}
					>
						<ArrowBackIcon sx={{ color: "#9a9898" }} />
					</IconButton>
					<Paper
						component="form"
						onSubmit={() => {}}
						sx={{
							display: "flex",
							width: "70%",
							height: "35px",
							borderTopLeftRadius: 20,
							borderBottomLeftRadius: 20,
							alignContent: "center",
							bgcolor: "#323232",
						}}
					>
						<input className="searchBar" placeholder="Search" />
					</Paper>
					<IconButton
						aria-label="search"
						size="small"
						sx={{
							width: "70px",
							height: "35px",
							borderRadius: 0,
							borderTopRightRadius: 20,
							borderBottomRightRadius: 20,
							bgcolor: "#323232",
						}}
					>
						<SearchIcon sx={{ color: "#9a9898" }} />
					</IconButton>
				</Stack>
			);
		} else {
			return (
				<Stack
					direction="row"
					alignItems="center"
					sx={{
						position: "sticky",
						paddingLeft: {
							sm: 3.5,
							xs: 2,
						},
						paddingRight: {
							sm: 3.5,
							xs: 2,
						},
						paddingTop: "2px",
						justifyContent: "space-between",
					}}
				>
					<Stack
						direction="row"
						spacing={isXsScreen ? 1 : 3}
						alignItems="center"
					>
						<MenuIcon
							sx={{ color: "#9a9898" }}
							fontSize={isXsScreen ? "small" : "medium"}
						/>
						<Stack direction="row" alignItems="center">
							<YouTubeIcon
								sx={{ color: "#ff0000" }}
								fontSize={isXsScreen ? "medium" : "large"}
							/>
							<Typography
								className="yt"
								variant={isXsScreen ? "body1" : "h6"}
								sx={{ color: "#ffffff", fontFamily: "Oswald" }}
							>
								YouTube
							</Typography>
						</Stack>
					</Stack>
					{renderSearchIcon()}
				</Stack>
			);
		}
	};

	return <div>{renderSearchInput()}</div>;
};

export default NavBar;
