type FilterPillsProps<T extends string> = {
  /** Shared by the radios, so arrow keys move within the group. */
  name: string;
  legend: string;
  options: Array<{ value: T; label: string }>;
  value: T;
  onChange: (value: T) => void;
};

/** A single-choice filter drawn as pills, built on native radios. */
export function FilterPills<T extends string>({ name, legend, options, value, onChange }: FilterPillsProps<T>) {
  return (
    <fieldset>
      <legend className="text-xs font-medium uppercase tracking-[0.2em] text-titanium-500">{legend}</legend>
      <div className="mt-3 flex flex-wrap gap-2">
        {options.map((option) => (
          <label
            key={option.value}
            className="inline-flex min-h-11 cursor-pointer items-center rounded-full border border-line bg-white/[0.03] px-4 text-sm text-titanium-300 transition-colors duration-200 hover:border-copper-500/60 hover:text-copper-300 has-checked:border-copper-500 has-checked:bg-copper-500/15 has-checked:text-copper-300 has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-copper-400"
          >
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={() => onChange(option.value)}
              className="sr-only"
            />
            {option.label}
          </label>
        ))}
      </div>
    </fieldset>
  );
}
