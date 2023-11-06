module.exports = {
	presets: ['module:metro-react-native-babel-preset'],
	plugins: [
		[
			'babel-plugin-module-resolver', {
				root: ['./'],
				alias: {
					'@assets': './src/assets',
					'@components': './src/components',
					'@contexts': './src/contexts',
					'@screens': './src/screens',
					'@navigations': './src/navigations',
					'@utils': './src/utils',
					'@hooks': './src/hooks',
					'@models': './src/models', 
					'@services': './src/services', 
					'@controllers': './src/controllers',
					'@configs': './src/configs', 
					'@services': './src/services', 
					'@hocs': './src/hocs'
				}
			}
		],
		['react-native-reanimated/plugin'],
		["@babel/plugin-proposal-decorators", { "legacy": true }],
		["module:react-native-dotenv"]
	]
};
