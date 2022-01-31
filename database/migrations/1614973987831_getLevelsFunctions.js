const GET_LEVELS_FUNCTION_NAME = 'get_levels';
const GET_LEVELS_FUNCTION_PARAMS = ['sort text'];

exports.shorthands = undefined;

exports.up = (pgm) => {
	pgm.createFunction(
		GET_LEVELS_FUNCTION_NAME,
		GET_LEVELS_FUNCTION_PARAMS,
		{
			replace: true,
			returns:
				'table (name text, description text, data text, updated_at timestamp, deaths bigint, plays bigint)',
			language: 'plpgsql security definer',
		},
		`
    declare
      order_by text;
      qry text;
    begin
      if sort = 'popular' then
        order_by := 'plays desc';
      else
        order_by := 'l.updated_at desc';
      end if;
      
      qry := 'select 
        l.name, 
        l.description,
        l.data::text,
        l.updated_at,
        coalesce(sum(s.deaths), 0) as deaths, 
        (coalesce(sum(s.deaths), 0) + coalesce(count(s.id), 0)) as plays
      from
        levels l
      left join
        level_play_sessions s
      on
        s.level_id = l.id
      group by
        l.name,
        l.description,
        l.data::text,
        l.updated_at
      order by ' || order_by || ' limit 20';
      
      return query execute qry;
    end
    `
	);
};

exports.down = (pgm) => {
	pgm.dropFunction(GET_LEVELS_FUNCTION_NAME, GET_LEVELS_FUNCTION_PARAMS);
};
exports.GET_LEVELS_FUNCTION_NAME = GET_LEVELS_FUNCTION_NAME;
exports.GET_LEVELS_FUNCTION_PARAMS = GET_LEVELS_FUNCTION_PARAMS;
