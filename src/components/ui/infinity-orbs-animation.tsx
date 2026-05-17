'use client';

import { motion } from 'framer-motion';
import { useId } from 'react';
import { isDaytimeHours } from '@/lib/time-of-day';
import type { TimeOfDayTheme } from '@/lib/time-of-day';

const ORB_A =
	'M384.18,184.137 C410.8,210.757 425.75,246.847 425.75,284.507 C425.75,322.157 410.8,358.257 384.18,384.877 C357.56,411.497 321.45,426.447 283.8,426.447 C283.8,426.447 -283.59,426.447 -283.59,426.447 C-311.73,426.497 -339.25,418.177 -362.66,402.567 C-386.07,386.927 -404.31,364.727 -415.07,338.717 C-425.84,312.707 -428.64,284.107 -423.13,256.517 C-417.61,228.917 -404.03,203.577 -384.09,183.707 C-384.09,183.707 -59.02,-141.363 -59.02,-141.363 C-59.02,-141.363 -284.02,-141.363 -284.02,-141.363 C-321.66,-141.363 -357.77,-156.313 -384.39,-182.933 C-411.02,-209.553 -425.97,-245.663 -425.97,-283.313 C-425.97,-320.963 -411.02,-357.063 -384.39,-383.683 C-357.77,-410.313 -321.66,-425.263 -284.02,-425.263 C-284.02,-425.263 283.37,-425.263 283.37,-425.263 C311.55,-425.373 339.11,-417.093 362.56,-401.483 C386.02,-385.883 404.3,-363.643 415.07,-337.613 C425.85,-311.593 428.64,-282.943 423.08,-255.323 C417.53,-227.703 403.88,-202.363 383.88,-182.523 C383.88,-182.523 58.8,142.557 58.8,142.557 C58.8,142.557 283.8,142.557 283.8,142.557 C321.45,142.557 357.56,157.517 384.18,184.137z';

const ORB_B =
	'M669.477,466.88 C696.097,493.51 711.047,529.61 711.047,567.26 C711.047,604.91 696.097,641.02 669.477,667.64 C642.847,694.26 606.737,709.22 569.107,709.22 C569.107,709.22 -566.113,709.22 -566.113,709.22 C-594.253,709.25 -621.773,700.94 -645.183,685.31 C-668.593,669.7 -686.833,647.48 -697.593,621.48 C-708.363,595.48 -711.163,566.86 -705.653,539.27 C-700.133,511.67 -686.553,486.34 -666.623,466.47 C-666.623,466.47 226.277,-426.42 226.277,-426.42 C226.277,-426.42 -566.543,-426.42 -566.543,-426.42 C-604.193,-426.42 -640.293,-441.37 -666.913,-468 C-693.543,-494.62 -708.493,-530.72 -708.493,-568.37 C-708.493,-606.02 -693.543,-642.13 -666.913,-668.75 C-640.293,-695.37 -604.193,-710.33 -566.543,-710.33 C-566.543,-710.33 568.677,-710.33 568.677,-710.33 C596.837,-710.43 624.397,-702.16 647.857,-686.55 C671.317,-670.94 689.597,-648.71 700.367,-622.68 C711.137,-596.65 713.927,-568 708.377,-540.38 C702.827,-512.76 689.177,-487.42 669.167,-467.59 C669.167,-467.59 -223.723,425.31 -223.723,425.31 C-223.723,425.31 569.107,425.31 569.107,425.31 C606.737,425.31 642.847,440.26 669.477,466.88z';

const ORB_C =
	'M453.82,254.54 C480.44,281.17 495.4,317.27 495.4,354.92 C495.4,392.57 480.44,428.67 453.82,455.3 C427.2,481.92 391.09,496.87 353.44,496.87 C353.44,496.87 -355.9,496.87 -355.9,496.87 C-384.04,496.91 -411.56,488.59 -434.97,472.97 C-458.38,457.35 -476.62,435.14 -487.38,409.14 C-498.15,383.14 -500.95,354.53 -495.44,326.93 C-489.92,299.33 -476.34,274 -456.4,254.13 C-456.4,254.13 10.63,-212.89 10.63,-212.89 C10.63,-212.89 -356.33,-212.89 -356.33,-212.89 C-393.97,-212.89 -430.08,-227.85 -456.7,-254.47 C-483.32,-281.09 -498.28,-317.2 -498.28,-354.85 C-498.28,-392.5 -483.32,-428.6 -456.7,-455.22 C-430.08,-481.85 -393.97,-496.8 -356.33,-496.8 C-356.33,-496.8 353.02,-496.8 353.02,-496.8 C381.19,-496.91 408.76,-488.63 432.21,-473.02 C455.66,-457.41 473.94,-435.18 484.72,-409.15 C495.49,-383.12 498.28,-354.48 492.73,-326.86 C487.17,-299.24 473.52,-273.9 453.52,-254.06 C453.52,-254.06 -13.51,212.97 -13.51,212.97 C-13.51,212.97 353.44,212.97 353.44,212.97 C391.09,212.97 427.2,227.93 453.82,254.54z';

