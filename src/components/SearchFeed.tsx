import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
	Box,
	Grid,
	Stack,
	Tooltip,
	Typography,
	useMediaQuery,
} from "@mui/material";
import NavBar from "./NavBar";
import SideBar from "./SideBar";
import { fetchSearchResult, searchApiRes } from "../api/searchResult";
import CircleIcon from "@mui/icons-material/Circle";
import {
	ChannelApiRes,
	VidApiRes,
	fetchChannelDetails,
	fetchVideoDetails,
	fetchVideos,
	VideoSearchRes,
} from "../api/fetchVideos";
import { useNavigate } from "react-router-dom";

const SearchFeed = () => {
	const searchTermParam = useParams<{ searchTerm?: string }>();
	const searchTerm = searchTermParam.searchTerm ?? "";

	const [isLoading, setIsLoading] = useState(true);
	const [data, setData] = useState<searchApiRes | null>(null);
	const [channelData, setChannelData] = useState<ChannelApiRes | null>(null);
	const [videoData, setVideoData] = useState<VideoSearchRes | null>(null);

	const isXsScreen = useMediaQuery("(max-width:599.5px)");
	const isMdScreen = useMediaQuery("(max-width:799.5px)");

	const parseQuery = (queryString: string): string => {
		const parsedQuery = queryString.replace(/ /g, "%20");
		return parsedQuery;
	};
	const navigate = useNavigate();

	useEffect(() => {
		fetchSearchData();
	}, []);

	const fetchSearchData = async () => {
		try {
			const parsedSearchTerm = parseQuery(searchTerm);
			const searchData = await fetchSearchResult(parsedSearchTerm);
			setData(searchData);

			const channelIds = searchData?.items.map(
				(item) => item.snippet.channelId
			);
			if (channelIds) {
				const channelResult = await fetchChannelDetails(
					channelIds.join(",")
				);
				setChannelData(channelResult);
			}

			const videoIds = searchData?.items.map((item) => item.id.videoId);
			if (videoIds) {
				const videoRes = await fetchVideoDetails(videoIds.join(","));
				setVideoData(videoRes);
			}
		} catch (err) {
			console.log(err);
		}
	};
	const decodeHTMLEntities = (html: string): string => {
		const doc = new DOMParser().parseFromString(html, "text/html");
		return doc.documentElement.textContent || "";
	};

	const formatViewCount = (viewCount: string) => {
		const count = Number(viewCount);
		if (count >= 1e6) {
			return (count / 1e6).toFixed(1) + "M";
		} else if (count >= 1e3) {
			return (count / 1e3).toFixed(1) + "K";
		} else {
			return count.toString();
		}
	};

	const timePosted = (timestamp: string) => {
		const currentDate = new Date();
		const publishedDate = new Date(timestamp);
		const timeDifference = Number(currentDate) - Number(publishedDate);

		const seconds = Math.floor(timeDifference / 1000);
		const minutes = Math.floor(seconds / 60);
		const hours = Math.floor(minutes / 60);
		const days = Math.floor(hours / 24);
		const weeks = Math.floor(days / 7);
		const months = Math.floor(
			currentDate.getMonth() -
				publishedDate.getMonth() +
				12 * (currentDate.getFullYear() - publishedDate.getFullYear())
		);
		const years = Math.floor(
			currentDate.getFullYear() - publishedDate.getFullYear()
		);

		if (years > 0) {
			return `${years} year${years !== 1 ? "s" : ""} ago`;
		} else if (months > 0) {
			return `${months} month${months !== 1 ? "s" : ""} ago`;
		} else if (weeks > 0) {
			return `${weeks} week${weeks !== 1 ? "s" : ""} ago`;
		} else if (days > 0) {
			return `${days} day${days !== 1 ? "s" : ""} ago`;
		} else if (hours > 0) {
			return `${hours} hour${hours !== 1 ? "s" : ""} ago`;
		} else if (minutes > 0) {
			return `${minutes} minute${minutes !== 1 ? "s" : ""} ago`;
		} else {
			return `${seconds} second${seconds !== 1 ? "s" : ""} ago`;
		}
	};
	console.log(data?.items);

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
				{isMdScreen ? (
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
								const channelItem = channelData?.items.find(
									(channel) =>
										channel.id === item.snippet.channelId
								);
								const vidItem = videoData?.items.find(
									(video) => video.id === item.id.videoId
								);
								return (
									<Grid
										item
										sx={{
											width: "80%",
											paddingBottom: 2,
										}}
									>
										<Box
											sx={{
												display: "flex",
												alignItems: "center",
												flexDirection: "column",
												gap: 2,
												"&:hover": {
													cursor: "pointer",
												},
											}}
											onClick={() => {
												navigate(`/video/${item.id.videoId}`, {
													state: {
														id: item.id.videoId,
														title: item.snippet
															.title,
														channelImg:
															channelItem?.snippet
																.thumbnails.high
																.url,
														channelTitle:
															item.snippet
																.channelTitle,
													},
												});
											}}
										>
											<Stack
												sx={{
													width: "100%",
												}}
											>
												<img
													src={
														item.snippet.thumbnails
															.high.url
													}
													alt=""
												/>
											</Stack>
											<Stack
												direction="row"
												gap={1}
												alignItems="flex-start"
												sx={{
													width: "100%",
												}}
											>
												<Stack
													direction="row"
													alignItems="center"
													gap={1}
													//sx={{ marginTop: "7px" }}
												>
													<img
														src={
															channelItem?.snippet
																.thumbnails.high
																.url
														}
														width={25}
														height={25}
														className="channelPic"
													/>
												</Stack>
												<Stack gap={1}>
													<Typography>
														{decodeHTMLEntities(
															item.snippet.title
														)}
													</Typography>
													<Tooltip title="Channel name">
														<Typography
															sx={{
																color: "#ada9a9",
																fontSize:
																	"small",
															}}
															variant="body2"
														>
															{
																item.snippet
																	.channelTitle
															}
														</Typography>
													</Tooltip>
													<Stack
														direction="row"
														alignItems="center"
													>
														<Typography
															sx={{
																color: "#ada9a9",
																paddingRight:
																	"4px",
																fontSize:
																	"small",
															}}
															variant="body2"
														>
															{formatViewCount(
																(
																	vidItem
																		?.statistics
																		?.viewCount ||
																	""
																).toString()
															)}{" "}
															views
														</Typography>
														<CircleIcon
															sx={{
																color: "#ada9a9",
																width: "4px",
																height: "4px",
															}}
														/>
														<Typography
															sx={{
																color: "#ada9a9",
																paddingLeft:
																	"4px",
																fontSize:
																	"small",
															}}
															variant="body2"
														>
															{timePosted(
																item.snippet
																	.publishedAt
															)}
														</Typography>
													</Stack>
												</Stack>
											</Stack>
										</Box>
									</Grid>
								);
							})}
							{isXsScreen && (
								<Grid
									item
									xs={12}
									sm="auto"
									sx={{
										position: "fixed",
										bottom: 0,
										zIndex: 100,
										backgroundColor: "#000000",
										width: "100%",
										display: "flex",
										justifyContent: "space-around",
									}}
								>
									<SideBar />
								</Grid>
							)}
						</Grid>
					</Grid>
				) : (
					<Grid
						item
						xs={12}
						sm
						sx={{
							height: { xs: "90%", sm: "100%" },
							width: "60%",
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
								const channelItem = channelData?.items.find(
									(channel) =>
										channel.id === item.snippet.channelId
								);
								const vidItem = videoData?.items.find(
									(video) => video.id === item.id.videoId
								);
								return (
									<Grid
										item
										sx={{
											width: {
												xs: "80%",
											},
										}}
									>
										<Box
											sx={{
												display: "flex",
												flexDirection: "row",
												gap: 2,
												"&:hover": {
													cursor: "pointer",
												},
											}}
											onClick={() => {
												navigate(`/video/${item.id.videoId}`, {
													state: {
														id: item.id.videoId,
														title: item.snippet
															.title,
														channelImg:
															channelItem?.snippet
																.thumbnails.high
																.url,
														channelTitle:
															item.snippet
																.channelTitle,
													},
												});
											}}
										>
											<Stack
												sx={{
													width: "40%",
												}}
											>
												<img
													src={
														item.snippet.thumbnails
															.high.url
													}
													alt=""
												/>
											</Stack>
											<Stack sx={{ marginTop: "3%" }}>
												<Typography>
													{decodeHTMLEntities(
														item.snippet.title
													)}
												</Typography>
												<Stack
													direction="row"
													alignItems="center"
												>
													<Typography
														sx={{
															color: "#ada9a9",
															paddingRight: "4px",
															fontSize: "x-small",
														}}
														variant="body2"
													>
														{formatViewCount(
															(
																vidItem
																	?.statistics
																	?.viewCount ||
																""
															).toString()
														)}{" "}
														views
													</Typography>
													<CircleIcon
														sx={{
															color: "#ada9a9",
															width: "4px",
															height: "4px",
														}}
													/>
													<Typography
														sx={{
															color: "#ada9a9",
															paddingLeft: "4px",
															fontSize: "x-small",
														}}
														variant="body2"
													>
														{timePosted(
															item.snippet
																.publishedAt
														)}
													</Typography>
												</Stack>
												<Stack
													direction="row"
													alignItems="center"
													gap={1}
													sx={{ marginTop: "7px" }}
												>
													<img
														src={
															channelItem?.snippet
																.thumbnails.high
																.url
														}
														width={25}
														height={25}
														className="channelPic"
													/>
													<Tooltip title="Channel name">
														<Typography
															sx={{
																color: "#ada9a9",
																paddingLeft:
																	"4px",
																fontSize:
																	"x-small",
															}}
															variant="body2"
														>
															{
																item.snippet
																	.channelTitle
															}
														</Typography>
													</Tooltip>
												</Stack>
												<Stack>
													<Tooltip title="From the video description">
														<Typography
															sx={{
																color: "#ada9a9",
																fontSize:
																	"small",
																marginTop:
																	"15px",
															}}
															variant="body2"
														>
															{
																item.snippet
																	.description
															}
														</Typography>
													</Tooltip>
												</Stack>
											</Stack>
										</Box>
									</Grid>
								);
							})}
							{isXsScreen && (
								<Grid
									item
									xs={12}
									sm="auto"
									sx={{
										position: "fixed",
										bottom: 0,
										zIndex: 100,
										backgroundColor: "#000000",
										width: "100%",
										display: "flex",
										justifyContent: "space-around",
									}}
								>
									<SideBar />
								</Grid>
							)}
						</Grid>
					</Grid>
				)}
			</Grid>
		</>
	);
};

export default SearchFeed;
