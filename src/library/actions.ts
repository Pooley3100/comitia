'use server'
import { UserSchema, FormData } from "@/library/types";

export async function submitQA(data : FormData){
    //const body = data.entries();
    const result = UserSchema.safeParse(data);

    // Check if the validation is successful
  if (result.success) {
    return ({ success: true });
  }

  // If validation errors, map them into an object
  const serverErrors = Object.fromEntries(
    result.error?.issues?.map((issue) => [issue.path[0], issue.message]) || []
  );

  // Respond with a JSON object containing the validation errors
  return ({ errors: serverErrors });
}