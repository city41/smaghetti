const { USER_TABLE } = require('./1614821764814_users');
const { LEVEL_TABLE } = require('./1614821962755_levels');
/* eslint-disable camelcase */

exports.shorthands = undefined;

const LEVEL_VOTES_TABLE = 'level_votes';

const POLICY_NAME_CREATE_VOTES = 'Users can create their own votes';
const POLICY_NAME_READ_VOTES = 'Everyone can read all votes';
const POLICY_NAME_DELETE_VOTES = 'Users can delete their own votes';
const POLICY_NAME_UPDATE_VOTES = 'No one can update votes';

exports.up = (pgm) => {
	pgm.createTable(LEVEL_VOTES_TABLE, {
		user_id: {
			type: 'uuid',
			references: `public.${USER_TABLE}(id)`,
			onDelete: 'set null',
			notNull: true,
			primaryKey: true,
		},
		level_id: {
			type: 'string',
			references: `public.${LEVEL_TABLE}(id)`,
			onDelete: 'set null',
			notNull: true,
			primaryKey: true,
		},
	});

	pgm.sql(`alter table public.${LEVEL_VOTES_TABLE} enable row level security`);

	pgm.createPolicy(
		{ schema: 'public', name: LEVEL_VOTES_TABLE },
		POLICY_NAME_CREATE_VOTES,
		{
			command: 'INSERT',
			check: 'auth.uid() = user_id',
		}
	);

	pgm.createPolicy(
		{ schema: 'public', name: LEVEL_VOTES_TABLE },
		POLICY_NAME_READ_VOTES,
		{
			command: 'SELECT',
			using: 'true',
		}
	);

	pgm.createPolicy(
		{ schema: 'public', name: LEVEL_VOTES_TABLE },
		POLICY_NAME_DELETE_VOTES,
		{
			command: 'DELETE',
			using: 'auth.uid() = user_id',
		}
	);

	pgm.createPolicy(
		{ schema: 'public', name: LEVEL_VOTES_TABLE },
		POLICY_NAME_UPDATE_VOTES,
		{
			command: 'UPDATE',
			using: 'false',
		}
	);
};

exports.down = (pgm) => {
	pgm.dropPolicy(
		{ schema: 'public', name: LEVEL_VOTES_TABLE },
		POLICY_NAME_UPDATE_VOTES,
		{
			ifExists: true,
		}
	);
	pgm.dropPolicy(
		{ schema: 'public', name: LEVEL_VOTES_TABLE },
		POLICY_NAME_DELETE_VOTES,
		{
			ifExists: true,
		}
	);
	pgm.dropPolicy(
		{ schema: 'public', name: LEVEL_VOTES_TABLE },
		POLICY_NAME_READ_VOTES,
		{
			ifExists: true,
		}
	);
	pgm.dropPolicy(
		{ schema: 'public', name: LEVEL_VOTES_TABLE },
		POLICY_NAME_CREATE_VOTES,
		{
			ifExists: true,
		}
	);

	pgm.dropTable(LEVEL_VOTES_TABLE);
};
