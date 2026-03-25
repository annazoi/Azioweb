interface Input {
	name: string;
	label: string;
	value?: string;
	type?: string;
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
	required?: boolean;
}

export default function Input({ name, label, value, type = 'text', onChange, required }: Input) {
	return (
		<div className="w-full group">
			<label htmlFor={name} className="block text-sm font-medium text-slate-400 group-focus-within:text-primary transition-colors mb-2 ml-1">
				{label}
			</label>
			<div className="relative">
				<input
					id={name}
					name={name}
					type={type}
					placeholder={name}
					value={value}
					onChange={onChange}
					required={required}
					className="block w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-300 glass"
				/>
			</div>
		</div>
	);
}
