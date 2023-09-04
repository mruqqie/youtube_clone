import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Box } from "@mui/material";
import {
	ChannelDetail,
	Feed,
	NavBar,
	SearchFeed,
	VideoDetail,
} from "./components";
import "./App.css";

function App() {
	return (
		<Box>
			<BrowserRouter>
				<NavBar />
				<Routes>
					<Route path="/channel/:id" element={<ChannelDetail />} />
					<Route path="/" element={<Feed />} />
					<Route
						path="/search/:searchTerm"
						element={<SearchFeed />}
					/>
					<Route path="/" element={<Feed />} />
					<Route path="/video/:id" element={<VideoDetail />} />
				</Routes>
			</BrowserRouter>
		</Box>
	);
}

export default App;
