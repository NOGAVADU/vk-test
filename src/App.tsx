import {useState, useEffect} from 'react';
import {View, SplitLayout, SplitCol} from '@vkontakte/vkui';
import {useActiveVkuiLocation} from '@vkontakte/vk-mini-apps-router';

import {DEFAULT_VIEW_PANELS} from './routes';
import {getActualNews} from "./api/newsApi.ts";
import {INews} from "./models/News.ts";
import Main from "./components/Main.tsx";
import NewsPage from "./components/NewsPage.tsx";

export const App = () => {
    const {panel: activePanel = DEFAULT_VIEW_PANELS.MAIN} = useActiveVkuiLocation();
    const [loading, setLoading] = useState(true)
    const [fetchedNews, setNews] = useState<INews[] | undefined>()
    const fetchNews = () => {
        setLoading(true)
        getActualNews(100)
            .then(data => setNews(data))
            .finally(() => setLoading(false));
    }

    useEffect(() => {
        fetchNews()
        const interval = setInterval(fetchNews, 60000);
        return () => clearInterval(interval);
    }, []);

    return (
        <SplitLayout>
            <SplitCol>
                <View activePanel={activePanel}>
                    <Main id="main" fetchedNews={fetchedNews} loading={loading} fetchNews={fetchNews}/>
                    <NewsPage id='news'/>
                </View>
            </SplitCol>
        </SplitLayout>
    );
};
