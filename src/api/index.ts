const BASE_URL = 'https://hacker-news.firebaseio.com/v0/'

export const makeRequest = async (
    method: string,
    url: string,
) => {
    try {
        const response = await fetch(`${BASE_URL}/${url}.json?print=pretty`, {
            method: method.toUpperCase(),
            headers: {
                "content-type": "application/json; charset=UTF-8",
                Accept: "application/json",
            },
        });
        if (response.ok) {
            return await response.json()
        }
        throw new Error ("Не удалось получить данные с сервера")
    } catch (e) {
        return Promise.reject(e)
    }
}