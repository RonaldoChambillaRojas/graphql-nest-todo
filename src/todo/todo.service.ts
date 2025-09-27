import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { Todo } from './entity/todo.entity';

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
    

}
