import { Stack, Grid } from "@mui/material";
import SideBar from "./SideBar";

const Feed = () => {
	return <Grid direction="row" alignContent="flex-start" sx={{ display: "flex",width: "100%", border: "1px solid #ffffff"}}><SideBar /></Grid>;
};

export default Feed;
