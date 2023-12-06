import createRule, { messageIds } from './require-relative-imports/createRule';

const RULE_NAME = 'require-relative-imports';

const rule = {
	[RULE_NAME]: {
		meta: {
			type: 'layout',
			fixable: 'code',
			hasSuggestions: true,
			messages: {
				[messageIds.importCanBeRelative]:
					'Import path can be relative since a file is imported from within the same baseURL or path \n \n' +
					'Replace with {{fixedImportPath}}',
			},
		},
		create: createRule,
	},
};

export default rule;
