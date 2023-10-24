import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Grid, Stack, Typography, useMediaQuery } from "@mui/material";
import NavBar from "./NavBar";
import SideBar from "./SideBar";
import { fetchSearchResult, searchApiRes } from "../api/searchResult";
import CircleIcon from "@mui/icons-material/Circle";

const SearchFeed = () => {
	const searchTermParam = useParams<{ searchTerm?: string }>();
	const searchTerm = searchTermParam.searchTerm ?? "";

	const [isLoading, setIsLoading] = useState(true);
	const [data, setData] = useState<searchApiRes | null>(null);

	const isXsScreen = useMediaQuery("(max-width:599.5px)");

	const parseQuery = (queryString: string): string => {
		const parsedQuery = queryString.replace(/ /g, "%20");
		return parsedQuery;
	};

	useEffect(() => {
		fetchSearchData();
	}, []);

	const fetchSearchData = async () => {
		try {
			const parsedSearchTerm = parseQuery(searchTerm);
			const searchData = await fetchSearchResult(parsedSearchTerm);
			setData(searchData);
		} catch (err) {
			console.log(err);
		}
	};
	console.log(data?.items.map((item) => item.snippet.thumbnails.high));

	return (
		<>
			<NavBar />
			<Grid
				direction="row"
				alignContent="flex-start"
				mt={2}
				sx={{
					display: "flex",
					height: "100%",
				}}
				container
			>
				{!isXsScreen && (
					<Grid item xs={12} sm="auto">
						<SideBar />
					</Grid>
				)}
				<Grid
					item
					xs={12}
					sm
					sx={{
						height: { xs: "90%", sm: "100%" },
					}}
				>
					<Grid
						container
						gap={1.5}
						sx={{
							display: "flex",
							justifyContent: "center",
							paddingLeft: "3px",
							paddingRight: "3px",
						}}
					>
						{data?.items.map((item) => {
							return (
								<Grid
									item
									sx={{
										width: {
											// lg: "24%",
											// md: "32%",
											// sm: "48%",
											xs: "80%",
										},
									}}
								>
									<Box
										sx={{
											display: "flex",
											//alignItems: "center",
											flexDirection: "row",
											gap: 2,
											border: "1px solid #ffffff",
										}}
									>
										<Stack
											sx={{
												//border: "1px solid",
												width: "350px",
											}}
										>
											<img
												src={
													item.snippet.thumbnails.high
														.url
												}
												alt=""
											/>
										</Stack>
										<Stack sx={{ marginTop: "30px" }}>
											<Typography>
												This is the name of the video
												whose thumbnail is being
												displayed. This is the name of
												the video whose thumbnail is
												being displayed
											</Typography>
											<Stack
												direction="row"
												alignItems="center"
											>
												<Typography
													sx={{
														color: "#ada9a9",
														paddingRight: "4px",
														marginBottom: "10%",
													}}
													variant="body2"
												>
													455550k views
												</Typography>
												<CircleIcon
													sx={{
														color: "#ada9a9",
														width: "4px",
														height: "4px",
														marginTop: "-10%",
													}}
												/>
												<Typography
													sx={{
														color: "#ada9a9",
														paddingLeft: "4px",
														marginBottom: "10%",
														fontSize: "x-small"
													}}
													variant="body2"
												>
													5 days ago
												</Typography>
											</Stack>
										</Stack>
									</Box>
								</Grid>
							);
						})}
					</Grid>
				</Grid>
			</Grid>
		</>
	);
};

export default SearchFeed;
