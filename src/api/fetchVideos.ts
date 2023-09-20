import axios, { AxiosResponse } from "axios";
import { channel } from "diagnostics_channel";

interface Items {
	contentDetails: {
		duration: string;
	};
	id: string;
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
};

export interface VidApiRes {
	items: Items[];
}

export interface ChannelApiRes {
	items: ChannelItems[];
}

const VIDEO_BASE_URL = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet&part=contentDetails&part=localizations&part=player&part=statistics&chart=mostPopular&maxResults=40&key=${process.env.REACT_APP_API_KEY}`;

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
