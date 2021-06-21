/* eslint-disable camelcase */

exports.shorthands = undefined;

const POLICY_NAME_ADMIN_UPDATE_LEVELS = 'allow admin update of levels';

exports.up = (pgm) => {
	pgm.createPolicy(
		{ schema: 'public', name: 'levels' },
		POLICY_NAME_ADMIN_UPDATE_LEVELS,
		{
			command: 'UPDATE',
			using: "(select role from public.users where id = auth.uid()) = 'admin'",
		}
	);
};

exports.down = (pgm) => {
	pgm.dropPolicy(
		{ schema: 'public', name: 'levels' },
		POLICY_NAME_ADMIN_UPDATE_LEVELS,
		{
			ifExists: true,
		}
	);
};
