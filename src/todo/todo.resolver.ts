import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Todo } from './entity/todo.entity';
import { TodoService } from './todo.service';
import { CreateTodoInput, UpdateTodoInput, StatusTodoArgs } from './dto';
import { AggregationsType } from './types/aggregations.type';

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

    // Agregations

    @Query( () => Int,{
        name: 'totalTodos'
    })
    totalTodos(){

        return this.todoService.totalTodos;

    }
    @Query( () => Int,{
        name: 'completeTodos'
    })
    completeTodos(){

        return this.todoService.completeTodos;

    }
    @Query( () => Int,{
        name: 'pendingTodos'
    })
    pendingTodos(){

        return this.todoService.pendigTodos;

    }

    @Query( () => AggregationsType,{
        name: 'aggregations'
    })
    aggregations(): AggregationsType{

        return{
            completed:this.completeTodos() ,
            pending:this.pendingTodos() ,
            total:this.totalTodos(),
        }

    }





}
