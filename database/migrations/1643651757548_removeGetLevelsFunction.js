/* eslint-disable camelcase */
const {
	GET_LEVELS_FUNCTION_NAME,
	GET_LEVELS_FUNCTION_PARAMS,
	up: getLevelsFunctionsUp,
} = require('./1614973987831_getLevelsFunctions');

exports.shorthands = undefined;

exports.up = (pgm) => {
	pgm.dropFunction(GET_LEVELS_FUNCTION_NAME, GET_LEVELS_FUNCTION_PARAMS);
};

exports.down = getLevelsFunctionsUp;
