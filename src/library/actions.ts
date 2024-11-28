'use server'
import { UserSchema, FormData } from "@/library/types";
import {createForum} from "@/library/backend"

type ResponseType = {
    errors: { [k: string]: string} ; url: string; successPrisma: boolean
}

export async function submitQA(data : FormData) : Promise<ResponseType> {
    //const body = data.entries();
    const result = UserSchema.safeParse(data);

    // Check if the validation is successful
  if (result.success) {
    const resultCreate = await createForum(result)
    return { errors: {}, ...resultCreate };
  }

  // If validation errors, map them into an object
  const serverErrors = Object.fromEntries(
    result.error?.issues?.map((issue) => [issue.path[0], issue.message]) || []
  );

  // Respond with a JSON object containing the validation errors
  return ({ errors: serverErrors, url: "", successPrisma: false });
}