const SUN_RAYS = [0, 45, 90, 135, 180, 225, 270, 315] as const;

function RotatingSun() {
	return (
		<motion.svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			className="h-full w-full"
			animate={{ rotate: 360 }}
			transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
		>
			<circle cx="12" cy="12" r="4.25" fill="white" />
			<g stroke="white" strokeWidth="1.6" strokeLinecap="round">
				{SUN_RAYS.map((deg) => {
					const rad = (deg * Math.PI) / 180;
					const inner = 7.25;
					const outer = 10.5;
					return (
						<line
							key={deg}
							x1={12 + inner * Math.cos(rad)}
							y1={12 + inner * Math.sin(rad)}
							x2={12 + outer * Math.cos(rad)}
							y2={12 + outer * Math.sin(rad)}
						/>
					);
				})}
			</g>
		</motion.svg>
	);
}

type InfinityOrbsAnimationProps = {
	theme: TimeOfDayTheme;
	hour: number;
	className?: string;
};

export default function InfinityOrbsAnimation({ theme, hour, className = '' }: InfinityOrbsAnimationProps) {
	const clipId = useId().replace(/:/g, '');
	const isDaytime = isDaytimeHours(hour);

	return (
		<span
			className={`inline-flex size-4 shrink-0 items-center justify-center overflow-hidden ${className}`.trim()}
			aria-hidden
		>
			{isDaytime ? (
				<RotatingSun />
			) : (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 1000 1000"
					preserveAspectRatio="xMidYMid meet"
					className="h-full w-full"
				>
					<defs>
						<clipPath id={clipId}>
							<rect width="1000" height="1000" x="0" y="0" />
						</clipPath>
					</defs>
					<g clipPath={`url(#${clipId})`}>
						<motion.g
							animate={{
								transform: [
									'translate(350px, 682px) scale(0.32)',
									'translate(368px, 668px) scale(0.42)',
									'translate(350px, 682px) scale(0.32)',
								],
								opacity: [0.55, 0.95, 0.55],
							}}
							transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
						>
							<g transform="translate(428.89 425.62)">
								<motion.path
									animate={{ fill: theme.fill }}
									transition={{ duration: 1.2, ease: 'easeInOut' }}
									fillOpacity={1}
									d={ORB_A}
									transform="translate(-428.89 -425.62)"
								/>
							</g>
						</motion.g>
						<motion.g
							animate={{
								transform: [
									'translate(744px, 252px) scale(0)',
									'translate(720px, 272px) scale(0.36)',
									'translate(744px, 252px) scale(0)',
								],
								opacity: [0, 0.85, 0],
							}}
							transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }}
						>
							<g transform="translate(711.41 710.68)">
								<motion.path
									animate={{ fill: theme.fill }}
									transition={{ duration: 1.2, ease: 'easeInOut' }}
									fillOpacity={1}
									d={ORB_B}
									transform="translate(-711.41 -710.68)"
								/>
							</g>
						</motion.g>
						<motion.g
							animate={{
								transform: [
									'translate(119px, 424px) scale(0.1)',
									'translate(145px, 408px) scale(0.28)',
									'translate(119px, 424px) scale(0.1)',
								],
								opacity: [0.45, 0.9, 0.45],
							}}
							transition={{ duration: 7.5, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
						>
							<g transform="translate(501.2 497.16)">
								<motion.path
									animate={{ fill: theme.fill }}
									transition={{ duration: 1.2, ease: 'easeInOut' }}
									fillOpacity={1}
									d={ORB_C}
									transform="translate(-501.2 -497.16)"
								/>
							</g>
						</motion.g>
					</g>
				</svg>
			)}
		</span>
	);
}
