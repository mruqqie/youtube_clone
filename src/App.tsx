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
import { createTheme, ThemeProvider } from "@mui/material";

const theme = createTheme({
	typography: {
		fontFamily: ["Oswald", "sans-serif"].join(","),
	},
});

function App() {
	return (
		<ThemeProvider theme={theme}>
			<Box sx={{ backgroundColor: "#000000" }}>
				<BrowserRouter>
					<NavBar />
					<Routes>
						<Route
							path="/channel/:id"
							element={<ChannelDetail />}
						/>
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
		</ThemeProvider>
	);
}

export default App;
