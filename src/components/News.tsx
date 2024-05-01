import {FC} from 'react';
import {
    Card, Counter,
    Div, Footnote,
    Header,
    Headline, Tappable,
    Title
} from "@vkontakte/vkui";
import {getDate} from "../utils/transformDate.ts";
import {Icon12Like} from "@vkontakte/icons";
import {useRouteNavigator} from "@vkontakte/vk-mini-apps-router";

export interface NewsProps {
    id: number;
    title: string;
    score: number;
    by: string;
    time: number;
}

const container = {
    padding: ".2rem 1rem",
    marginBottom: ".5rem",
}

const likes = {
    display: 'flex',
    alignItems: 'center',
    gap: '.1rem'
}

const footer = {
    display: 'flex',
    justifyContent: 'space-between'
}


const News: FC<NewsProps> = ({id, title, score, by, time}) => {
    const routeNavigator = useRouteNavigator();
    const openNews = () => {
        void routeNavigator.push(`news/${id}`)
    }

    return (
        <div style={container}>
            <Card>
                <Tappable onClick={openNews}>
                    <Header>
                        <Title>{title}</Title>
                        <Headline>Автор: {by}</Headline>
                    </Header>
                    <Div style={footer}>
                        <Footnote style={likes}><Icon12Like/><Counter>{score}</Counter></Footnote>
                        <Footnote>{getDate(time)}</Footnote>
                    </Div>
                </Tappable>
            </Card>
        </div>
    );
};

export default News;