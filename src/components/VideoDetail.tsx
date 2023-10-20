import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";
import { Box, Button, Stack, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";
import { CommentsApiRes, fetchComments } from "../api/fetchComments";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbDownOutlinedIcon from "@mui/icons-material/ThumbDownOutlined";

const VideoDetail = () => {
	const location = useLocation();
	const { id, title, channelImg, channelTitle } = location.state;

	const [comments, setComments] = useState<CommentsApiRes | null>(null);

	useEffect(() => {
		fetchCommentData();
	}, []);

	const fetchCommentData = async () => {
		try {
			const commentsData = await fetchComments(id);
			setComments(commentsData);
		} catch (err) {
			console.log(err);
		}
	};

	console.log(
		comments?.items.map(
			(comment) => comment.snippet.topLevelComment.snippet
		)
	);

	return (
		<>
			<NavBar />
			<Box>
				<Stack
					sx={{
						paddingLeft: { xs: 0 },
						paddingTop: "20px",
						xs: { margin: "auto" },
					}}
				>
					<Stack
						sx={{
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
							height: "auto",
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
					<Stack
						direction="row"
						sx={{
							width: "100%",
							display: "flex",
							justifyContent: "space-between",
							alignItems: "center",
						}}
					>
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
								sx={{
									textTransform: "none",
									width: "100px",
									fontWeight: "600",
									color: "#000000",
									borderRadius: "20px",
									backgroundColor: "#ffffff",
									"&:hover": {
										backgroundColor: "#e0e0e0",
									},
								}}
							>
								Subsribe
							</Button>
						</Stack>
					</Stack>
				</Stack>
				<Stack
					gap={2}
					sx={{
						margin: { xs: "auto" },
						marginLeft: { sm: "6vw" },
						paddingTop: 2,
						width: {
							xs: "90%",
							sm: "70%",
							lg: "62%",
						},
					}}
				>
					<Typography
						sx={{
							width: "100%",
							height: "auto",
							fontWeight: "medium",
							fontSize: "medium",
						}}
					>
						Comments
					</Typography>

					{comments?.items.map((item) => {
						const timePosted = (timestamp: string) => {
							const currentDate = new Date();
							const publishedDate = new Date(timestamp);
							const timeDifference =
								Number(currentDate) - Number(publishedDate);

							const seconds = Math.floor(timeDifference / 1000);
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
							<Stack
								gap={1}
								direction="row"
								sx={{
									width: "auto",
									display: "flex",
									alignItems: "flex-start",
								}}
							>
								<img
									src={
										item.snippet.topLevelComment.snippet
											.authorProfileImageUrl
									}
									width={35}
									height={35}
									className="channelPic"
								/>
								<Stack>
									<Stack
										direction="row"
										gap={1}
										sx={{
											width: "auto",
											display: "flex",
											alignItems: "center",
											height: "auto",
										}}
									>
										<Typography
											sx={{
												height: "auto",
												fontWeight: "medium",
												fontSize: "small",
											}}
										>
											{
												item.snippet.topLevelComment
													.snippet.authorDisplayName
											}
										</Typography>
										<Typography
											sx={{
												color: "#ada9a9",
												height: "100%",
												fontWeight: "medium",
												fontSize: "x-small",
											}}
										>
											{timePosted(
												item.snippet.topLevelComment
													.snippet.publishedAt
											)}
										</Typography>
									</Stack>
									<Stack>
										<Typography
											sx={{
												height: "auto",
												fontWeight: "100",
												fontSize: "small",
											}}
										>
											{
												item.snippet.topLevelComment
													.snippet.textOriginal
											}
										</Typography>
									</Stack>
									<Stack direction="row" gap={1.5} sx={{
												display: "flex",
												alignItems: "flex-end",
												marginTop: "7px"
											}}>
										<Stack
											direction="row"
											gap={0.5}
											sx={{
												display: "flex",
												alignItems: "flex-end",
											}}
										>
											<ThumbUpOutlinedIcon
												fontSize="small"
												sx={{ color: "#bdbdbd" }}
											/>
											<Typography
												sx={{
													color: "#ada9a9",
													height: "100%",
													fontWeight: "medium",
													fontSize: "x-small",
												}}
											>
												{item.snippet.topLevelComment
													.snippet.likeCount === 0
													? ""
													: item.snippet
															.topLevelComment
															.snippet.likeCount}
											</Typography>
										</Stack>
										<ThumbDownOutlinedIcon
											fontSize="small"
											sx={{ color: "#bdbdbd" }}
										/>
									</Stack>
								</Stack>
							</Stack>
						);
					})}
				</Stack>
			</Box>
		</>
	);
};

export default VideoDetail;
