import * as React from 'react';
import { useRecoilValue } from 'recoil';
import { todoListState } from '@/stores/todos/todos';
import { TodoItem } from './TodoItem';


export function Todos() {
    
    const todoList = useRecoilValue(todoListState);

    return (
        <div>

            

            {todoList.map((todoItem) => (
                <TodoItem key={todoItem.id} item={todoItem} />
            ))}
        </div>
    )
}