import prisma from './prisma';

export async function getRandomURL() : Promise<string> {
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