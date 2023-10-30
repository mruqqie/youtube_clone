import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Box, CssBaseline } from "@mui/material";
import {
	ChannelDetail,
	Feed,
	NavBar,
	SearchFeed,
	VideoDetail,
} from "./components";
import "./App.css";
import { createTheme } from "@mui/material";

const theme = createTheme({
	typography: {
		fontFamily: ["Oswald", "sans-serif"].join(","),
	},
});

function App() {
	return (
		<Box sx={{ backgroundColor: "#000000" }}>
			<BrowserRouter basename="/youtube_clone">
				<Routes>
					<Route path="/">
						<Route
							path="/channel/:id"
							element={<ChannelDetail />}
						/>
						<Route path="/" element={<Feed />} />
						<Route
							path="/search/:searchTerm"
							element={<SearchFeed />}
						/>
						<Route path="/video/:id" element={<VideoDetail />} />
					</Route>
				</Routes>
			</BrowserRouter>
		</Box>
	);
}

export default App;
