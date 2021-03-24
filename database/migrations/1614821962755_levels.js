const { USER_TABLE } = require('./1614821764814_users');
const LEVEL_TABLE = 'levels';
const LEVEL_PLAY_SESSIONS_TABLE = 'level_play_sessions';

const UNIQUE_LEVEL_ID_FUNCTION_NAME = 'unique_level_id';
const SAVE_LEVEL_FUNCTION_NAME = 'save_level';
const SAVE_LEVEL_FUNCTION_PARAMS = [
	'existing_id text',
	'name text',
	'description text',
	'data json',
];
const POLICY_NAME_INSERT_LEVELS = 'allow users insert their own levels';
const POLICY_NAME_UPDATE_LEVELS = 'allow users update their own levels';

exports.up = (pgm) => {
	pgm.createTable(LEVEL_TABLE, {
		id: {
			type: 'string',
			primaryKey: true,
			notNull: true,
		},
		user_id: {
			type: 'uuid',
			references: `public.${USER_TABLE}(id)`,
			onDelete: 'set null',
			notNull: true,
		},
		name: {
			type: 'string',
			notNull: true,
		},
		description: 'string',
		published: {
			type: 'boolean',
			notNull: true,
			default: false,
		},
		data: {
			type: 'json',
			notNull: true,
		},
		parent_id: 'string',
		version: {
			type: 'integer',
			default: 1,
			notNull: true,
		},
		created_at: {
			type: 'timestamp',
			notNull: true,
			default: pgm.func('current_timestamp'),
		},
		updated_at: {
			type: 'timestamp',
			notNull: true,
			default: pgm.func('current_timestamp'),
		},
	});

	pgm.createTable(LEVEL_PLAY_SESSIONS_TABLE, {
		id: 'id',
		level_id: {
			type: 'string',
			notNull: true,
			references: `public.${LEVEL_TABLE}(id)`,
			onDelete: 'cascade',
		},
		user_id: {
			type: 'uuid',
			references: `public.${USER_TABLE}(id)`,
			onDelete: 'set null',
		},
		duration: {
			type: 'integer',
			notNull: true,
		},
		cleared: {
			type: 'boolean',
			notNull: true,
		},
		deaths: {
			type: 'integer',
			notNull: true,
		},
		created_at: {
			type: 'timestamp',
			notNull: true,
			default: pgm.func('current_timestamp'),
		},
	});

	pgm.createFunction(
		UNIQUE_LEVEL_ID_FUNCTION_NAME,
		[],
		{
			replace: true,
			returns: 'text',
			language: 'plpgsql security definer',
		},
		`
DECLARE
  key TEXT;
  qry TEXT;
  found TEXT;
BEGIN

  -- generate the first part of a query as a string with safely
  -- escaped table name, using || to concat the parts
  qry := 'SELECT id FROM levels WHERE id=';

  -- This loop will probably only run once per call until we've generated
  -- millions of ids.
  LOOP

    -- Generate our string bytes and re-encode as a base64 string.
    key := encode(extensions.gen_random_bytes(6), 'base64');

    -- Base64 encoding contains 2 URL unsafe characters by default.
    -- The URL-safe version has these replacements.
    key := replace(key, '/', '_'); -- url safe replacement
    key := replace(key, '+', '-'); -- url safe replacement

    -- Concat the generated key (safely quoted) with the generated query
    -- and run it.
    -- SELECT id FROM "test" WHERE id='blahblah' INTO found
    -- Now "found" will be the duplicated id or NULL.
    EXECUTE qry || quote_literal(key) INTO found;

    -- Check to see if found is NULL.
    -- If we checked to see if found = NULL it would always be FALSE
    -- because (NULL = NULL) is always FALSE.
    IF found IS NULL THEN

      -- If we didn't find a collision then leave the LOOP.
      EXIT;
    END IF;

    -- We haven't EXITed yet, so return to the top of the LOOP
    -- and try again.
  END LOOP;

  return key;
END;
    `
	);

	pgm.createFunction(
		SAVE_LEVEL_FUNCTION_NAME,
		SAVE_LEVEL_FUNCTION_PARAMS,
		{
			replace: true,
			returns: 'text',
			language: 'plpgsql security definer',
		},
		`
  declare
    created_level_id text;
  begin
  
    if existing_id is null then
      existing_id := unique_level_id();
    end if;
  
    insert into levels
      (id, user_id, name, description, data)
    values
      (existing_id, auth.uid(), name, description, data)
    on conflict (id) do update set
      (name, description, data) = (excluded.name, excluded.description, excluded.data)
    returning id into created_level_id;
    
    update levels set parent_id = created_level_id where id = created_level_id;
    
    return created_level_id;
  end;`
	);

	pgm.sql('alter table public.levels enable row level security');

	pgm.createPolicy(
		{ schema: 'public', name: 'levels' },
		POLICY_NAME_INSERT_LEVELS,
		{
			command: 'INSERT',
			check: 'auth.uid() = user_id',
		}
	);

	pgm.createPolicy(
		{ schema: 'public', name: 'levels' },
		POLICY_NAME_UPDATE_LEVELS,
		{
			command: 'UPDATE',
			using: 'auth.uid() = user_id',
		}
	);
};

exports.down = (pgm) => {
	pgm.dropPolicy(
		{ schema: 'public', name: 'levels' },
		POLICY_NAME_INSERT_LEVELS,
		{ ifExists: true }
	);
	pgm.dropPolicy(
		{ schema: 'public', name: 'levels' },
		POLICY_NAME_UPDATE_LEVELS,
		{ ifExists: true }
	);
	pgm.dropFunction(UNIQUE_LEVEL_ID_FUNCTION_NAME, []);
	pgm.dropFunction(SAVE_LEVEL_FUNCTION_NAME, SAVE_LEVEL_FUNCTION_PARAMS);
	pgm.dropTable(LEVEL_PLAY_SESSIONS_TABLE);
	pgm.dropTable(LEVEL_TABLE);
};
