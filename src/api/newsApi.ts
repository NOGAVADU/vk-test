import {makeRequest} from "./index.ts";
import {INews} from "../models/News.ts";

export const getItemById = async (id: number) => makeRequest('get', `item/${id}`)
export const getActualNewsIds = async (): Promise<number[]> => makeRequest('get', 'newstories')

export const getActualNews = async (limit: number): Promise<INews[]> => {
    const ids = await getActualNewsIds().then(ids => ids.slice(0, limit));
    const newsPromises = ids.map(id => getItemById(id));
    return Promise.all(newsPromises).then(news => news.sort((a, b) => b.time - a.time))
}
export const getItemComments = async (commentsId: number[]): Promise<IComment[]> => {
    const commentsPromises = commentsId.map(id => getItemById(id))
    return Promise.all(commentsPromises)
}

