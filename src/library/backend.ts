import { FormData } from '@/library/types'
import { SafeParseSuccess } from 'zod';
import prisma from './prisma';
import { error } from 'console';

//Create Question / Poll
export async function createForum(form: SafeParseSuccess<FormData>) {
    let rndUrl : string = ''
    try {
        const rndUrl: string = await getRandomURL()
        if (rndUrl === 'Error') throw new Error("Error occurred in random generation");
        await prisma.questions.create({
            data: {
                question: form.data.question,
                details: form.data.details,
                public: false,
                url: rndUrl
            },
        });

        // revalidatePath("/list/subjects");
        return { url: rndUrl, successPrisma: true };
    } catch (err) {
        console.log(err); 
        return { url: rndUrl, successPrisma: false };
    }
}

async function getRandomURL() : Promise<string> {
    const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let url : string = '';

    while (url.length < 12) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        url += characters[randomIndex];
    }

    return prisma.questions.findFirst({ where: { url } })
        .then((question) => {
            if (question) {
                return getRandomURL();
            } else {
                return url;
            }
        })
        .catch((err) => {
            console.log(err);
            return "Error";
        });
}