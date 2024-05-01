import {FC, useState} from 'react';
import {Button,Counter, Group} from "@vkontakte/vkui";
import CommentCard from "./CommentCard.tsx";
import {getItemComments} from "../api/newsApi.ts";
import {IComment} from "../models/Comment.ts";

export interface CommentProps {
    by: string,
    kids?: number[],
    text: string,
    style?: { [key: string]: string }

}

const showMore__btn = {
    display: 'flex',
    alignItems: 'center',
    gap: '.5rem',
}

const Comment: FC<CommentProps> = ({by, kids, text, style}) => {
    const [loading, setLoading] = useState(false)
    const [answers, setAnswers] = useState<IComment[] | undefined>()

    const fetchAnswers = () => {
        setLoading(true)
        if (kids) getItemComments(kids)
            .then(data => {
                setAnswers(data)
            })
            .finally(() => setLoading(false))
    }


    return (
        <Group mode={'plain'} style={style}>
            <CommentCard by={by} text={text}/>
            {kids &&
                <div>
                    {answers ?
                        answers.map(answers =>
                            <Comment key={answers.id}
                                     by={answers.by}
                                     text={answers.text}
                                     kids={answers.kids}
                                     style={{marginLeft: `2rem`}}
                            />
                        )
                        : <Button onClick={fetchAnswers}
                                  loading={loading}
                                  mode={"tertiary"}
                                  style={showMore__btn}
                                  after={<Counter>{kids?.length}</Counter>}
                        >
                            Показать ответы
                        </Button>
                    }
                </div>
            }
        </Group>
    );
};

export default Comment;