import { importDir } from "./javascript/utils/importDir";

// Not recursive
window.AlchemyOrb = importDir(require.context('./javascript/utils', false, /(?<!archive.*).js$/))

AlchemyOrb.log('loaded alchemy_orb.js');
