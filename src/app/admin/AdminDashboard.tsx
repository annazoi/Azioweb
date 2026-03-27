'use client';

import { useState } from 'react';
import {
	TrashIcon,
	CheckCircleIcon,
	NoSymbolIcon,
	EnvelopeIcon,
	PhoneIcon,
	CalendarIcon,
	ClockIcon,
} from '@heroicons/react/24/outline';
import { updateAppointmentStatus, deleteAppointment } from '@/app/actions/booking';

export default function AdminDashboard({ appointments }: { appointments: any[] }) {
	const [filter, setFilter] = useState<'all' | 'pending' | 'confirmed' | 'cancelled'>('all');

	const filtered = filter === 'all' ? appointments : appointments.filter((a) => a.status === filter);

	const handleStatus = async (id: string, status: any) => {
		if (confirm(`Confirm status change to ${status}?`)) {
			await updateAppointmentStatus(id, status);
		}
	};

	const handleDelete = async (id: string) => {
		if (confirm('Permanently delete this appointment?')) {
			await deleteAppointment(id);
		}
	};

	const formatDate = (date: Date | string) => {
		return new Intl.DateTimeFormat('en-US', {
			month: 'long',
			day: 'numeric',
			year: 'numeric',
		}).format(new Date(date));
	};

	return (
		<div className="flex flex-col gap-10">
			<div className="flex flex-col sm:flex-row items-center justify-between gap-6">
				<div>
					<h1 className="text-4xl font-extrabold text-white mb-2">Appointments Dashboard</h1>
					<p className="text-slate-400">Manage your discovery calls and lead pipeline.</p>
				</div>
				<div className="flex gap-2 p-1.5 glass rounded-2xl border-white/5">
					{['all', 'pending', 'confirmed', 'cancelled'].map((f) => (
						<button
							key={f}
							onClick={() => setFilter(f as any)}
							className={`px-4 py-2 rounded-xl text-sm font-bold uppercase tracking-widest transition-all ${
								filter === f
									? 'bg-primary text-white shadow-lg shadow-primary/20'
									: 'text-slate-400 hover:text-white hover:bg-white/5'
							}`}
						>
							{f}
						</button>
					))}
				</div>
			</div>

			<div className="grid grid-cols-1 gap-6">
				{filtered.map((app) => (
					<div
						key={app.id}
						className="glass p-8 rounded-[2.5rem] border-white/10 group hover:border-primary/30 transition-all flex flex-col lg:flex-row gap-10 lg:items-center"
					>
						<div className="flex-grow flex flex-col gap-6">
							<div className="flex items-center gap-6">
								<div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center border border-white/10 text-white font-bold text-xl">
									{app.name.charAt(0)}
								</div>
								<div>
									<h3 className="text-2xl font-bold text-white mb-1">{app.name}</h3>
									<div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
										<a
											href={`mailto:${app.email}`}
											className="text-primary hover:underline flex items-center gap-2"
										>
											<EnvelopeIcon className="size-4" /> {app.email}
										</a>
										{app.phone && (
											<span className="text-slate-400 flex items-center gap-2">
												<PhoneIcon className="size-4" /> {app.phone}
											</span>
										)}
									</div>
								</div>
							</div>

							<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
								<div className="bg-white/5 p-4 rounded-2xl border border-white/5 flex items-center gap-4">
									<div className="p-3 rounded-xl bg-primary/10 text-primary">
										<CalendarIcon className="size-6" />
									</div>
									<div>
										<span className="text-xs text-slate-400 uppercase font-bold tracking-widest block">
											Date
										</span>
										<span className="text-white font-bold">{formatDate(app.date)}</span>
									</div>
								</div>
								<div className="bg-white/5 p-4 rounded-2xl border border-white/5 flex items-center gap-4">
									<div className="p-3 rounded-xl bg-accent/10 text-accent">
										<ClockIcon className="size-6" />
									</div>
									<div>
										<span className="text-xs text-slate-400 uppercase font-bold tracking-widest block">
											Time
										</span>
										<span className="text-white font-bold">{app.time} (1 hr)</span>
									</div>
								</div>
							</div>

							{app.notes && (
								<div className="p-4 rounded-2xl bg-white/5 border border-white/5 italic text-slate-300 text-sm leading-relaxed">
									"{app.notes}"
								</div>
							)}
						</div>

						<div className="lg:w-64 flex flex-col gap-4">
							<div className="flex flex-col gap-2">
								<span className="text-xs text-slate-400 uppercase font-bold tracking-widest px-2">Status</span>
								<div
									className={`text-center py-2 rounded-xl font-bold border ${
										app.status === 'confirmed'
											? 'bg-green-500/20 text-green-500 border-green-500/30'
											: app.status === 'cancelled'
												? 'bg-red-500/20 text-red-500 border-red-500/30'
												: 'bg-yellow-500/20 text-yellow-500 border-yellow-500/30'
									}`}
								>
									{app.status.toUpperCase()}
								</div>
							</div>

							<div className="grid grid-cols-3 gap-2">
								<button
									onClick={() => handleStatus(app.id, 'confirmed')}
									title="Confirm"
									className="p-3 rounded-xl bg-white/5 border border-white/10 text-green-500 hover:bg-green-500 hover:text-white transition-all"
								>
									<CheckCircleIcon className="size-6 mx-auto" />
								</button>
								<button
									onClick={() => handleStatus(app.id, 'cancelled')}
									title="Cancel"
									className="p-3 rounded-xl bg-white/5 border border-white/10 text-red-400 hover:bg-red-400 hover:text-white transition-all"
								>
									<NoSymbolIcon className="size-6 mx-auto" />
								</button>
								<button
									onClick={() => handleDelete(app.id)}
									title="Delete"
									className="p-3 rounded-xl bg-white/5 border border-white/10 text-slate-400 hover:bg-white/10 hover:text-white transition-all"
								>
									<TrashIcon className="size-6 mx-auto" />
								</button>
							</div>
						</div>
					</div>
				))}

				{filtered.length === 0 && (
					<div className="text-center py-20 glass rounded-[3rem] border-white/5">
						<p className="text-slate-400 italic">No appointments found.</p>
					</div>
				)}
			</div>
		</div>
	);
}
