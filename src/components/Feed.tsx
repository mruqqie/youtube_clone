import {
	Stack,
	Grid,
	Skeleton,
	Box,
	useMediaQuery,
	Typography,
} from "@mui/material";
import SideBar from "./SideBar";
import fetchVideos, { VidApiRes } from "../api/fetchVideos";
import React, { useEffect, useState } from "react";

const Feed = () => {
	const [data, setData] = useState<VidApiRes | null>(null);
	useEffect(() => {
		const fetchData = async () => {
			try {
				const result = await fetchVideos();
				setData(result);
			} catch (err) {
				console.log(err);
			}
		};
		fetchData();
	}, []);

	const isXsScreen = useMediaQuery("(max-width:600px)");
	console.log(data)
	// console.log(data?.items.map(item=> item.snippet.thumbnails.high.url));
	// console.log(data?.items.map(item => item.id));
	return (
		<Grid
			direction="row"
			alignContent="flex-start"
			mt={2}
			sx={{
				display: "flex",
				height: { sm: "91.2vh", xs: "91vh" },
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
					{data?.items.map((item) => (
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
									<Skeleton
										variant="circular"
										width={40}
										height={40}
										sx={{
											bgcolor: "grey.800",
										}}
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
												marginBottom: "10%",
											}}
											variant="body2"
										>
											{item.snippet.channelTitle}
										</Typography>
									</Stack>
								</Stack>
							</Box>
						</Grid>
					))}
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
