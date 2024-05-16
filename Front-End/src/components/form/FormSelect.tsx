interface FormSelectProps {
	className: string;
	label: string;
	labelClassName: string;
	name: string;
	onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
	options: string[];
	placeholder: string;
	value: string;
}

export const FormSelect: React.FC<FormSelectProps> = ({
	className,
	label,
	labelClassName,
	name,
	onChange,
	options,
	placeholder,
	value,
}) => {
	return (
		<div>
			<label className={labelClassName}>{label}</label>
			<select
				className={className}
				name={name}
				onChange={onChange}
				value={value}>
				<option value="">{placeholder}</option>
				{options.map((option, index) => (
					<option
						key={index}
						value={option}>
						{option}
					</option>
				))}
			</select>
		</div>
	);
};
