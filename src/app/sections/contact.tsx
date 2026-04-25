'use client';
import Textarea from '@/components/ui/textarea';
import Input from '@/components/ui/input';
import { motion } from 'framer-motion';
import StatusMessage from '@/components/ui/StatusMessage';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

type Status = 'idle' | 'sending' | 'success' | 'error';

const Contact = () => {
	const { t } = useTranslation();
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
		<div id="contact" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 md:mt-20 mt-10 flex flex-col gap-6 lg:gap-4">
			<div className="flex flex-col gap-4">
				<h3 className="text-primary font-black tracking-[0.2em] uppercase text-[10px] italic">{t('contact.tag')}</h3>
				<h2 className="header !text-left max-w-2xl">
					{t('contact.titlePrefix')} <span className="text-gradient">{t('contact.titleAccent')}</span> {t('contact.titleSuffix')}
				</h2>
			</div>

			<div className="flex flex-col lg:flex-row gap-10 lg:gap-32 items-start">
				<div className="flex-1 flex flex-col gap-8">
					<p className="text-slate-400 text-sm leading-relaxed max-w-md italic">
						{t('contact.description')}
					</p>

					{/* <a
						href="mailto:hello@azioweb.com"
						className="flex items-center gap-2 md:gap-3 md:text-lg text-sm font-black text-white hover:text-primary transition-colors group"
					>
						<EnvelopeIcon className="h-5 w-5 text-primary group-hover:scale-110 transition-transform" />
						<span>hello@azioweb.com</span>
					</a> */}
				</div>
				<motion.div
					className="flex-1 w-full lg:w-[500px]"
					animate={{ y: [0, -12, 0] }}
					transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
				>
					<form
						onSubmit={handleSubmit}
						className="bg-[var(--background-opacity)] px-4 py-6 md:px-10 md:py-10 md:rounded-[2rem] rounded-2xl flex flex-col gap-8"
					>
						<div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
							<Input
								name={t('contact.form.firstName')}
								label={t('contact.form.firstNameLabel')}
								value={form.firstName}
								required
								onChange={handleChange('firstName')}
							/>
							<Input
								name={t('contact.form.lastName')}
								label={t('contact.form.lastNameLabel')}
								value={form.lastName}
								required
								onChange={handleChange('lastName')}
							/>
						</div>

						<Input
							name={t('contact.form.email')}
							label={t('contact.form.emailLabel')}
							type="email"
							value={form.email}
							required
							onChange={handleChange('email')}
						/>

						<Textarea
							name={t('contact.form.message')}
							label={t('contact.form.messageLabel')}
							value={form.message}
							required
							onChange={handleChange('message')}
						/>

						{status === 'success' && (
							<StatusMessage type="success" message={t('contact.form.success')} />
						)}
						{status === 'error' && (
							<StatusMessage
								type="error"
								message={t('contact.form.error')}
							/>
						)}

						<button
							type="submit"
							disabled={status === 'sending'}
							className="cursor-pointer bg-secondary text-white font-black text-xs uppercase tracking-widest py-5 rounded-2xl hover:bg-primary/90 transition-all hover:scale-[1.02] active:scale-95 shadow-lg shadow-primary/20 disabled:opacity-60 italic"
						>
							{status === 'sending' ? t('contact.form.sending') : t('contact.form.submit')}
						</button>
					</form>
				</motion.div>
			</div>
		</div>
	);
};

export default Contact;
