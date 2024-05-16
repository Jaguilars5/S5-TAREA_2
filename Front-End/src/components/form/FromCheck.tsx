import React from "react";

interface FormCheckboxProps {
	checked: boolean;
	className: string;
	label: string;
	labelClassName: string;
	name: string;
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const FormCheckbox: React.FC<FormCheckboxProps> = ({
	checked,
	className,
	label,
	labelClassName,
	name,
	onChange,
}) => {
	return (
		<div>
			<label className={labelClassName}>{label}</label>
			<input
				checked={checked}
				className={className}
				name={name}
				onChange={onChange}
				type="checkbox"
			/>
		</div>
	);
};
