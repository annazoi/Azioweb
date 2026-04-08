interface Textarea {
	name: string;
	label: string;
	value?: string;
	onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
	required?: boolean;
}

export default function Textarea({ name, label, value, onChange, required }: Textarea) {
	return (
		<div className="w-full group">
			<label
				htmlFor={name}
				className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 italic mb-3 ml-1 group-focus-within:text-primary transition-colors"
			>
				{label}
			</label>
			<div className="relative">
				<textarea
					id={name}
					name={name}
					rows={4}
					placeholder={name}
					value={value}
					onChange={onChange}
					required={required}
					className="block w-full bg-white/5 rounded-2xl py-3 md:py-4 px-6 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-300 glass resize-none"
				/>
			</div>
		</div>
	);
}
