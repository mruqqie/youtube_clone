import axios, { AxiosResponse } from "axios";

interface Items {
	snippet: {
		textOriginal: string;
		authorDisplayName: string;
		authorProfileImageUrl: string;
	};
	publishedAt: string
}

export interface CommentsApiRes {
	items: Items[];
}

const fetchComments = async (videoId: string): Promise<CommentsApiRes> => {
	try {
		const COMMENTS_BASE_URL = `https://youtube.googleapis.com/youtube/v3/commentThreads?part=id&part=snippet&part=replies&maxResults=100&videoId=${videoId}&key=${process.env.REACT_APP_API_KEY}`;
		const res: AxiosResponse = await axios.get<CommentsApiRes>(
			COMMENTS_BASE_URL
		);
		return res.data;
	} catch (err) {
		console.log("Error Fetching comments:", err);
		throw err;
	}
};

export { fetchComments };
