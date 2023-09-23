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
import {
	fetchVideos,
	VidApiRes,
	fetchChannelDetails,
	ChannelApiRes,
} from "../api/fetchVideos";
import { useEffect, useState, useRef } from "react";
import CircleIcon from "@mui/icons-material/Circle";

const Feed = () => {
	const [data, setData] = useState<VidApiRes | null>(null);
	const [channelData, setChannelData] = useState<ChannelApiRes | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [pageToken, setPageToken] = useState<string | null>(null);

	const lastVideoRef = useRef<HTMLDivElement | null>(null);
	useEffect(() => {
		fetchData();
	}, []);
	const fetchData = async () => {
		try {
			const videoResult = await fetchVideos();
			//setData(videoResult);

			setData((prevVideos: VidApiRes | null) => {
				if (!prevVideos) {
					return {
						items: videoResult.items,
					};
				}
				return {
					items: [...prevVideos.items, ...videoResult.items],
					nextPageToken:
						videoResult.nextPageToken || prevVideos.nextPageToken,
				};
			});

			//setPageToken(videoResult.nextPageToken)

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

	const handleIntersection = (entries: IntersectionObserverEntry[]) => {
		const target = entries[0];
		if (target.isIntersecting && isLoading && pageToken) {
			fetchData(); // Load more data when the last video element is in view
		}
	};

	useEffect(() => {
		const observer = new IntersectionObserver(handleIntersection, {
			threshold: 0.1, // Trigger when 10% of the element is visible
		});

		if (lastVideoRef.current) {
			observer.observe(lastVideoRef.current);
		}

		// Cleanup observer
		return () => observer.disconnect();
	}, [lastVideoRef]);

	const isXsScreen = useMediaQuery("(max-width:599.5px)");
	const skeletonArray = Array.from({ length: 40 }, (_, index) => index);

	//console.log(data?.nextPageToken);
	return (
		<Grid
			direction="row"
			alignContent="flex-start"
			mt={2}
			sx={{
				display: "flex",
				height: {
					lg: "93.5vh",
					md: "91.3vh",
					sm: "91.4vh",
					xs: "91vh",
				},
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
				sx={{ height: { xs: "90%", sm: "100%" }, overflowY: "scroll" }}
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
										<Stack gap={2} sx={{ width: "86%" }}>
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
						{data?.items.map((item, index) => {
							const channelItem = channelData?.items.find(
								(channel) =>
									channel.id === item.snippet.channelId
							);

							const formatViewCount = (viewCount: string) => {
								const count = Number(viewCount);
								if (count >= 1e6) {
									// If count is at least 1 mil
									return (count / 1e6).toFixed(1) + "M";
								} else if (count >= 1e3) {
									// If the count is at least 1 thousand
									return (count / 1e3).toFixed(1) + "K";
								} else {
									return count.toString();
								}
							};

							const timePosted = (timestamp: string) => {
								const currentDate = new Date();
								const publishedDate = new Date(timestamp);
								const timeDifference =
									Number(currentDate) - Number(publishedDate);

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
									ref={
										index === data.items.length - 1
											? lastVideoRef
											: null
									}
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
													item.snippet.thumbnails.high
														.url
												}
												width="100%"
												className="thumbnails"
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
													item.snippet.channelTitle
												}
											>
												<img
													src={
														channelItem?.snippet
															.thumbnails.high.url
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
														item.snippet.localized
															.title
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
													>
														{
															item.snippet
																.localized.title
														}
													</Typography>
												</Tooltip>
												<Stack
													sx={{
														width: "100%",
														marginTop: "-5%",
														"&:hover": {
															cursor: "pointer",
														},
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
																"&:hover": {
																	cursor: "pointer",
																},
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
														sx={{
															"&:hover": {
																cursor: "pointer",
															},
														}}
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
																item.statistics
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
				<Grid item xs={12} sm="auto">
					<SideBar />
				</Grid>
			)}
		</Grid>
	);
};

export default Feed;
