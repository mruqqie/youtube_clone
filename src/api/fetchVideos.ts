import axios, { AxiosResponse } from "axios";

interface Items {
	contentDetails: {
		duration: string;
	};
	id: string;
	player: {
		embedHtml: string;
	};
	snippet: {
		channelTitle: string;
		channelId: string;
		publishedAt: string;
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
				height: string;
				width: string;
			};
		};
	};
	statistics: {
		viewCount: string;
	};
	nextPageToken: string;
}

interface ChannelItems {
	id: string;
	snippet: {
		thumbnails: {
			default: {
				url: string;
				height: string;
				width: string;
			};
			medium: {
				url: string;
				height: string;
				width: string;
			};
			high: {
				url: string;
				height: string;
				width: string;
			};
		};
	};
}

export interface VidApiRes {
	items: Items[];
	nextPageToken?: string;
}

export interface ChannelApiRes {
	items: ChannelItems[];
}

const VIDEO_BASE_URL = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet&part=contentDetails&part=localizations&part=player&part=statistics&chart=mostPopular&maxResults=50&key=${process.env.REACT_APP_API_KEY}`;

const fetchVideos = async (): Promise<VidApiRes> => {
	try {
		const res: AxiosResponse = await axios.get<VidApiRes>(VIDEO_BASE_URL);
		return res.data;
	} catch (err) {
		console.error("Error Fetching Data:", err);
		throw err;
	}
};

const fetchChannelDetails = async (
	channelId: string
): Promise<ChannelApiRes> => {
	try {
		const CHANNEL_BASE_URL = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet&id=${channelId}&key=${process.env.REACT_APP_API_KEY}`;
		const res: AxiosResponse = await axios.get<ChannelApiRes>(
			CHANNEL_BASE_URL
		);
		return res.data;
	} catch (err) {
		console.error("Error Fetching Channel Details:", err);
		throw err;
	}
};

export { fetchVideos, fetchChannelDetails };
