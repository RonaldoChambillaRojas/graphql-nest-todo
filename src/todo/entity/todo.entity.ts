import { Field, Int, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class Todo {

    @Field( () => Int, {
        description: 'Todo id'
    })
    id: number;

    @Field( () => String, {
        description: 'Todo Description'
    } )
    description: string;

    @Field( () => Boolean, {
        description: 'Todo status'
    })
    done: boolean = false;
    
}