import axios, { AxiosResponse } from "axios";

interface Items {
	contentDetails: {
		duration: string;
	};
	id: string;
	snippet: {
		channelTitle: string;
		channelId: string;
		localized: {
			title: string;
		};
		thumbnails: {
			default: {
				url: string;
			};
			standard: {
				url: string;
			};
			maxres: {
				url: string;
			};
			high: {
				url: string;
			};
		};
		statistics: {
			viewcount: string;
		};
	};
}

export interface VidApiRes {
	items: Items[];
}

const BASE_URL = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet&part=contentDetails&part=localizations&part=player&part=statistics&chart=mostPopular&maxResults=40&key=${process.env.REACT_APP_API_KEY}`;

const fetchVideos = async (): Promise<VidApiRes> => {
	try {
		const res: AxiosResponse = await axios.get<VidApiRes>(BASE_URL);
		return res.data;
	} catch (err) {
		console.error("Error Fetching Data:", err);
		throw err;
	}
};

export default fetchVideos;
