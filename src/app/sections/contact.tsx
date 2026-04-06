'use client';
import Textarea from '@/components/ui/textarea';
import Input from '@/components/ui/input';
import { motion } from 'framer-motion';
import StatusMessage from '@/components/ui/StatusMessage';
import { useState } from 'react';

type Status = 'idle' | 'sending' | 'success' | 'error';

import { EnvelopeIcon } from '@heroicons/react/24/outline';

const Contact = () => {
	const [form, setForm] = useState({
		firstName: '',
		lastName: '',
		email: '',
		message: '',
	});
	const [status, setStatus] = useState<Status>('idle');

	const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		setForm((prev) => ({ ...prev, [field]: e.target.value }));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setStatus('sending');
		try {
			const res = await fetch('/api/contact', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(form),
			});
			if (res.ok) {
				setStatus('success');
				setForm({ firstName: '', lastName: '', email: '', message: '' });
			} else {
				setStatus('error');
			}
		} catch {
			setStatus('error');
		}
	};

	return (
		<div id="contact" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-20 flex flex-col gap-6 lg:gap-4">
			<div className="flex flex-col gap-4">
				<h3 className="text-primary font-black tracking-[0.2em] uppercase text-[10px] italic">Get In Touch</h3>
				<h2 className="header !text-left max-w-2xl">
					Let's build something <span className="text-gradient">amazing</span> together.
				</h2>
			</div>

			<div className="flex flex-col lg:flex-row gap-16 lg:gap-32 items-start">
				<div className="flex-1 flex flex-col gap-8">
					<p className="text-slate-400 text-sm leading-relaxed max-w-md italic">
						Ready to transform your ideas into reality? Tell us about your project, and our team will get back to
						you with a comprehensive proposal.
					</p>

					<a
						href="mailto:hello@azioweb.com"
						className="flex items-center gap-3 text-lg font-black text-white hover:text-primary transition-colors group"
					>
						<EnvelopeIcon className="h-5 w-5 text-primary group-hover:scale-110 transition-transform" />
						<span>hello@azioweb.com</span>
					</a>
				</div>
				<motion.div
					className="flex-1 w-full lg:w-[500px]"
					animate={{ y: [0, -12, 0] }}
					transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
				>
					<form
						onSubmit={handleSubmit}
						className="bg-[var(--background-opacity)] p-10 rounded-[2.5rem] flex flex-col gap-8"
					>
						<div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
							<Input
								name="First name"
								label="First name *"
								value={form.firstName}
								required
								onChange={handleChange('firstName')}
							/>
							<Input
								name="Last name"
								label="Last name *"
								value={form.lastName}
								required
								onChange={handleChange('lastName')}
							/>
						</div>

						<Input
							name="Email address"
							label="Email address *"
							type="email"
							value={form.email}
							required
							onChange={handleChange('email')}
						/>

						<Textarea
							name="Your message"
							label="Message *"
							value={form.message}
							required
							onChange={handleChange('message')}
						/>

						{status === 'success' && (
							<StatusMessage type="success" message="Message sent! We'll get back to you within 24 hours." />
						)}
						{status === 'error' && (
							<StatusMessage
								type="error"
								message="Something went wrong. Please try again or email us directly."
							/>
						)}

						<button
							type="submit"
							disabled={status === 'sending'}
							className="cursor-pointer bg-secondary text-white font-black text-xs uppercase tracking-widest py-5 rounded-2xl hover:bg-primary/90 transition-all hover:scale-[1.02] active:scale-95 shadow-lg shadow-primary/20 disabled:opacity-60 italic"
						>
							{status === 'sending' ? 'Sending…' : 'Send Message'}
						</button>
					</form>
				</motion.div>
			</div>
		</div>
	);
};

export default Contact;
