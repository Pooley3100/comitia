import { FieldError, UseFormRegister} from "react-hook-form";
import { z, ZodType } from "zod";

export type FormData = {
    question: string,
    details: string
}

export type ResponseData = {
    response: string,
    name: string
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

export const ResponseSchema: ZodType<ResponseData> = z.object
({
    response: z.string().min(2).max(80),
    name: z.string().min(0).max(20)
})

export type ValidFieldNames = "question" | "details"
export type ValidResponseFieldName = "name" | "response"