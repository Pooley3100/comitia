import { FieldError, UseFormRegister} from "react-hook-form";
import { z, ZodType } from "zod";

export type FormData = {
    question: string,
    details: string
}

export type FormFieldProps = {
    type: string;
    placeholder: string;
    name: ValidFieldNames,
    register: UseFormRegister<FormData>;
    error: FieldError | undefined;
    valueAsNumber?: boolean
}

export const UserSchema: ZodType<FormData> = z.object
({
    question: z.string().min(2).max(21),
    details: z.string().max(100)
})

export type ValidFieldNames = "question" | "details"