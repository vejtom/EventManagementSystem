interface InputProps {
    id: string;
    label?: string;
    placeholder?: string;
    type?: 'text' | 'date' | 'datetime-local';
    initialText?: string;
  }

export const Input = ({
  id,
  label,
  placeholder,
  type = 'text',
  initialText
}: InputProps) => {
  return (
    <section className="flex flex-col">
      {label && <label htmlFor={id} className="font-medium mb-1">{label}</label>}
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        defaultValue={initialText}
        className="border border-gray-300 py-2 px-3 rounded-md focus:ring-2 focus:ring-primary focus:outline-none"
      />
    </section>
  );
};
