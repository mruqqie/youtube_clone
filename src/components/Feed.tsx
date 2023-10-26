import {
	Stack,
	Grid,
	Skeleton,
	Box,
	useMediaQuery,
	Typography,
	Tooltip,
} from "@mui/material";
import SideBar from "./SideBar";
import NavBar from "./NavBar";
import {
	fetchVideos,
	VidApiRes,
	fetchChannelDetails,
	ChannelApiRes,
} from "../api/fetchVideos";
import { useEffect, useState } from "react";
import CircleIcon from "@mui/icons-material/Circle";
import { useNavigate } from "react-router-dom";

const Feed = () => {
	const [data, setData] = useState<VidApiRes | null>(null);
	const [channelData, setChannelData] = useState<ChannelApiRes | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	const navigate = useNavigate();

	useEffect(() => {
		fetchData();
	}, []);
	const fetchData = async () => {
		try {
			const videoResult = await fetchVideos();
			setData(videoResult);

			const channelIds = videoResult?.items.map(
				(items) => items.snippet.channelId
			);
			if (channelIds) {
				const channelResult = await fetchChannelDetails(
					channelIds.join(",")
				);
				setChannelData(channelResult);
			}
			setIsLoading(false);
		} catch (err) {
			console.log(err);
			setIsLoading(false);
		}
	};

	const isXsScreen = useMediaQuery("(max-width:599.5px)");
	const skeletonArray = Array.from({ length: 40 }, (_, index) => index);

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
					{isLoading ? (
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
							{skeletonArray.map((item) => (
								<Grid
									item
									key={item}
									sx={{
										width: {
											lg: "24%",
											md: "32%",
											sm: "48%",
											xs: "80%",
										},
									}}
								>
									<Box
										sx={{
											display: "flex",
											alignItems: "center",
											flexDirection: "column",
											gap: 2,
										}}
									>
										<Skeleton
											sx={{
												bgcolor: "grey.800",
												width: "100%",
												paddingBottom: "65%",
											}}
											variant="rounded"
										/>
										<Stack
											gap={2}
											direction="row"
											sx={{ width: "100%" }}
										>
											<Skeleton
												variant="circular"
												width={40}
												height={40}
												sx={{
													bgcolor: "grey.800",
												}}
											/>
											<Stack
												gap={2}
												sx={{ width: "86%" }}
											>
												<Skeleton
													sx={{
														bgcolor: "grey.800",
														width: "100%",
														paddingBottom: "0%",
													}}
													variant="rounded"
												/>
												<Skeleton
													sx={{
														bgcolor: "grey.800",
														width: "60%",
														paddingBottom: "0%",
													}}
													variant="rounded"
												/>
											</Stack>
										</Stack>
									</Box>
								</Grid>
							))}
						</Grid>
					) : (
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
									const timeDifference =
										Number(currentDate) -
										Number(publishedDate);

									const seconds = Math.floor(
										timeDifference / 1000
									);
									const minutes = Math.floor(seconds / 60);
									const hours = Math.floor(minutes / 60);
									const days = Math.floor(hours / 24);

									if (days > 0) {
										return `${days} day${
											days !== 1 ? "s" : ""
										} ago`;
									} else if (hours > 0) {
										return `${hours} hour${
											hours !== 1 ? "s" : ""
										} ago`;
									} else if (minutes > 0) {
										return `${minutes} minute${
											minutes !== 1 ? "s" : ""
										} ago`;
									} else {
										return `${seconds} second${
											seconds !== 1 ? "s" : ""
										} ago`;
									}
								};

								return (
									<Grid
										item
										key={item.id}
										sx={{
											width: {
												lg: "24%",
												md: "32%",
												sm: "48%",
												xs: "80%",
											},
										}}
									>
										<Box
											sx={{
												display: "flex",
												alignItems: "center",
												flexDirection: "column",
												gap: 1,
												height: "90%",
											}}
										>
											<Stack
												width="100%"
												sx={{
													display: "flex",
													flexDirection: "row",
													alignItems: "flex-end",
												}}
											>
												<img
													src={
														item.snippet.thumbnails
															.high.url
													}
													width="100%"
													className="thumbnails"
													onClick={() => {
														navigate(
															`/video/${item.id}`,
															{
																state: {
																	id: item.id,
																	title: item
																		.snippet
																		.localized
																		.title,
																	channelImg:
																		channelItem
																			?.snippet
																			.thumbnails
																			.high
																			.url,
																	channelTitle:
																		item
																			.snippet
																			.channelTitle,
																},
															}
														);
													}}
												/>
											</Stack>
											<Stack
												gap={2}
												direction="row"
												sx={{
													width: "100%",
													height: "30%",
												}}
											>
												<Tooltip
													title={
														item.snippet
															.channelTitle
													}
												>
													<img
														src={
															channelItem?.snippet
																.thumbnails.high
																.url
														}
														width={40}
														height={40}
														className="channelPic"
													/>
												</Tooltip>
												<Stack
													gap={2}
													sx={{ width: "86%" }}
												>
													<Tooltip
														title={
															item.snippet
																.localized.title
														}
													>
														<Typography
															sx={{
																color: "#ffffff",
																width: "100%",
																"&:hover": {
																	cursor: "pointer",
																},
															}}
															variant="body2"
															onClick={() => {
																navigate(
																	`/video/${item.id}`,
																	{
																		state: {
																			id: item.id,
																			title: item
																				.snippet
																				.localized
																				.title,
																			channelImg:
																				channelItem
																					?.snippet
																					.thumbnails
																					.high
																					.url,
																			channelTitle:
																				item
																					.snippet
																					.channelTitle,
																		},
																	}
																);
															}}
														>
															{
																item.snippet
																	.localized
																	.title
															}
														</Typography>
													</Tooltip>
													<Stack
														sx={{
															width: "100%",
															marginTop: "-5%",
														}}
													>
														<Tooltip
															title={
																item.snippet
																	.channelTitle
															}
														>
															<Typography
																sx={{
																	color: "#ada9a9",
																	width: "100%",
																}}
																variant="body2"
															>
																{
																	item.snippet
																		.channelTitle
																}
																<br />
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
																	marginBottom:
																		"10%",
																}}
																variant="body2"
															>
																{formatViewCount(
																	item
																		.statistics
																		.viewCount
																)}{" "}
																views
															</Typography>
															<CircleIcon
																sx={{
																	color: "#ada9a9",
																	width: "4px",
																	height: "4px",
																	marginTop:
																		"-10%",
																}}
															/>
															<Typography
																sx={{
																	color: "#ada9a9",
																	paddingLeft:
																		"4px",
																	marginBottom:
																		"10%",
																}}
																variant="body2"
															>
																{timePosted(
																	item.snippet
																		.publishedAt
																)}{" "}
															</Typography>
														</Stack>
													</Stack>
												</Stack>
											</Stack>
										</Box>
									</Grid>
								);
							})}
						</Grid>
					)}
				</Grid>
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
		</>
	);
};

export default Feed;
