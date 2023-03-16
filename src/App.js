import logo from './logo.svg';
import './App.css';
import { Web3Connection } from '@taikai/dappkit';
import { useEffect, useState } from 'react';
import { DataUnionClient } from '@dataunions/client'
// importing a file
import abi from './abis/DataUnionFactory.json'



const web3Connection = new Web3Connection({
  web3Host: 'https://rpc.gnosischain.com/',
  /* privateKey: '' */
});

function App() {
  const [user, setUser] = useState()
  console.log(abi);
  

  const DU_CONTRACT_ADDRESS = "0x8a7bd6730736F743e34ce267d510e1547E03fF7c"

  const DU = new DataUnionClient({
    auth: {
      privateKey: '71e5e0b3f0be78867aca0e1e14bbf4ef969448270f12de13ea004c787973fc00',
    },
    chain: 'gnosis',
  });


  async function connect() {

    await web3Connection.start();
    await web3Connection.connect();
  }


  // always have async in front of your function when you are using async calls like "await"
  async function addMember() {

    await web3Connection.getAddress().then((newUser) => {
      console.log(newUser);
      setUser(newUser)
    }
    )

  // get user wallet addresss

    console.log(user);
    const dataUnion = await DU.getDataUnion(DU_CONTRACT_ADDRESS);
    const tx = await dataUnion.addMembers(['0x9cdfa185EB329f89A30d814472d204232Bc27Ed7']).then((data) => console.log(data));

  }


  return (
    <div className="App">
      <header className="App-header">

        <button onClick={() => connect()}>Clikc mem am </button>
        <button onClick={() => addMember()}>Add Member</button>

      </header>
    </div>
  );
}

export default App;
