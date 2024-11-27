import { FormFieldProps } from "@/library/types";

const FormField: React.FC<FormFieldProps & { className?: string }> = ({
  type,
  placeholder,
  name,
  register,
  error,
  valueAsNumber,
  className
}) => (
    <>
        <input  className={className} type={type} placeholder={placeholder} {...register(name, {valueAsNumber})}/>
        {error && <span className="text-black text-sm">{error.message}</span>}
    </>
);
export default FormField