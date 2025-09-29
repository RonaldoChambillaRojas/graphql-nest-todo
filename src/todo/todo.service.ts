import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { Todo } from './entity/todo.entity';
import { CreateTodoInput } from './dto/inputs/create-todo.input';
import { UpdateTodoInput } from './dto/inputs/update-todo.input';

@Injectable()
export class TodoService {

    private todos: Todo[] = [
        {
        id: 1,
        description: 'Piedra del alma',
        done: false
        },
        {
        id: 2,
        description: 'Piedra del Espacio',
        done: false
        },
        {
        id: 3,
        description: 'Piedra del Poder',
        done: false
        },
    ];

    findAll(): Todo[]{
        return this.todos;
    };

    findOne(id): Todo{

        const tarea = this.todos.find( todo => todo.id === id)

        if (!tarea){
            throw new BadRequestException(`Todo with id ${id} no exist.`)
        };

        return tarea;

    }

    createTodo( createTodoInput: CreateTodoInput ): Todo{

        const todo = new Todo();

        todo.description = createTodoInput.description;
        todo.id = Math.max( ...this.todos.map( todo=> todo.id ), 0) + 1;

        this.todos.push( todo );

        return todo;

    }

    updateTodo( { id, description, done }: UpdateTodoInput ): Todo{

        const todoToUpdate = this.findOne( id )

        if( description ) todoToUpdate.description = description;

        if( done !== undefined ) todoToUpdate.done = done;

        this.todos = this.todos.map( todo => {
            if( todo.id === id ) {
                return todoToUpdate
            }

            return todo;
        })

        return todoToUpdate;

    }
    

}
