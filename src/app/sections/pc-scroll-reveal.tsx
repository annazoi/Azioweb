'use client';

import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const IMG = '/img/pc.jpg';
const WIDTH_START = 84;
const WIDTH_END = 132;

const PcScrollReveal = () => {
	const sectionRef = useRef<HTMLElement>(null);
	const { scrollYProgress } = useScroll({
		target: sectionRef,
		offset: ['start end', 'end start'],
	});

	const scale = useTransform(scrollYProgress, [0, 1], [1, WIDTH_END / WIDTH_START]);

	return (
		<section ref={sectionRef} className="relative w-full overflow-x-clip bg-black">
			<div className="flex justify-center px-3 pt-[10vh] sm:px-4 sm:pt-[12vh]">
				<motion.div
					style={{ scale }}
					className="relative aspect-[16/10] w-[84vw] max-h-[min(72vh,780px)] min-h-[180px] origin-center will-change-transform"
				>
					<Image src={IMG} alt="Product studio workspace" fill className="object-cover" sizes="max(100vw - 80px, 1px)" priority />
				</motion.div>
			</div>
			<div className="h-[35vh] w-full shrink-0" aria-hidden />
		</section>
	);
};

export default PcScrollReveal;
