interface FormFieldProps {
  label: string;
  name: string;
  type: string;
  value: string;
  error?: string;
  options?: { value: string; label: string }[];
  onChange: (value: string) => void;
}

export const FormField = ({
  label,
  name,
  type,
  value,
  error,
  options,
  onChange,
}: FormFieldProps) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}:</label>
      {type === 'select' ? (
        <select
          id={name}
          name={name}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        >
          {value === '' && (
            <option value="" disabled hidden>
              Select {label}
            </option>
          )}
          {options?.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
      {error && <div className="error-text">{error}</div>}
    </div>
  );
};
