'use server'
import { UserSchema, FormData } from "@/library/types";
import { getRandomURL } from "@/library/utils"
import prisma from "./prisma";

type response = {
    rndUrl : string | null
    errors : {[key: string]: string | undefined}
}

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
            return( {rndUrl, errors: {}})
        } catch (err) {
            console.log(err);
            return { errors: {}, rndUrl : null };
        }
    }

    // If validation errors, map them into an object
    const serverErrors = Object.fromEntries(
        result.error?.issues?.map((issue) => [issue.path[0], issue.message]) || []
    );

    // Respond with a JSON object containing the validation errors
    return ({ errors: serverErrors, rndUrl: null});
}