export function load({ params }) {
	return { pageNumber: parseInt(params.pageNumber) };
}
