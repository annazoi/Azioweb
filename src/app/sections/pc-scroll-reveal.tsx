'use client';

import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const IMG = '/img/pc.jpg';
const WIDTH_START = 80;
const WIDTH_END = 100;

const PcScrollReveal = () => {
	const sectionRef = useRef<HTMLElement>(null);
	const { scrollYProgress } = useScroll({
		target: sectionRef,
		offset: ['start end', 'end start'],
	});

	const scale = useTransform(scrollYProgress, [0, 1], [1, WIDTH_END / WIDTH_START]);

	return (
		<section ref={sectionRef} className="relative w-full overflow-x-clip bg-black">
			<div className="flex justify-center px-3 pt-[0vh] sm:px-4 sm:pt-[5vh]">
				<motion.div
					style={{ scale }}
					className="relative aspect-[16/10] w-[84vw] origin-center will-change-transform"
				>
					<Image src={IMG} alt="Product studio workspace" fill className="object-cover rounded-[18px]" sizes="max(100vw - 80px, 1px)" priority />
				</motion.div>
			</div>
		</section>
	);
};

export default PcScrollReveal;
