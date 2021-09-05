import 'ignore-styles';
import { entityMap } from '../src/entities/entityMap';

const entitiesWithParse = Object.entries(entityMap).filter(([_, def]) => {
	return !!(def.parseObject || def.parseSprite);
});

const entitiesWithoutParse = Object.entries(entityMap).filter(([_, def]) => {
	return !def.parseObject && !def.parseSprite;
});

const totalEntities = entitiesWithParse.length + entitiesWithoutParse.length;

console.log(
	'Parsable entities:',
	entitiesWithParse.length,
	',',
	Math.round((entitiesWithParse.length / totalEntities) * 100) + '%'
);

console.log(
	'todo entities:',
	entitiesWithoutParse.length,
	',',
	Math.round((entitiesWithoutParse.length / totalEntities) * 100) + '%'
);

if (process.argv[2] === 'todo') {
	const todoDump = entitiesWithoutParse.map((e) => e[0]).join('\n');
	console.log(todoDump);
}
