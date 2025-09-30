import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { Todo } from './entity/todo.entity';
import { CreateTodoInput, StatusTodoArgs, UpdateTodoInput } from './dto';

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
        done: true
        },
        {
        id: 3,
        description: 'Piedra del Poder',
        done: false
        },
    ];

    findAll( {status}: StatusTodoArgs): Todo[]{

        if(status !== undefined){
            const todoFilters = this.todos.filter( todo => todo.done === status)
            return todoFilters;
        }

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

    deleteTodo( id ): boolean{
        const todoDelete = this.findOne(id)

        this.todos = this.todos.filter( todo => {
            if( todo !== todoDelete){
                return todo;
            }
        })

        return true;


    }

    // statusTodo( statusArgs: StatusArgs ): Todo[]{

    // }
    

}
