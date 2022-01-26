const GET_PUBLISHED_LEVELS_THAT_HAVE_ECOINS_FUNCTION_NAME =
	'get_published_levels_that_have_ecoins';
const GET_PUBLISHED_LEVELS_THAT_HAVE_ECOINS_FUNCTION_PARAMS = [];

exports.shorthands = undefined;

exports.up = (pgm) => {
	pgm.createFunction(
		GET_PUBLISHED_LEVELS_THAT_HAVE_ECOINS_FUNCTION_NAME,
		GET_PUBLISHED_LEVELS_THAT_HAVE_ECOINS_FUNCTION_PARAMS,
		{
			replace: true,
			returns:
				'table (id text, name text, data jsonb, version text, username text, created_at timestamp, updated_at timestamp, total_vote_count bigint)',
			language: 'plpgsql security definer',
		},
		`
    begin
      return query
      select 
        l.id,
        l.name,
        l.data,
        l.version,
        u.username,
        l.created_at,
        l.updated_at,
        coalesce(count(lv.user_id), 0) as total_vote_count
      from
        public.levels l
      left join
        public.level_votes lv
      on
        lv.level_id = l.id 
      left join
        public.users u
      on
        u.id = l.user_id
      where
        l.published = true and (l.data::text like '%"type": "ECoin"%')
      group by
        l.id, l.name, l.data, l.version, u.username, l.created_at, l.updated_at;
      end;
    `
	);
};

exports.down = (pgm) => {
	pgm.dropFunction(
		GET_PUBLISHED_LEVELS_THAT_HAVE_ECOINS_FUNCTION_NAME,
		GET_PUBLISHED_LEVELS_THAT_HAVE_ECOINS_FUNCTION_PARAMS
	);
};
