const ERC20 = require("../abi/ERC20.json");
const IDM = require("../abi/IDM.json");
const ERC721 = require("../abi/AxieNFT.json");
const RPC_URL = "https://rpc-avax.hungle.dev";

IDM.address = "0x0000000000000000000000000000000000001001";

ERC20.address = "0xB9816fC57977D5A786E654c7CF76767be63b966e";

ERC721.address = "0xdc17555963bF08d6760c1213ED0bFEAeFDABa51c";

export { ERC20, ERC721, RPC_URL, IDM };
