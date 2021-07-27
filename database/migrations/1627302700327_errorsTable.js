const { USER_TABLE } = require('./1614821764814_users');

exports.shorthands = undefined;

const ERROR_TABLE = 'errors';
const POLICY_NAME_CREATE_ERRORS = 'allow anyone to create errors';
const POLICY_NAME_READ_ERRORS = 'allow admin read errors';
const POLICY_NAME_DELETE_ERRORS = 'allow admin delete errors';
const POLICY_NAME_UPDATE_ERRORS = 'allow admin update errors';

exports.up = (pgm) => {
	pgm.createTable(ERROR_TABLE, {
		user_id: {
			type: 'uuid',
			references: `public.${USER_TABLE}(id)`,
			onDelete: 'set null',
		},
		created_at: {
			type: 'timestamp',
			notNull: true,
			default: pgm.func('current_timestamp'),
		},
		context: 'string',
		message: 'string',
		level_data: 'string',
		stack: 'string',
		url: 'string',
	});

	pgm.sql('alter table public.errors enable row level security');

	pgm.createPolicy(
		{ schema: 'public', name: ERROR_TABLE },
		POLICY_NAME_CREATE_ERRORS,
		{
			command: 'INSERT',
			check: 'true',
		}
	);

	pgm.createPolicy(
		{ schema: 'public', name: ERROR_TABLE },
		POLICY_NAME_READ_ERRORS,
		{
			command: 'SELECT',
			using: "(select role from public.users where id = auth.uid()) = 'admin'",
		}
	);

	pgm.createPolicy(
		{ schema: 'public', name: ERROR_TABLE },
		POLICY_NAME_DELETE_ERRORS,
		{
			command: 'DELETE',
			using: "(select role from public.users where id = auth.uid()) = 'admin'",
		}
	);

	pgm.createPolicy(
		{ schema: 'public', name: ERROR_TABLE },
		POLICY_NAME_UPDATE_ERRORS,
		{
			command: 'UPDATE',
			using: "(select role from public.users where id = auth.uid()) = 'admin'",
		}
	);
};

exports.down = (pgm) => {
	pgm.dropTable(ERROR_TABLE);
};
