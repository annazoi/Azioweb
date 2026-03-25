'use client';

import { useRef } from 'react';
import Image from 'next/image';
import university_logo from '@/assets/elmepa.png';
import { animate } from 'animejs';

const Education = () => {
	const backgroundRef = useRef<HTMLDivElement>(null);

	const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
		if (!backgroundRef.current) return;

		const rect = backgroundRef.current.getBoundingClientRect();

		const x = e.clientX - rect.left;
		const y = e.clientY - rect.top;

		const percentX = (x / rect.width) * 100;
		const percentY = (y / rect.height) * 100;

		const moveX = 50 + (percentX - 50) / 10;
		const moveY = 100 + (percentY - 50) / 20;

		animate(backgroundRef.current, {
			backgroundPosition: `${moveX}% ${moveY}%`,
			duration: 200,
			easing: 'easeOutQuad',
		});
	};

	const handleMouseLeave = () => {
		if (!backgroundRef.current) return;

		animate(backgroundRef.current, {
			backgroundPosition: '50% 100%',
			duration: 600,
			easing: 'spring(1, 80, 10, 0)',
		});
	};

	return (
		<div id="education" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-32 education flex flex-col gap-12">
			<div className="flex flex-col items-center gap-4">
				<h3 className="header text-gradient">Education</h3>
				<p className="text-slate-400 text-center max-w-2xl">
					Academic background and continuous learning in the field of engineering and technology.
				</p>
			</div>
			<div
				ref={backgroundRef}
				onMouseMove={handleMouseMove}
				onMouseLeave={handleMouseLeave}
				className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20 glass rounded-[3rem] px-8 py-16 background relative overflow-hidden group/edu"
			>
				<div className="relative z-10 lg:w-1/3 flex justify-center">
					<a href="https://hmu.gr" target="_blank" className="hover:scale-105 transition-transform duration-300">
						<Image src={university_logo} alt="ELMEPA" className="w-48 h-auto shadow-2xl rounded-2xl" />
					</a>
				</div>

				<div className="relative z-10 lg:w-2/3 flex flex-col gap-6 lg:text-left text-center">
					<div className="flex flex-col gap-2">
						<p className="text-primary font-bold tracking-wider uppercase text-xs">Degree</p>
						<p className="text-3xl lg:text-4xl font-extrabold text-white">Master’s Degree</p>
					</div>
					<div className="flex flex-col gap-1">
						<p className="text-xl lg:text-2xl text-slate-300">in Electrical & Computer Engineering</p>
						<p className="text-slate-400 font-medium">Hellenic Mediterranean University</p>
					</div>
				</div>

				<div className="absolute inset-0 bg-primary/5 opacity-0 group-hover/edu:opacity-100 transition-opacity" />
			</div>
		</div>
	);
};

export default Education;
