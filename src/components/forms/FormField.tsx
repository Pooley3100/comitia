import { FormFieldProps } from "@/library/types";

const FormField: React.FC<FormFieldProps & { className?: string, id?: string }> = ({
  type,
  placeholder,
  name,
  register,
  error,
  valueAsNumber,
  className,
  id
}) => (
    <>
        <input  id={id} className={className} type={type} placeholder={placeholder} {...register(name, {valueAsNumber})}/>
        {error && <span className="text-black text-sm" id='error-msg'>{error.message}</span>}
    </>
);
export default FormField