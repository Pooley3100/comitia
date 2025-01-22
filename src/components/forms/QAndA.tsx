import { useForm } from "react-hook-form";
import { FormData, UserSchema, ValidFieldNames } from "@/library/types";
import FormField from "./FormField";
import { zodResolver } from "@hookform/resolvers/zod";
import { submitQA } from "@/library/actions";
import { createDeleteId, setCookie } from "@/library/clientUtils";

const QAndA = ({update} : {update: (url: string) => void}) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm<FormData>({ resolver: zodResolver(UserSchema) });

    const onSubmit = async (data: FormData) => {
        console.log("SUCCESS CLIENT SIDE", data);
        try {
            const deleteId = createDeleteId();
            const {errors, rndUrl} = await submitQA(data, deleteId);
            
            if(rndUrl === null){
                console.log("Error updating databse")
            } else{
                console.log("URL: ", rndUrl);
                setCookie(deleteId, 'allow')
                update(rndUrl);
            }

            // Define a mapping between server-side field names and their corresponding client-side names
            const fieldErrorMapping: Record<string, ValidFieldNames> = {
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
        <form className="font-roman w-full h-full text-white text-2xl p-5 gap-3 flex flex-col items-center" onSubmit={handleSubmit(onSubmit)}>
            <h1>What is your Question?</h1>
            <FormField
                type="text"
                placeholder="Cats or Dogs"
                name="question"
                register={register}
                error={errors.question}
                id="qBox"
                className="bg-white w-4/5 p-2 rounded-md text-black whitespace-normal"
            />
            <h1>Details</h1>
            <textarea id='detailsBox' rows={6} className="w-4/5 resize-none rounded-md text-black" placeholder="Cats require less work, however dogs are more loyal, discuss?" {...register("details")}></textarea>
            {errors.details && <span className="text-black text-sm" id='error-msg'>{errors.details.message}</span>}
            <div className="flex h-full items-end w-1/4 rounded-2xl text-black">
                <button type="submit" className="bg-yellow-400 w-full rounded-2xl" id="createButton">
                    Create
                </button>
            </div>
        </form>
    )
}

export default QAndA