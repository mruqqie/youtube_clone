import {
	Stack,
	Grid,
	Skeleton,
	Box,
	useMediaQuery,
	Typography,
} from "@mui/material";
import SideBar from "./SideBar";
import {
	fetchVideos,
	VidApiRes,
	fetchChannelDetails,
	ChannelApiRes,
} from "../api/fetchVideos";
import React, { useEffect, useState } from "react";
import ChannelDetail from "./ChannelDetail";

const Feed = () => {
	const [data, setData] = useState<VidApiRes | null>(null);
	const [channelData, setChannelData] = useState<ChannelApiRes | null>(null);
	useEffect(() => {
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
			} catch (err) {
				console.log(err);
			}
		};
		fetchData();
	}, []);

	const isXsScreen = useMediaQuery("(max-width:599.5px)");
	//console.log(data);
	console.log(
		channelData?.items.map((item) => item.snippet.thumbnails.high.url)
	);
	//console.log(channelData?.items.snippet.thumbnails.default.url)
	// console.log(data?.items.map((item) => item.snippet.channelId));
	// console.log(data?.items.map(item => item.id));
	return (
		<Grid
			direction="row"
			alignContent="flex-start"
			mt={2}
			sx={{
				display: "flex",
				height: { lg: "93.5vh", md: "91.3vh", sm: "91.4vh", xs: "91vh" },
			}}
			container
		>
			{!isXsScreen && (
				<Grid item xs={12} sm="auto">
					<SideBar />
				</Grid>
			)}
			{/* 
			<Grid
				item
				xs={12}
				sm
				sx={{ height: { xs: "90%", sm: "100%" }, overflowY: "scroll" }}
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
					<Grid
						item
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
				</Grid>
			</Grid> */}

			<Grid
				item
				xs={12}
				sm
				sx={{ height: { xs: "90%", sm: "100%" }, overflowY: "scroll" }}
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
							(channel) => channel.id === item.snippet.channelId
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
						console.log(formatViewCount("1153456"))
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
										gap: 2,
									}}
								>
									<img
										src={item.snippet.thumbnails.high.url}
										width="100%"
										className="thumbnails"
									/>
									<Stack
										gap={2}
										direction="row"
										sx={{ width: "100%", margin: "-10%" }}
									>
										<img
											src={
												channelItem?.snippet.thumbnails
													.high.url
											}
											width={40}
											height={40}
											className="channelPic"
										/>
										<Stack gap={2} sx={{ width: "86%" }}>
											<Typography
												sx={{
													color: "#ffffff",
													width: "100%",
												}}
												variant="body2"
											>
												{item.snippet.localized.title}
											</Typography>
											<Typography
												sx={{
													color: "#ada9a9",
													width: "100%",
													marginTop: "-5%",
													marginBottom: "10%",
												}}
												variant="body2"
											>
												{item.snippet.channelTitle}
												<br />
												{formatViewCount(item.statistics.viewCount)} views
											</Typography>
										</Stack>
									</Stack>
								</Box>
							</Grid>
						);
					})}
				</Grid>
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
