import * as React from 'react';
import { useRecoilValue, useRecilState } from 'recoil';
import { todoListState } from '@/stores/todos/todos';
import { Input, Checkbox, Button } from "antd"


export function TodoItem({ item }) {
    const [todoList, setTodoList] = useRecilState(todoListState)


    return (
        <div style={{ display: "flex" }}>
            <div>
                <Checkbox></Checkbox>
            </div>
            <div>
                <Input></Input>
            </div>
            <div>
                <Button>delete</Button>
            </div>

        </div>
    )
}