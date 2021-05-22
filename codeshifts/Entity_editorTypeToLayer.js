const valueMap = {
	entity: 'playfield-entity',
	cell: 'playfield-matrix',
};

function transform(fileInfo, api) {
	const j = api.jscodeshift;

	return j(fileInfo.source)
		.find(j.ObjectProperty)
		.forEach(function (path) {
			if (path.value.key.name === 'editorType') {
				path.value.key.name = 'layer';
				path.value.value.value = valueMap[path.value.value.value];
			}
		})
		.toSource();
}

module.exports = transform;
module.exports.parser = 'tsx';
