import { useForm } from "react-hook-form";
import { PollData, PollSchema, ValidPollFieldNames } from "@/library/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { submitPoll } from "@/library/actions";
import PollOptions from "./PollOptions";

const Poll = ({ update }: { update: (url: string) => void }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
        control,
    } = useForm<PollData>({ resolver: zodResolver(PollSchema), defaultValues: {
        options: [{option: ""}, {option: ""}]
    } });

    const onSubmit = async (data: PollData) => {
        console.log("SUCCESS CLIENT SIDE", data);
        try {
            const { errors, rndUrl } = await submitPoll(data);

            if (rndUrl === null) {
                console.log("Error updating databse")
            } else {
                console.log("URL: ", rndUrl);
                update(rndUrl);
            }

            // Define a mapping between server-side field names and their corresponding client-side names
            const fieldErrorMapping: Record<string, ValidPollFieldNames> = {
                question: "question",
                details: "details"
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
            {errors.question && <span className="text-black text-sm">{errors.question.message}</span>}
            </div>
            
            <div className="flex flex-row">
            <h1 className="text-lg mr-10">Details:</h1>
            <textarea rows={4} className="w-4/5 resize-none rounded-md text-black" id='details' placeholder="Cats require less work, however dogs are more loyal, discuss?" {...register("details")}></textarea>
            </div>
            {errors.details && <span className="text-black text-sm">{errors.details.message}</span>}
            <PollOptions control={control} type='text' register={register} name='options' error={errors.options} />
            <div className="flex h-auto items-end w-1/4 rounded-2xl text-black">
                <button type="submit" className="bg-red-400 w-full rounded-2xl">
                    Create
                </button>
            </div>
        </form>
    )
}

export default Poll