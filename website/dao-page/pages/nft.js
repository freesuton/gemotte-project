import {useEffect,useState,useContext}  from 'react'
import {CountContext} from '../comps/Layout'
import {ethers} from 'ethers'
import {getWeb3,getContract,listener} from '../pages/api/utils'
import GemotteNFTCollection from './contracts/GemotteNFTCollection.json'
import  Web3 from 'web3';

const Nft = () => {
    
    const { connected, networkId,accounts } = useContext(CountContext);
    const [tokenCount, setTokenCount] = useState(0);
    const [contract, setContract] = useState();
    const requiredNetwork = 1;
    const contractAddress = "0x3a56590664fEF8f483063F3d714B88DafEe0Bbc7";
    const provider = "https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161";

    useEffect(async() => {


        if(connected && window.ethereum){
            const web3 = new Web3(window.ethereum);
            const contract = new web3.eth.Contract(GemotteNFTCollection.abi,contractAddress);
            setContract(contract);
            setTokenCount(await contract.methods.tokenCount.call().call());
            console.log("detect metamask");
        }else{
            const contract = await getContract(contractAddress,provider,GemotteNFTCollection.abi);
            setContract(contract);
            setTokenCount(await contract.methods.tokenCount.call().call());
        }
        
        // console.log(accounts);
    }, [connected]);


    async function mint(e){
        e.preventDefault();
       await contract.methods.mint().send({from: accounts[0], value: ethers.utils.parseEther("0.05")});
       console.log(accounts[0]);
     }


    return (

        <section className="intro">
          <div className="intro__background">
            <picture>

              <img src="assets/images/intro/background@2x3.png" alt="background" className="intro-back"/>
            </picture>
            <img src="assets/videos/stars.gif" alt="" className="intro-star"/>
          </div>
          <div className="hero">
            <div className="hero__content" style={{background:"rgb(0,0,0,0.9)", padding:"2%", borderRadius:"20px"}}>
              <div className="hero__title-wrapper" >
              <h2 className="hero__title">{tokenCount}/5000</h2> 
                {connected ?
                    <></> :
                    <p className="hero__subtitle">Please Connect Wallet</p>}
              </div>
              <p className="hero__subtitle"> Mint Price: 0.05 ETH </p>
              {/* <p className="hero__subtitle">test:{connected}</p>
              <p className="hero__subtitle">account: {accounts}</p> 
               <p className="hero__subtitle"> network:{networkId}</p> */}
              {networkId == requiredNetwork && connected == true?
                <div onClick={(e) => mint(e)} className="header__btn-wrapper" style={{marginTop:"6%"}}>
                    <span className="header__btn-text">Mint</span> 
                    <img src="assets/images/glass.png" alt="glass" className="header__btn-glass"/>
                </div>
              :              
                <div  className="header__btn-wrapper" style={{marginTop:"6%"}}>
                    <span className="header__btn-text">#!Connect to ETH</span>
                    <img src="assets/images/glass.png" alt="glass" className="header__btn-glass"/>
                </div>
              }
            </div>
            <div className="hero__ai">
              <picture>
                <source srcSet="assets/images/intro/rocks@mobile.png" media="(max-width: 768px)" type="image/png"/>
                <img src="assets/images/intro/rocks@2x.png" alt="rocks" className="hero__rocks"/>
              </picture>
              <picture>
                <source srcSet="" type="image/webp"/>
                <img src="assets/images/intro/path@2x.png" alt="path" className="hero__path"/>
              </picture>
              <img src="assets/images/intro/fighting-squirrel@2x.png" alt="rabbits" className="hero__rabbits"/>
              <picture>
                <source srcSet="assets/images/intro/path@mobile.png" media="(max-width: 768px)" type="image/png"/>
                <img src="assets/images/intro/path@2x.png" alt="path" className="hero__path"/>
              </picture>
            </div>
          </div>
          
        </section>

    );
}

export default Nft;