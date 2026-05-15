import en from '@/locales/en/common.json';

type TranslateOptions = Record<string, string | number | undefined>;

function getNestedValue(path: string): unknown {
	return path.split('.').reduce<unknown>((acc, part) => {
		if (acc && typeof acc === 'object' && part in (acc as Record<string, unknown>)) {
			return (acc as Record<string, unknown>)[part];
		}
		return undefined;
	}, en);
}

function interpolate(template: string, options?: TranslateOptions): string {
	if (!options) return template;
	return template.replace(/\{\{\s*([^}]+)\s*\}\}/g, (_, key: string) => {
		const value = options[key];
		return value === undefined ? '' : String(value);
	});
}

export function useTranslation() {
	return {
		t: (key: string, options?: TranslateOptions) => {
			const value = getNestedValue(key);
			if (typeof value === 'string') return interpolate(value, options);
			return key;
		},
	};
}

