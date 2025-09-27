import { Field, InputType } from "@nestjs/graphql";


@InputType()
export class CreateTodoInput {

    @Field( () => String , {
        description: 'Whats needs to be done'
    })
    description: string;

}