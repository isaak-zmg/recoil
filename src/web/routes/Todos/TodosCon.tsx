import React from 'react';
import {
    RecoilRoot,
    atom,
    selector,
    useRecoilState,
    useRecoilValue,
} from 'recoil';
import { Todos } from './Todos';


export default class TodosCon extends React.Component<any, any> {
    render() {
        return (
            <RecoilRoot>
                <Todos />
            </RecoilRoot>
        );
    }
}