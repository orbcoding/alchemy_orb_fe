import { importDir } from '../alchemy_orb/javascript/utils/importDir';

// Not recursive
window.AlchemyOrb = importDir(require.context('../alchemy_orb/javascript/utils', false, /(?<!archive.*).js$/))
// Then nested admin folder
Object.assign(window.AlchemyOrb, importDir(require.context('../alchemy_orb/javascript/utils/admin', false, /(?<!archive.*).js$/)))

// All admin js
AlchemyOrb.importDir(require.context('./javascript/admin', true, /(?<!_archive.*).js$/));

AlchemyOrb.log('loaded alchemy_orb/alchemy/admin.js');
