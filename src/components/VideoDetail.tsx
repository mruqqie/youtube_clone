import React from "react";
import NavBar from "./NavBar";
import { Box, Skeleton, Stack } from "@mui/material";
import { useLocation } from "react-router-dom";

const VideoDetail = () => {
	const location = useLocation();
	const { id } = location.state;

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
				<Stack sx={{ paddingLeft: { xs: "10vw" }, paddingTop: "20px" }}>
					<Skeleton
						sx={{
							bgcolor: "grey.800",
							width: { xs: "45vw", sm: "35vw", lg: "30vw" },
							height: "20px",
						}}
						variant="rounded"
					/>
				</Stack>
				<Stack
					direction="row"
					sx={{
						display: "flex",
						justifyContent: "space-between",
						width: { xs: "83%", sm: "64%", lg: "57%" },
						paddingLeft: { xs: "10vw" },
						paddingTop: 1,
					}}
				>
					<Skeleton
						sx={{
							bgcolor: "grey.800",
							width: "16%",
							height: "20px",
						}}
						variant="rounded"
					/>
					<Stack direction="row" gap="1vw">
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
					</Stack>
				</Stack>
			</Box>
		</>
	);
};

export default VideoDetail;
