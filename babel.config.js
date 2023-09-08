module.exports = {
    presets: ['module:metro-react-native-babel-preset'],
    plugins: [
	[
	    'module-resolver', {
		root: ['./'], 
		alias: {
		    '@assets': './src/assets', 
		    '@components': './src/components', 
		    '@screens': './src/screens', 
	            '@navigations': './src/navigations', 
		    '@utils': './src/utils', 
		    '@hooks': './src/hooks', 
		    '@store': './src/store'
		}
	    }
	], 
	['react-native-reanimated/plugin']
    ]
};
