module.exports = {
	presets: ['module:metro-react-native-babel-preset'],
	plugins: [
		[
			'babel-plugin-module-resolver', {
				root: ['./'],
				alias: {
					'@assets': './src/assets',
					'@components': './src/components',
					'@screens': './src/screens',
					'@navigations': './src/navigations',
					'@utils': './src/utils',
					'@hooks': './src/hooks',
					'@models': './src/models', 
					'@services': './src/services', 
					'@controllers': './src/controllers'
				}
			}
		],
		['react-native-reanimated/plugin'],
		["@babel/plugin-proposal-decorators", { "legacy": true }],
		["@babel/plugin-proposal-class-properties"],
		["module:react-native-dotenv"]
	],
	assumptions: {
		setPublicClassFields: false
  	}
};
