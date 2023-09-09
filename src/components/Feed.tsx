import { Stack, Grid, Skeleton, Box, useMediaQuery } from "@mui/material";
import SideBar from "./SideBar";

const Feed = () => {
	const isXsScreen = useMediaQuery("(max-width:600px)");
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
				<Grid
					item
					xs={12}
					sm="auto"
				>
					<SideBar />
				</Grid>
			)}

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
						<Box>
							<Skeleton
								sx={{
									bgcolor: "grey.800",
									width: "100%",
									paddingBottom: "65%",
								}}
								variant="rounded"
							/>
						</Box>
					</Grid>
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
						<Box>
							<Skeleton
								sx={{
									bgcolor: "grey.800",
									width: "100%",
									paddingBottom: "65%",
								}}
								variant="rounded"
							/>
						</Box>
					</Grid>
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
						<Box>
							<Skeleton
								sx={{
									bgcolor: "grey.800",
									width: "100%",
									paddingBottom: "65%",
								}}
								variant="rounded"
							/>
						</Box>
					</Grid>
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
						<Box>
							<Skeleton
								sx={{
									bgcolor: "grey.800",
									width: "100%",
									paddingBottom: "65%",
								}}
								variant="rounded"
							/>
						</Box>
					</Grid>
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
						<Box>
							<Skeleton
								sx={{
									bgcolor: "grey.800",
									width: "100%",
									paddingBottom: "65%",
								}}
								variant="rounded"
							/>
						</Box>
					</Grid>
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
						<Box>
							<Skeleton
								sx={{
									bgcolor: "grey.800",
									width: "100%",
									paddingBottom: "65%",
								}}
								variant="rounded"
							/>
						</Box>
					</Grid>
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
						<Box>
							<Skeleton
								sx={{
									bgcolor: "grey.800",
									width: "100%",
									paddingBottom: "65%",
								}}
								variant="rounded"
							/>
						</Box>
					</Grid>
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
						<Box>
							<Skeleton
								sx={{
									bgcolor: "grey.800",
									width: "100%",
									paddingBottom: "65%",
								}}
								variant="rounded"
							/>
						</Box>
					</Grid>
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
						<Box>
							<Skeleton
								sx={{
									bgcolor: "grey.800",
									width: "100%",
									paddingBottom: "65%",
								}}
								variant="rounded"
							/>
						</Box>
					</Grid>
				</Grid>
			</Grid>
			{isXsScreen && (
				<Grid
					item
					xs={12}
					sm="auto"
				>
					<SideBar />
				</Grid>
			)}
		</Grid>
	);
};

export default Feed;
