/* eslint-disable camelcase */

exports.shorthands = undefined;

const SAVE_LEVEL_FUNCTION_NAME = 'save_level';
const SAVE_LEVEL_FUNCTION_PARAMS = [
	'existing_id text',
	'name text',
	'description text',
	'data json',
	'version text',
];

exports.up = (pgm) => {
	pgm.dropFunction(SAVE_LEVEL_FUNCTION_NAME, SAVE_LEVEL_FUNCTION_PARAMS);

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
      (id, user_id, name, description, data, version)
    values
      (existing_id, auth.uid(), name, description, data, version)
    on conflict (id) do update set
      (name, description, data, version, updated_at) = (excluded.name, excluded.description, excluded.data, excluded.version, current_timestamp)
    where levels.user_id = auth.uid()
    returning id into created_level_id;
    
    update levels set parent_id = created_level_id where id = created_level_id;
    
    return created_level_id;
  end;`
	);
};

exports.down = (pgm) => {
	pgm.dropFunction(SAVE_LEVEL_FUNCTION_NAME, SAVE_LEVEL_FUNCTION_PARAMS);

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
      (id, user_id, name, description, data, version)
    values
      (existing_id, auth.uid(), name, description, data, version)
    on conflict (id) do update set
      (name, description, data, version, updated_at) = (excluded.name, excluded.description, excluded.data, excluded.version, current_timestamp)
    where levels.user_id = auth.uid()
    returning id into created_level_id;
    
    update levels set parent_id = created_level_id where id = created_level_id;
    
    return created_level_id;
  end;
`
	);
};
