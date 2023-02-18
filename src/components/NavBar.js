import { ethers } from 'ethers';
import './NavBar.css'
import ContractABI from "../contracts/abi.json";


function Navbar({ isConnected, setIsConnected, setContract }) {

    async function connect() {
        try {
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            // Replace with the address of your smart contract
            const contract = new ethers.Contract(ContractABI.address, ContractABI.abi, signer);
            setContract(contract)

            setIsConnected(true);
        } catch (error) {
            console.error(error);
        }
    }

    function disconnect() {

        setIsConnected(false);
    }

    return (
        <nav className="navbar">
            <ul className="nav-list">

                <li className="nav-item">
                    {isConnected ? (
                        <button className="nav-button" onClick={disconnect}>
                            Disconnect
                        </button>
                    ) : (
                        <button className="nav-button" onClick={connect}>
                            Connect
                        </button>
                    )}
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;
