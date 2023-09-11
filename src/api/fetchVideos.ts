import axios, { AxiosResponse } from "axios";

const BASE_URL = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet&part=contentDetails&part=localizations&part=player&part=statistics&chart=mostPopular&maxResults=40&key=${process.env.REACT_APP_API_KEY}`;

const fetchVideos = async () => {
	try {
		const res: AxiosResponse = await axios.get(BASE_URL);
		return res.data;
	} catch (err) {
		console.error("Error Fetching Data:", err);
		throw err;
	}
};

export default fetchVideos;
