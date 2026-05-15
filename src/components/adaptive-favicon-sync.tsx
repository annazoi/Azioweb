'use client';

import { useEffect } from 'react';

function nudgeAdaptiveIconLinks() {
	const links = document.querySelectorAll<HTMLLinkElement>(
		'link[rel="icon"][media*="prefers-color-scheme"]'
	);
	for (const link of links) {
		const resolved = link.href;
		if (resolved) link.href = resolved;
	}
}

export default function AdaptiveFaviconSync() {
	useEffect(() => {
		const mq = window.matchMedia('(prefers-color-scheme: dark)');
		const onSchemeChange = () => nudgeAdaptiveIconLinks();
		nudgeAdaptiveIconLinks();
		mq.addEventListener('change', onSchemeChange);
		return () => mq.removeEventListener('change', onSchemeChange);
	}, []);
	return null;
}
