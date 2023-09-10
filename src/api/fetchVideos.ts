import axios, {AxiosResponse} from "axios";

interface MyData {
    id: string;
    title: string;
    thumbnail: string;
    channelId: string;
    publishedAt: Date;
    duration: string;
    channelTitle: string;
    viewCount: string
}