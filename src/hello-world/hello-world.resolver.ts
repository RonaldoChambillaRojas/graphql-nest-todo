import { Args, Int, Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class HelloWorldResolver {

    @Query( () => String, {
        description: 'Hola mundo es lo que retorna.',
        name: 'hello'
    })
    helloWorld(): string {
        return 'Hola Mundo'
    }

    @Query( () => Number, {
        name: 'randomNumber',
    })
    getRandomNumber(): number {
        return Math.random() * 100;
    }

    @Query( () => Int, {
        name: 'randomFromZeroTo',
        description: 'Get number from zero to argument TO (default 6)'
    })
    getRandomFromZeroTo( 
        @Args('to',{
            type: () => Int,
            defaultValue: 6,
            nullable: true
        }) 
        to: number ): number{

        return Math.round( Math.random() * to );
    }



}
