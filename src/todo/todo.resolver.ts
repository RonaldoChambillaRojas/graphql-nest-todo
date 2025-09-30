import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Todo } from './entity/todo.entity';
import { TodoService } from './todo.service';
import { CreateTodoInput, UpdateTodoInput, StatusTodoArgs } from './dto';

@Resolver( () => Todo)
export class TodoResolver {

    constructor(
        private readonly todoService: TodoService,
    ){}

    @Query(() => [Todo],{
        name: 'todos'
    })
    findAll(
        @Args()
        statusTodoArgs: StatusTodoArgs
    ): Todo[]{
        return this.todoService.findAll(statusTodoArgs);
    }

    @Query( () => Todo, {
        name: 'todo'
    })
    findOne(
        @Args('id',{
            type: () => Int
        })
        id: number)
        {
        return this.todoService.findOne(id);
    }

    @Mutation( () => Todo, {
        name: 'createTodo'
    } )
    createTodo(
        @Args('createTodoInput') createTodoInput: CreateTodoInput
    ){

        return this.todoService.createTodo(createTodoInput);

    }

    @Mutation( () => Todo,{
        name: 'updateTodo',
    })
    updateTodo(
        @Args('updateTodoInput') updateTodoInput: UpdateTodoInput, 
    ){
        return this.todoService.updateTodo(updateTodoInput);
    }

    @Mutation( () => Boolean,{
        name: 'removeTodo',
    } )
    removeTodo(
        @Args('id',{
            type: () => Int,
        }) id: number,
    ){

        return this.todoService.deleteTodo(id);

    }

}
