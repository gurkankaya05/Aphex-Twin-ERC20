import { ethers } from "ethers"
import { useEffect, useState } from "react"
import { APHEX_TWIN_ABI } from "../abi/abi";
import { APHEX_TWIN_CONTRACT } from "../constants/addresses"
export const useAphexContract =() => {

    const [contract, setContract] = useState(null);


    useEffect(() => {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const _contract = new ethers.Contract(APHEX_TWIN_CONTRACT,APHEX_TWIN_ABI,signer);
       setContract(_contract); 
    },[])
    return contract;
    

}