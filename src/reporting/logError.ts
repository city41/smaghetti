type LogErrorProps = {
	context: string;
	message: string;
	stack?: string | null;
	level_data?: string | null;
};

async function logError({}: LogErrorProps) {
	// TODO: remove this
}

export { logError };
