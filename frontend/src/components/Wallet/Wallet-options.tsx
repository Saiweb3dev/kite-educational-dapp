import * as React from 'react';
import { Connector, useConnect } from 'wagmi'; // wagmi hooks and types for wallet connection

/**
 * WalletOptions component renders a button to open a modal with available wallet connection options.
 * Users can select a wallet to connect to the dApp.
 */
export function WalletOptions() {
  const { connectors, connect} = useConnect(); // wagmi hook to get available connectors and connect function
  const [showModal, setShowModal] = React.useState(false); // State to control the visibility of the wallet options modal

  // Filter connectors to only include MetaMask
  const metaMaskConnector : Connector | undefined = connectors.find(connector => connector.name === 'MetaMask');

  /**
   * Function to show the modal when the "Connect" button is clicked.
   */
  const handleConnectClick = () => {
    setShowModal(true); // Show the modal when "Connect" is clicked
  };

  /**
   * Function to handle wallet selection.
   * Connects to the selected wallet and closes the modal.
   * @param {Connector} connector - The selected wallet connector.
   */
  const handleWalletSelect = (connector:any) => {
    connect({ connector }); // Connect to the selected wallet
    setShowModal(false); // Close the modal after a wallet is selected
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-4 mr-6">
      {/* Button to open the wallet options modal */}
      {!showModal && (
        <button 
          onClick={handleConnectClick}
          className="bg-blue-700 border-2 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-500"
        >
          Connect
        </button>
      )}

      {/* Modal displaying available wallet connection options */}
      {showModal && (
        <div className="fixed inset-0 p-16 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white text-black text-center px-6 py-28 rounded-md text-sm font-medium hover:bg-gray-200">
          <h2 className="text-4xl font-semibold">Connect Wallet</h2>
          <div className='flex flex-row justify-center space-x-6 m-6'>
            {/* Render button for MetaMask wallet option */}
            {metaMaskConnector && (
              <button 
                key={metaMaskConnector.id} 
                onClick={() => handleWalletSelect(metaMaskConnector)}
                className="bg-blue-700 text-white px-6 py-2 rounded hover:bg-blue-500 hover:text-gray-300 transition duration-300 w-fit "
              >
                {metaMaskConnector.name}
              </button>
            )}
          </div>
          <button 
              onClick={() => setShowModal(false)}
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 transition duration-300"
            >
              Close
            </button>
        </div>
      </div>
    )}
  </div>
  );
}
