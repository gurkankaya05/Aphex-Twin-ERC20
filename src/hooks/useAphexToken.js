import { ethers } from "ethers"
import { useEffect, useState } from "react"
import { APHEX_TOKEN_ABI } from "../abi/abi";
import { APHEX_TOKEN } from "../constants/addresses";
export const useAphexToken =() =>{

    const [contract,setContract] = useState(null);
    useEffect(() => {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const _contract = new ethers.Contract(APHEX_TOKEN , APHEX_TOKEN_ABI,signer);
        setContract(_contract);
    },[])
    return contract;
}