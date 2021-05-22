const valueMap = {
	'playfield-entity': 'actor',
	'playfield-matrix': 'stage',
};

function transform(fileInfo, api) {
	const j = api.jscodeshift;

	return j(fileInfo.source)
		.find(j.ObjectProperty)
		.forEach(function (path) {
			if (
				path.value.key.name === 'layer' &&
				!!valueMap[path.value.value.value]
			) {
				path.value.value.value = valueMap[path.value.value.value];
			}
		})
		.toSource();
}

module.exports = transform;
module.exports.parser = 'tsx';
