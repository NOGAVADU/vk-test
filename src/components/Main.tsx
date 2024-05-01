import {FC} from 'react';
import {
    Button,
    Div,
    Group,
    NavIdProps,
    Panel, Spinner,
    Title
} from "@vkontakte/vkui";
import {INews} from "../models/News.ts";
import News from "./News.tsx";

export interface MainProps extends NavIdProps {
    fetchedNews?: INews[];
    loading: boolean,
    fetchNews: () => void
}

const header = {
    display: 'flex',
    gap: '1rem',
    justifyContent: 'space-between'
}

const Main: FC<MainProps> = ({id, fetchedNews, loading, fetchNews}) => {
    return (
        <Panel id={id}>
            <Group
                header={
                    <Div>
                        <Title style={header}>
                            <span>Последние новости</span>
                            <Button onClick={fetchNews}
                                    loading={loading}
                                    appearance={'neutral'}
                            >
                                Обновить
                            </Button>
                        </Title>
                    </Div>
                }
                mode={"plain"}
                padding={'m'}
            >
                {fetchedNews ? fetchedNews?.map(news => (
                        <News key={news.id} id={news.id} title={news.title} score={news.score} by={news.by}
                              time={news.time}/>
                    )) :
                    <Spinner size={'large'}></Spinner>
                }
            </Group>
        </Panel>
    );
};

export default Main;