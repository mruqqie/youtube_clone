import React from "react";
import NavBar from "./NavBar";
import { Box, Button, Skeleton, Stack, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";

const VideoDetail = () => {
	const location = useLocation();
	const { id, title, channelImg, channelTitle } = location.state;

	return (
		<>
			<NavBar />
			<Box>
				<Stack
					sx={{
						paddingLeft: { xs: 0 },
						paddingTop: "20px",
						sx: { margin: "auto" },
					}}
				>
					<Stack
						sx={{
							bgcolor: "grey.800",
							width: {
								xs: "90%",
								sm: "70%",
								lg: "62%",
							},
							height: {
								xs: "50vh",
								sm: "65vh",
								lg: "70vh",
							},
							margin: { xs: "auto" },
							marginLeft: { sm: "6vw" },
						}}
					>
						<iframe
							width="100%"
							height="100%"
							src={`//www.youtube.com/embed/${id}`}
							frameBorder="0"
							allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
							allowFullScreen
							title="YouTube Video"
						/>
					</Stack>
				</Stack>
				<Stack
					sx={{
						//paddingLeft: { xs: "10vw" },
						paddingTop: "10px",
						width: {
							xs: "90%",
							sm: "70%",
							lg: "62%",
						},
						margin: { xs: "auto" },
						marginLeft: { sm: "6vw" },
					}}
				>
					<Typography
						sx={{
							width: "100%",
							height: "20px",
							fontSize: "medium",
							fontWeight: "600",
						}}
						variant="h6"
					>
						{title}
					</Typography>
				</Stack>
				<Stack
					direction="row"
					sx={{
						display: "flex",
						justifyContent: "space-between",
						paddingTop: 1,
						width: {
							xs: "90%",
							sm: "70%",
							lg: "62%",
						},
						margin: { xs: "auto" },
						marginLeft: { sm: "6vw" },
					}}
				>
					<Stack direction="row" sx={{
						width: "100%",
								display: "flex",
								justifyContent: "space-between",
								alignItems: "center",
							}}>
						<Stack
							direction="row"
							gap={1}
							sx={{
								display: "flex",
								justifyContent: "space-between",
								alignItems: "center",
							}}
						>
							<img
								src={channelImg}
								width={35}
								height={35}
								className="channelPic"
							/>
							<Typography
								sx={{
									width: "100%",
									height: "auto",
									fontWeight: "600",
									fontSize: "medium",
								}}
							>
								{channelTitle}
							</Typography>
						</Stack>
						<Stack>
							<Button
								sx={{ textTransform: "none", width: "100px", fontWeight: "600", color: "#000000", borderRadius: "20px", backgroundColor: "#ffffff" }}
							>
								Subsribe
							</Button>
						</Stack>
					</Stack>

					{/* <Stack direction="row" gap="1vw">
						<Skeleton
							variant="circular"
							width={20}
							height={20}
							sx={{
								bgcolor: "grey.800",
							}}
						/>
						<Skeleton
							variant="circular"
							width={20}
							height={20}
							sx={{
								bgcolor: "grey.800",
							}}
						/>
						<Skeleton
							variant="circular"
							width={20}
							height={20}
							sx={{
								bgcolor: "grey.800",
							}}
						/>
						<Skeleton
							variant="circular"
							width={20}
							height={20}
							sx={{
								bgcolor: "grey.800",
							}}
						/>
						<Skeleton
							variant="circular"
							width={20}
							height={20}
							sx={{
								bgcolor: "grey.800",
							}}
						/>
					</Stack> */}
				</Stack>
			</Box>
		</>
	);
};

export default VideoDetail;
