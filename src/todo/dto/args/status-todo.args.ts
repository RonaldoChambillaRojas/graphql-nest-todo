import { ArgsType, Field } from "@nestjs/graphql";
import { IsBoolean, IsOptional } from "class-validator";


@ArgsType()
export class StatusTodoArgs {

    @Field( () => Boolean,{
        nullable: true,
    })
    @IsBoolean()
    @IsOptional()
    status?: boolean;

}