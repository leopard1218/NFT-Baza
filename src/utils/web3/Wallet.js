import { clearWalletProvider, connectToWallet, web3ModalProvider } from "./Web3Modal";
import { CHANGE_WALLET } from '../../actions/types';

import store from '../../store'
import CustomNFTBookAbi from '../../abi/CustomNFTBook.json'
import RelicAbi from '../../abi/Relic.json'
import GoldenAbi from '../../abi/Golden.json'

// const CustomBookAddres = "0x13f18c5dba9a1e5218d52e583a8ac8a667cb680a"; // main
// const RelicAddress = "0x47a11526ed2d67e7eb08b88d09eb6f1569cc3ff3"  // main
// const GoldenAddress = "0x2c03e851cf9add3bec893cf95b05b0c734ee5ede"  // main

const CustomBookAddres = "0xf08119182EdCcBf19D4093b13573E935FfCf41f5"; // rikeby
const RelicAddress = "0xE4aff8c353910061b0C0cb4f52622399C5cAf68a"  // rikeby
const GoldenAddress = "0xba5D6fd0B5c3FA2d38f8377b3d6631df418fd599"  // rikeby

export let accountAddress = undefined
export let web3Modal = undefined
export let chainId = null
export let customBookContract = null
export let relicContract = null
export let goldenContract = null

async function updateAccount() {
  const accounts = await web3Modal.eth.getAccounts()
  updateAccountAddress(accounts)

  if (web3ModalProvider !== undefined && web3ModalProvider !== null) {
    web3ModalProvider.on("accountsChanged", (accounts) => {
      updateAccountAddress(accounts)
      console.log('called account changed')
      store.dispatch({ type: CHANGE_WALLET, payload: accounts[0] })
    });
    web3ModalProvider.on("chainChanged", (id) => {
      window.location.reload()
    });
  }
}

export async function initWallet() {
  try {
    web3Modal = await connectToWallet()

    chainId = await web3Modal.eth.net.getId();
    customBookContract = new web3Modal.eth.Contract(
      CustomNFTBookAbi, CustomBookAddres
    )
    relicContract = new web3Modal.eth.Contract(
      RelicAbi, RelicAddress
    )
    goldenContract = new web3Modal.eth.Contract(
      GoldenAbi, GoldenAddress
    )
    await updateAccount()
  } catch (e) {
    console.log("wallet connect error, reconnecting")
  }
}

export function updateAccountAddress(accounts) {
  if (accounts !== undefined && accounts.length > 0) {
    accountAddress = accounts[0]
  } else if (accountAddress !== undefined) {
    clearWalletProvider()
    accountAddress = undefined
  }
}
