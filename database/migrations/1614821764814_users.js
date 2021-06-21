exports.shorthands = undefined;

const USER_TABLE = 'users';
const USER_AUTH_TO_PUBLIC_FUNCTION = 'user_auth_to_public';
const POLICY_NAME_READ_USERS = 'allow users read their own user row';

exports.up = (pgm) => {
	pgm.createTable(USER_TABLE, {
		id: {
			type: 'uuid',
			primaryKey: true,
			notNull: true,
		},
		username: {
			type: 'string',
		},
	});

	pgm.createFunction(
		USER_AUTH_TO_PUBLIC_FUNCTION,
		[],
		{
			replace: true,
			returns: 'trigger',
			language: 'plpgsql security definer',
		},
		`
begin
  insert into public.${USER_TABLE} (id, username)
  values (new.id, substring(new.email from 1 for position('@smaghetti.com' in new.email) - 1));
  return new;
end;
`
	);

	pgm.createTrigger(
		{ schema: 'auth', name: 'users' },
		`${USER_AUTH_TO_PUBLIC_FUNCTION}_trigger`,
		{
			when: 'after',
			operation: 'insert',
			level: 'row',
			function: USER_AUTH_TO_PUBLIC_FUNCTION,
		}
	);

	pgm.sql('alter table public.users enable row level security');

	pgm.createPolicy(
		{ schema: 'public', name: 'users' },
		POLICY_NAME_READ_USERS,
		{
			command: 'SELECT',
			using: 'auth.uid() = id',
		}
	);
};

exports.down = (pgm) => {
	pgm.dropPolicy({ schema: 'public', name: 'users' }, POLICY_NAME_READ_USERS, {
		ifExists: true,
	});
	pgm.dropTrigger(
		{ schema: 'auth', name: 'users' },
		`${USER_AUTH_TO_PUBLIC_FUNCTION}_trigger`,
		{ ifExists: true, cascade: true }
	);
	pgm.dropFunction(USER_AUTH_TO_PUBLIC_FUNCTION, []);
	pgm.dropTable(USER_TABLE);
};

exports.USER_TABLE = USER_TABLE;
exports.POLICY_NAME_READ_USERS = POLICY_NAME_READ_USERS;
