const GET_MOST_POPULAR_PUBLISHED_LEVELS_FUNCTION_NAME =
	'get_most_popular_published_levels';
const GET_MOST_POPULAR_PUBLISHED_LEVELS_FUNCTION_PARAMS = [
	'current_user_id varchar(50)',
];

exports.shorthands = undefined;

exports.up = (pgm) => {
	pgm.createFunction(
		GET_MOST_POPULAR_PUBLISHED_LEVELS_FUNCTION_NAME,
		GET_MOST_POPULAR_PUBLISHED_LEVELS_FUNCTION_PARAMS,
		{
			replace: true,
			returns:
				'table (id text, name text, data jsonb, version text, username text, created_at timestamp, updated_at timestamp, total_vote_count bigint, current_user_voted bool)',
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
        coalesce(count(v.user_id), 0) as total_vote_count,
        coalesce(count(cuv.user_id), 0) = 1 as current_user_voted
      from
        public.levels l
      left join
        public.level_votes v
      on
        v.level_id = l.id
      left join
        public.level_votes cuv
      on
        cuv.level_id = l.id and cuv.user_id::text = current_user_id
      left join
        public.users u
      on
        u.id = l.user_id
      where
        l.published = true
      group by
        l.id, l.name, l.data, l.version, u.username, l.created_at, l.updated_at
      order by
        total_vote_count desc;
    end;
    `
	);
};

exports.down = (pgm) => {
	pgm.dropFunction(
		GET_MOST_POPULAR_PUBLISHED_LEVELS_FUNCTION_NAME,
		GET_MOST_POPULAR_PUBLISHED_LEVELS_FUNCTION_PARAMS
	);
};
