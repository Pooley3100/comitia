import { useForm } from "react-hook-form";
import { PollData, PollSchema, ValidPollFieldNames } from "@/library/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { submitPoll } from "@/library/actions";
import PollOptions from "./PollOptions";
import { createDeleteId, setCookie } from "@/library/clientUtils";

const Poll = ({ update }: { update: (url: string) => void }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
        control,
    } = useForm<PollData>({ resolver: zodResolver(PollSchema), defaultValues: {
        options: ['Input 1','Input 2']
    } });

    const onSubmit = async (data: PollData) => {
        console.log("SUCCESS CLIENT SIDE", data);
        try {
            const deleteId = createDeleteId();
            const { errors, rndUrl } = await submitPoll(data, deleteId);

            if (rndUrl === null) {
                console.log("Error updating databse")
            } else {
                console.log("URL: ", rndUrl);
                setCookie(deleteId, 'allow');
                update(rndUrl);
            }

            // Define a mapping between server-side field names and their corresponding client-side names
            const fieldErrorMapping: Record<string, ValidPollFieldNames> = {
                question: "question",
                options: "options",
            };

            // Find the first field with an error in the response data
            const fieldWithError = Object.keys(fieldErrorMapping).find(
                (field) => errors[field]
            );

            // If a field with an error is found, update the form error state using setError
            if (fieldWithError) {
                // Use the ValidFieldNames type to ensure the correct field names
                setError(fieldErrorMapping[fieldWithError], {
                    type: "server",
                    message: errors[fieldWithError],
                });
            }

        } catch (error) {
            alert("Failure to submit")
        }

    }
    return (
        <form className="font-roman w-full h-full text-black text-2xl p-5 gap-3 flex flex-col items-center" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-row">
            <h3 className="text-lg mr-10">What is the Question: </h3>
            <input className='' type='text' placeholder='Cats or Dogs' {...register('question')} />
            {errors.question && <span className="ml-5 text-black text-sm">{errors.question.message}</span>}
            </div>
            
            <PollOptions 
                control={control} 
                type='text' 
                register={register} 
                name='options' 
                error={errors.options?.[0]} 
            />
            <div className="flex h-auto items-end w-1/4 rounded-2xl text-black">
                <button type="submit" className="bg-red-400 w-full rounded-2xl">
                    Create
                </button>
            </div>
        </form>
    )
}

export default Poll