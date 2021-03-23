exports.shorthands = undefined;

const USER_TABLE = 'users';
const USER_AUTH_TO_PUBLIC_FUNCTION = 'user_auth_to_public';

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
  insert into public.${USER_TABLE} (id)
  values (new.id);
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
};

exports.down = (pgm) => {
  pgm.dropTable(USER_TABLE);
};

exports.USER_TABLE = USER_TABLE;
