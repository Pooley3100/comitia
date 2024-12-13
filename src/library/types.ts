import { Control, FieldError, UseFormRegister} from "react-hook-form";
import { z, ZodType } from "zod";

export type FormData = {
    question: string,
    details: string
}

export type ResponseData = {
    response: string,
    name: string
}

type options = {
    option: string
}

export type PollData = {
    question: string,
    details: string,
    options: Array<options>
}

export type FormFieldProps = {
    type: string;
    placeholder: string;
    name: ValidFieldNames,
    register: UseFormRegister<FormData>;
    error: FieldError | undefined;
    valueAsNumber?: boolean
}

export type PollFieldProps = {
    type: string;
    register: UseFormRegister<PollData>;
    name: ValidPollFieldNames;
    error: FieldError | undefined;
    control: Control<PollData, any>
}

export const OptionSchema = z.object({
    option: z.string().min(2).max(40),
})

export const PollSchema: ZodType<PollData> = z.object
({
    question: z.string().min(2).max(21),
    details: z.string().max(100),
    options: z.array(OptionSchema).min(2).max(6),
})

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
export type ValidPollFieldNames = "question" | "details" | "options"