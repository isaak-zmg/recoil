import * as React from 'react';
import { useState } from 'react';
import { useRecilState } from 'recoil';
import { todoListState } from '@/stores/todos/todos';
import { Input } from 'antd';


export function TodoItemCreator() {
    const [inputValue, setInputValue] = useState("")
    const setTodoList = useRecilState(todoListState)


    return (
        <div>
            <Input value={inputValue}></Input>
            <Button></Button>
        </div>
    )


}


function getId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(3)
}