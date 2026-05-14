'use client';

import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const IMG = '/img/pc.jpg';

const PcScrollReveal = () => {
	const sectionRef = useRef<HTMLElement>(null);
	const { scrollYProgress } = useScroll({
		target: sectionRef,
		offset: ['start end', 'end start'],
	});

	const widthStr = useTransform(scrollYProgress, (p) => {
		const t = Math.min(1, Math.max(0, p));
		return `${(84 + t * 48).toFixed(4)}vw`;
	});

	return (
		<section ref={sectionRef} className="relative w-full bg-black">
			<div className="flex justify-center px-3 pt-[10vh] sm:px-4 sm:pt-[12vh]">
				<motion.div
					style={{ width: widthStr }}
					className="relative aspect-[16/10] max-h-[min(72vh,780px)] min-h-[180px] origin-center will-change-[width]"
				>
					<Image src={IMG} alt="Product studio workspace" fill className="object-cover" sizes="100vw" priority />
				</motion.div>
			</div>
			<div className="min-h-[220vh] w-full shrink-0" aria-hidden />
		</section>
	);
};

export default PcScrollReveal;
