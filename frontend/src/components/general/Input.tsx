interface InputProps {
  inputType?: 'text' | 'textarea';
  id: string;
  label?: string;
  placeholder?: string;
  type?: 'text' | 'date' | 'datetime-local';
  value?: string;
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register?: any; // Accept register prop from react-hook-form
  readOnly?: boolean;
}

export const Input = ({
  inputType = 'text',
  id,
  label,
  placeholder,
  type = 'text',
  register,
  value,
  onChange,
  readOnly = false,
}: InputProps) => {
  return (
    <section className="flex flex-col w-full">
      {label && (
        <label htmlFor={id} className="font-medium mb-1 text-left">
          {label}
        </label>
      )}
      {inputType === 'textarea' ? (
        <textarea
          id={id}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          readOnly={readOnly}
          {...register}
          className="border border-gray-300 py-2 px-3 rounded-md focus:ring-2 focus:ring-primary focus:outline-none w-full h-32 min-h-40"
        />
      ) : (
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          readOnly={readOnly}
          {...register}
          className="border border-gray-300 py-2 px-3 rounded-md focus:ring-2 focus:ring-primary focus:outline-none w-full"
        />
      )}
    </section>
  );
};

export default Input;
