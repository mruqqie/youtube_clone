import axios, { AxiosResponse } from "axios";

interface Items {
	id: {
		kind: string;
		channelId: string;
		videoId: string;
		playlistId: string;
	};
	snippet: {
		title: string;
		description: string;
		thumbnails: {
			default: {
				url: string;
			};
			medium: {
				url: string;
			};
			high: {
				url: string;
			};
		};
		channelTitle: string;
		channelId: string;
		publishedAt: string;
	};
}

export interface searchApiRes {
	items: Items[];
}

const fetchSearchResult = async (
	searchTerm: string
): Promise<searchApiRes> => {
	try {
		const SEARCH_URL = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=50&q=${searchTerm}&type=video&videoEmbeddable=true&key=${process.env.REACT_APP_API_KEY}`;
		const res: AxiosResponse = await axios.get<searchApiRes>(SEARCH_URL);

		return res.data;
	} catch (err) {
		console.log("Error fetching search results:", err);
		throw err;
	}
};

export { fetchSearchResult };
