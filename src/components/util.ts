export function makeSlug(name: string): string {
	return name.replace(/[^a-zA-Z0-9]/g, '-').substring(0, 30);
}
