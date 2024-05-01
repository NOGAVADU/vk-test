import {FC, useEffect, useState} from 'react';
import {
    Button, Counter,
    Div, Footnote, Group,
    Headline, IconButton, Link,
    NavIdProps,
    Panel, Paragraph, Spinner,
    Title
} from "@vkontakte/vkui";
import {INews} from "../models/News.ts";
import {useParams, useRouteNavigator} from "@vkontakte/vk-mini-apps-router";
import {getItemById, getItemComments} from "../api/newsApi.ts";
import {Icon12Like, Icon12Switch, Icon16Comment, Icon24Back} from "@vkontakte/icons";
import {getDate} from "../utils/transformDate.ts";
import Comment from "./Comment.tsx";

const header = {
    display: 'flex',
    justifyContent: 'space-between'
}

const footer = {
    display: 'flex',
    gap: '1rem'
}

const counter = {
    display: 'flex',
    alignItems: 'center',
    gap: '.1rem'
}


const NewsPage: FC<NavIdProps> = ({id}) => {
    const [loading, setLoading] = useState(false)
    const [fetchedNews, setNews] = useState<INews | undefined>()
    const [comments, setComments] = useState<IComment[] | undefined>()
    const routeNavigator = useRouteNavigator();
    const params = useParams<'id'>()

    const goBack = () => {
        routeNavigator.back()
    }

    const fetchData= (params) => {
        if (params) {
            const news = fetchNews(Number(params.id))
            const comments = fetchComments(Number(params.id))

            Promise.all([news, comments])
                .then(data => {
                    setNews(data[0])
                    setComments(data[1])
                })
        }
    }

    const fetchNews = (id: number) => {
        return getItemById(id)
    }

    const fetchComments = async (id: number) => {
        const data = await getItemById(id);
        if (data.kids)
        return await getItemComments(data.kids);
    }

    const updateComments = async (id: number) => {
        setLoading(true)
        getItemById(id)
            .then(data => getItemComments(data.kids))
            .then(comments => setComments(comments))
            .finally(() => setLoading(false))
    }

    useEffect(() => {
        fetchData(params)
        const interval = setInterval(fetchData, 60000);
        return () => clearInterval(interval);
    }, [])

    return (
        <Panel id={id}>
            <IconButton label='Вернуться назад' onClick={goBack}><Icon24Back/></IconButton>
            {fetchedNews ?
                <Group>
                    <Div style={{display: 'flex', flexDirection: "column", gap: '1rem'}}>
                        <Headline style={header}>
                            <span>Автор: {fetchedNews?.by}</span>
                            <span>{getDate(fetchedNews?.time)}</span>
                        </Headline>
                        <Title>{fetchedNews?.title}</Title>
                        {
                            fetchedNews?.url ?
                                <Link href={fetchedNews?.url} target="_blank">{fetchedNews?.url}</Link>
                                : <p dangerouslySetInnerHTML={{__html: fetchedNews?.text}}></p>
                        }
                        <Footnote style={footer}>
                                 <span style={counter}>
                                     <Icon12Like/>
                                     <Counter>{fetchedNews?.score}</Counter>
                                 </span>
                            <span style={counter}>
                                    <Icon16Comment/>
                                     <Counter>{fetchedNews?.descendants}</Counter>
                                 </span>
                        </Footnote>
                    </Div>
                    <Div>
                        <Title level={'3'} style={header}>
                            Комментарии
                            <Button onClick={() => updateComments(Number(params?.id))}
                                    loading={loading}
                                    before={<Icon12Switch/>}>Обновить
                            </Button>
                        </Title>
                    </Div>
                    <Div>
                        {comments ?
                            comments.map(comment => (
                                <Comment key={comment.id} by={comment.by} text={comment.text} kids={comment.kids}/>
                            ))
                            : <Paragraph weight={"3"}>Пока никто не комментировал эту запись</Paragraph>}
                    </Div>
                </Group>
                : <Spinner size={'large'}/>}

        </Panel>
    )
}


export default NewsPage;