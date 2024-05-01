import {FC} from 'react';
import {Card, Div, Header} from "@vkontakte/vkui";

const container = {
    margin: '0.3rem 0'
}

const user = {
    display: 'flex'
}
export interface CommentCardProps {
    by: string,
    text: string,
    mode?: 'tint' | 'shadow' | 'outline' | 'outline-tint',
    style?: {[key: string] : string}
}
const CommentCard: FC<CommentCardProps> = ({by, text, mode = 'tint' , style}) => {
    return (
        <Card style={{...container, ...style}} mode={mode}>
            <Header style={user}>{by}</Header>
            <Div>
                <p dangerouslySetInnerHTML={{__html: text}}></p>
            </Div>
        </Card>
    );
};

export default CommentCard;