type CSSProperties = { [key: string]: string | number };

export function parseStyles(styleObj: CSSProperties) {
	return Object.entries(styleObj)
		.filter(([, value]) => value !== undefined) // Filtra propiedades sin valor
		.map(([key, value]) => {
			const cssProperty = key.replace(/([A-Z])/g, '-$1').toLowerCase();
			const cssValue = typeof value === 'number' ? `${value}px` : value;
			return `${cssProperty}: ${cssValue};`;
		})
		.join(' ');
}
