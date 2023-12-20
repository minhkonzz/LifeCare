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
					'@popup': './src/components/shared/popup-content',
					'@navigations': './src/navigations',
					'@utils': './src/utils',
					'@hooks': './src/hooks',
					'@models': './src/models', 
					'@services': './src/services', 
					'@controllers': './src/controllers',
					'@configs': './src/configs', 
					'@services': './src/services', 
					'@hocs': './src/hocs',
					'@store': './src/store'
				}
			}
		],
		['react-native-reanimated/plugin'],
		["@babel/plugin-proposal-decorators", { "legacy": true }],
		["module:react-native-dotenv"]
	]
};
