'use server'
import { UserSchema, FormData, ResponseData, ResponseSchema } from "@/library/types";
import { getRandomURL } from "@/library/utils"
import prisma from "./prisma";

type response = {
    rndUrl: string | null
    errors: { [key: string]: string | undefined }
}

//Receive question declerations
export async function submitQA(data: FormData): Promise<response> {
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
                    url: rndUrl
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

//Receive responses to questions
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