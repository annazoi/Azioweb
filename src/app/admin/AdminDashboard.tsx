'use client';

import { useState } from 'react';
import {
	TrashIcon,
	CheckIcon,
	XMarkIcon,
	CalendarIcon,
	ClockIcon,
	Squares2X2Icon,
	CalendarDaysIcon,
	UsersIcon,
	Cog8ToothIcon,
	MagnifyingGlassIcon,
	ChartBarSquareIcon,
	ArrowPathIcon
} from '@heroicons/react/24/outline';
import { updateAppointmentStatus, deleteAppointment } from '@/app/actions/booking';
import Image from 'next/image';

export default function AdminDashboard({ appointments }: { appointments: any[] }) {
	const [filter, setFilter] = useState<'all' | 'pending' | 'confirmed' | 'cancelled'>('all');
	const [search, setSearch] = useState('');

	const filtered = appointments.filter((a) => {
		const matchesFilter = filter === 'all' ? true : a.status === filter;
		const matchesSearch =
			a.name.toLowerCase().includes(search.toLowerCase()) ||
			a.email.toLowerCase().includes(search.toLowerCase());
		return matchesFilter && matchesSearch;
	});

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
			month: 'short',
			day: 'numeric',
			year: 'numeric',
		}).format(new Date(date));
	};

	// Dummy counts for visual matching if not relying entirely on data, but let's use actual data
	const counts = {
		all: appointments.length,
		pending: appointments.filter(a => a.status === 'pending').length,
		confirmed: appointments.filter(a => a.status === 'confirmed').length,
		cancelled: appointments.filter(a => a.status === 'cancelled').length,
	};

	return (
		<div className="flex flex-col min-h-screen bg-[#111111] text-slate-200 font-sans selection:bg-[#6b58ff]/30">
			{/* Top Navbar */}
			<header className="h-[72px] border-b border-white/5 bg-[#141416] flex items-center px-6 justify-between shrink-0 z-10 w-full relative">
				<div className="flex items-center gap-3 w-64">
					<div className="w-8 h-8 rounded bg-[#6b58ff]/20 flex items-center justify-center text-[#6b58ff] border border-[#6b58ff]/30">
						<Squares2X2Icon className="w-4 h-4" />
					</div>
					<span className="font-bold text-lg text-white tracking-wide">Discovery Dashboard</span>
				</div>

				<div className="flex items-center justify-between flex-1 pl-10">
					<nav className="flex gap-8 text-[13px] font-bold tracking-wide">
						<a href="#" className="text-white border-b-2 border-[#6b58ff] py-6 -mb-[26px]">Overview</a>
						<a href="#" className="text-slate-400 hover:text-white transition py-6">Bookings</a>
						<a href="#" className="text-slate-400 hover:text-white transition py-6">Clients</a>
					</nav>
					
					<div className="flex items-center gap-4 border-l border-white/10 pl-8 h-8">
						<div className="flex flex-col text-right">
							<span className="text-[13px] font-bold text-white leading-tight">Admin Profile</span>
							<span className="text-[9px] text-slate-500 tracking-widest font-bold uppercase">LEAD ARCHITECT</span>
						</div>
						<div className="w-10 h-10 rounded-full bg-[#1a1a20] border border-white/10 overflow-hidden flex items-center justify-center text-slate-400">
							<UsersIcon className="w-5 h-5"/>
						</div>
					</div>
				</div>
			</header>

			<div className="flex flex-1 overflow-hidden h-[calc(100vh-72px)]">
				{/* Sidebar */}
				<aside className="w-64 border-r border-white/5 bg-[#111112] shrink-0 p-5 hidden lg:block overflow-y-auto">
					<div className="text-[10px] font-bold text-slate-500 tracking-widest mb-4 px-2 uppercase mt-2">Menu</div>
					<nav className="flex flex-col gap-1.5">
						<button className="flex items-center gap-3 px-3 py-3 rounded-xl bg-[#6b58ff]/10 text-white border border-[#6b58ff]/20 transition-all w-full">
							<Squares2X2Icon className="w-5 h-5 text-[#6b58ff]" />
							<span className="text-[13px] font-bold tracking-wide uppercase">OVERVIEW</span>
							<div className="ml-auto w-1 h-5 bg-[#6b58ff] rounded-full absolute left-0" />
						</button>
						<button className="flex items-center gap-3 px-3 py-3 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition w-full">
							<CalendarDaysIcon className="w-5 h-5" />
							<span className="text-[13px] font-bold tracking-wide uppercase">BOOKINGS</span>
						</button>
						<button className="flex items-center gap-3 px-3 py-3 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition w-full">
							<UsersIcon className="w-5 h-5" />
							<span className="text-[13px] font-bold tracking-wide uppercase">CLIENTS</span>
						</button>
						<button className="flex items-center gap-3 px-3 py-3 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition w-full">
							<Cog8ToothIcon className="w-5 h-5" />
							<span className="text-[13px] font-bold tracking-wide uppercase">SETTINGS</span>
						</button>
					</nav>
				</aside>

				{/* Main Content */}
				<main className="flex-1 overflow-y-auto flex flex-col relative w-full bg-[#151518]">
					<div className="p-8 lg:p-12 mb-auto max-w-[1400px] mx-auto w-full">
						{/* Header Section */}
						<div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
							<div className="max-w-xl">
								<h1 className="text-[32px] font-extrabold text-white tracking-tight mb-2">Appointments Dashboard</h1>
								<p className="text-slate-400 text-sm leading-relaxed pr-10">
									Manage your discovery pipeline and oversee upcoming strategy sessions for prospective architectural partners.
								</p>
							</div>
							<button className="bg-gradient-to-r from-[#7061ff] to-[#8072ff] hover:opacity-90 transition-opacity text-white px-6 py-3 rounded-xl font-bold tracking-wide flex items-center gap-2 text-sm shadow-xl shadow-[#6b58ff]/20 shrink-0">
								<span className="text-lg leading-none">+</span> New Discovery Call
							</button>
						</div>

						{/* Filters & Search */}
						<div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
							<div className="flex flex-wrap gap-2">
								<button 
									onClick={() => setFilter('all')}
									className={`px-6 py-2.5 rounded-full text-xs font-bold tracking-widest uppercase transition-all ${filter === 'all' ? 'bg-[#6b58ff] text-white shadow-lg shadow-[#6b58ff]/20' : 'text-slate-400 hover:text-white bg-[#1e1e24]'}`}>
									ALL ({counts.all})
								</button>
								<button 
									onClick={() => setFilter('pending')}
									className={`px-6 py-2.5 rounded-full text-xs font-bold tracking-widest uppercase transition-all ${filter === 'pending' ? 'bg-[#6b58ff] text-white shadow-lg shadow-[#6b58ff]/20' : 'text-slate-400 hover:text-white bg-[#1e1e24]'}`}>
									PENDING ({counts.pending})
								</button>
								<button 
									onClick={() => setFilter('confirmed')}
									className={`px-6 py-2.5 rounded-full text-xs font-bold tracking-widest uppercase transition-all ${filter === 'confirmed' ? 'bg-[#6b58ff] text-white shadow-lg shadow-[#6b58ff]/20' : 'text-slate-400 hover:text-white bg-[#1e1e24]'}`}>
									CONFIRMED ({counts.confirmed})
								</button>
								<button 
									onClick={() => setFilter('cancelled')}
									className={`px-6 py-2.5 rounded-full text-xs font-bold tracking-widest uppercase transition-all ${filter === 'cancelled' ? 'bg-[#6b58ff] text-white shadow-lg shadow-[#6b58ff]/20' : 'text-slate-400 hover:text-white bg-[#1e1e24]'}`}>
									CANCELLED ({counts.cancelled})
								</button>
							</div>
							
							<div className="relative w-full md:w-64">
								<MagnifyingGlassIcon className="w-4 h-4 text-slate-500 absolute left-4 top-1/2 -translate-y-1/2" />
								<input 
									type="text" 
									placeholder="Filter by client name..." 
									className="w-full bg-[#1a1a1f] border border-white/5 rounded-full pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-white/20 transition-all font-medium placeholder:text-slate-500"
									value={search}
									onChange={(e) => setSearch(e.target.value)}
								/>
							</div>
						</div>

						{/* Table Header */}
						<div className="px-6 py-3 mb-3 grid grid-cols-12 gap-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest border-b border-white/5 pb-4">
							<div className="col-span-4 pl-4 md:pl-0">CLIENT</div>
							<div className="col-span-3">DATE & TIME</div>
							<div className="col-span-2 text-center">STATUS</div>
							<div className="col-span-3 text-right pe-4">ACTIONS</div>
						</div>

						{/* Appointments List */}
						<div className="flex flex-col gap-3 pb-10">
							{filtered.map(app => {
								const getInitials = (name: string) => name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
								
								return (
									<div key={app.id} className="grid grid-cols-12 gap-4 items-center px-6 py-4 bg-[#1e1e24] rounded-2xl border border-white/5 hover:border-white/10 transition-all group">
										{/* Client */}
										<div className="col-span-4 flex items-center gap-4">
											<div className="relative shrink-0">
												<div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#2a2a35] to-[#202028] border border-white/5 flex flex-col items-center justify-center text-white font-bold leading-none text-sm group-hover:border-white/20 transition-all">
													{getInitials(app.name)}
												</div>
												<div className={`absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full border-[2.5px] border-[#1e1e24] ${
													app.status === 'confirmed' ? 'bg-green-500' : 
													app.status === 'pending' ? 'bg-yellow-500' : 
													app.status === 'cancelled' ? 'bg-red-500' : 
													'bg-blue-500'
												}`} />
											</div>
											<div className="min-w-0">
												<h3 className="font-bold text-white text-[15px] truncate">{app.name}</h3>
												<p className="text-slate-400 text-[13px] mt-0.5 truncate">{app.email}</p>
											</div>
										</div>

										{/* Date & Time */}
										<div className="col-span-3 flex flex-col gap-1.5">
											<div className="flex items-center gap-2.5 text-[13px] text-slate-300">
												<CalendarIcon className="w-4 h-4 text-slate-400" />
												<span className="font-medium">{formatDate(app.date)}</span>
											</div>
											<div className="flex items-center gap-2.5 text-[13px] text-slate-300">
												<ClockIcon className="w-4 h-4 text-slate-400" />
												<span className="font-medium">{app.time} (1 hr)</span>
											</div>
										</div>

										{/* Status */}
										<div className="col-span-2 flex justify-center">
											<span className={`px-3 py-1.5 rounded-full text-[10px] font-bold tracking-widest border uppercase ${
												app.status === 'confirmed' ? 'border-green-500/20 text-green-400 bg-green-500/10' :
												app.status === 'pending' ? 'border-yellow-500/20 text-yellow-400 bg-yellow-500/10' :
												app.status === 'cancelled' ? 'border-red-500/20 text-red-400 bg-red-500/10' :
												'border-blue-400/20 text-blue-300 bg-blue-400/10'
											}`}>
												{app.status === 'pending' ? 'PENDING' : 
												 app.status === 'confirmed' ? 'CONFIRMED' : 
												 app.status === 'cancelled' ? 'CANCELLED' : 
												 'NEW REQUEST'}
											</span>
										</div>

										{/* Actions */}
										<div className="col-span-3 flex items-center justify-end gap-2">
											{app.status === 'pending' && (
												<button 
													onClick={() => handleStatus(app.id, 'confirmed')}
													className="w-9 h-9 rounded-xl bg-[#6b58ff] hover:bg-[#8072ff] text-white flex items-center justify-center transition shadow-lg shadow-[#6b58ff]/20">
													<CheckIcon className="w-5 h-5" />
												</button>
											)}
											{app.status === 'confirmed' && (
												<button 
													className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 text-white flex items-center justify-center transition border border-white/5">
													<CalendarIcon className="w-4 h-4" />
												</button>
											)}
											{app.status === 'cancelled' && (
												<button 
													className="h-9 px-4 rounded-xl bg-white/5 hover:bg-white/10 text-white text-[11px] font-bold tracking-wider flex items-center justify-center transition gap-2 border border-white/5">
													<ArrowPathIcon className="w-4 h-4 text-slate-400" /> RE-BOOK
												</button>
											)}
											
											{app.status !== 'cancelled' && (
												<button 
													onClick={() => handleStatus(app.id, 'cancelled')}
													className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition flex items-center justify-center border border-white/5">
													<XMarkIcon className="w-4 h-4" />
												</button>
											)}
											<button 
												onClick={() => handleDelete(app.id)}
												className="w-9 h-9 rounded-xl bg-white/5 hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/20 text-slate-400 transition flex items-center justify-center border border-white/5">
												<TrashIcon className="w-4 h-4" />
											</button>
										</div>
									</div>
								);
							})}

							{filtered.length === 0 && (
								<div className="text-center py-24 bg-[#1e1e24]/50 rounded-[2rem] border border-white/5 mt-4">
									<div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-500">
										<CalendarDaysIcon className="w-8 h-8" />
									</div>
									<h3 className="text-lg font-bold text-white mb-2">No appointments found</h3>
									<p className="text-slate-400 text-sm">Adjust your filters or search term to discover calls.</p>
								</div>
							)}
						</div>
					</div>

					{/* Footer */}
					<footer className="mt-auto px-8 py-6 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-semibold text-slate-500 bg-[#161619]">
						<div className="font-medium tracking-wide text-slate-500">
							© 2024 Digital Architect Agency. Internal Use Only.
						</div>
						<div className="flex flex-wrap items-center justify-center md:justify-end gap-x-8 gap-y-2 uppercase tracking-widest">
							<a href="#" className="hover:text-white transition">Support</a>
							<a href="#" className="hover:text-white transition">Privacy Policy</a>
							<div className="flex items-center gap-2 pl-4 border-l border-white/10">
								<div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
								<span className="text-slate-400">SYSTEM STATUS: OPERATIONAL</span>
							</div>
						</div>
					</footer>
				</main>
			</div>
		</div>
	);
}
