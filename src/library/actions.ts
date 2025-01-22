'use server'
import { UserSchema, FormData, ResponseData, ResponseSchema, PollData, PollSchema } from "@/library/types";
import { getRandomURL, getRandomURLPoll } from "@/library/utils"
import prisma from "./prisma";

type response = {
    rndUrl: string | null
    errors: { [key: string]: string | undefined }
}

//Receive question declerations on form question creation
export async function submitQA(data: FormData, deleteId: string): Promise<response> {
    //const body = data.entries();
    const result = UserSchema.safeParse(data);

    // Check if the validation is successful and if so attempt to add to database
    if (result.success) {
        let rndUrl: string = '';
        try {
            const rndUrl: string = await getRandomURL()
            if (rndUrl === 'Error') throw new Error("Error occurred in random generation");
            await prisma.questions.create({
                data: {
                    question: data.question,
                    details: data.details,
                    public: false,
                    url: rndUrl,
                    deleteId: deleteId
                },
            });
            return ({ rndUrl, errors: {} })
        } catch (err) {
            console.log(err);
            return { errors: {}, rndUrl: null };
        }
    }

    // If validation errors, map them into an object
    const serverErrors = Object.fromEntries(
        result.error?.issues?.map((issue) => [issue.path[0], issue.message]) || []
    );

    // Respond with a JSON object containing the validation errors
    return ({ errors: serverErrors, rndUrl: null });
}

export async function submitPoll(data: PollData, deleteId: string) : Promise<response>{
    console.log('received: ', data)
    console.log('array', data.options)
    const result = PollSchema.safeParse(data);
    console.log('result is', result)
    // Check if the validation is successful and if so attempt to add to database
    if (result.success) {
        try {
            const rndUrl: string = await getRandomURLPoll()
            if (rndUrl === 'Error') throw new Error("Error occurred in random generation");
            const clickArr = Array(data.options.length).fill(0);
            await prisma.polls.create({
                data: {
                    question: data.question,
                    public: false,
                    url: rndUrl,
                    clickCount: clickArr,
                    options: data.options,
                    deleteId: deleteId
                },
            });

            return ({ rndUrl, errors: {} })
        } catch(error) {
            if (error instanceof Error){
                console.log("Error: ", error.stack)
            }
            return { errors: {}, rndUrl: null };
        }
    }

    // If validation errors, map them into an object
    const serverErrors = Object.fromEntries(
        result.error?.issues?.map((issue) => [issue.path[0], issue.message]) || []
    );

    // Respond with a JSON object containing the validation errors
    return ({ errors: serverErrors, rndUrl: null });
}

//Receive list responses to questions, dependdent on url
export async function submitQAResponse(data: ResponseData, url: string) {
    const result = ResponseSchema.safeParse(data);

    if (result.success) {
        try {
            // Find the question record by the unique URL
            const question = await prisma.questions.findUnique({
                where: { url: url },
            });

            if (!question) {
                throw new Error('Question not found');
            }

            // Create the response record and connect it to the question record
            const response = await prisma.response.create({
                data: {
                    responseText: data.response,
                    name: data.name,
                    questions: {
                        connect: { id: question.id },
                    }
                },
            });

            return { errors: null };
        } catch (err) {
            console.log('db err')
        }
    }

    // If validation errors, map them into an object
    const serverErrors = Object.fromEntries(
        result.error?.issues?.map((issue) => [issue.path[0], issue.message]) || []
    );

    return ({ errors: serverErrors });
}

// update number likes on a response
export async function updateDbLikes(responseId: number){
    try{
        const updateResponse = await prisma.response.update({
            where: {
                id: responseId
            },
            data: { 
                likes: {
                    increment: 1,
                }
            }
        })
    } catch(err){
        console.log('dr err in update responses')
    }
}

//update public to true, default is false when creating question
export async function updatePublicQ(url: string){
    try{
        await prisma.questions.update({
            where: {
                url
            },
            data: { 
                public: true
            }
        })
    } catch(err){
        // bit hacky but then try update polls
        try{
            await prisma.polls.update({
                where: {
                    url
                },
                data: { 
                    public: true
                }
            })
        } catch(err){
            // bit hacky but then try update polls
            console.log('dr err in update public for url: ', url)
        }
    }
}