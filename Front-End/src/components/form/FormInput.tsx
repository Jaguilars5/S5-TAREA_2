import React from "react";

interface FormInputProps {
	className: string;
	disabled?:boolean;
	label: string;
	labelClassName: string;
	name: string;
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
	placeholder: string;
	type: string;
	value: string;
}

export const FormInput: React.FC<FormInputProps> = ({
	className,
	disabled,
	label,
	labelClassName,
	name,
	onChange,
	placeholder,
	type,
	value,
}) => {
	return (
		<div>
			<label className={labelClassName}>{label}</label>
			<input
				className={className}
				name={name}
				onChange={onChange}
				placeholder={placeholder}
				type={type}
				value={value}
				disabled={disabled}
			/>
		</div>
	);
};
