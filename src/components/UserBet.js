import { useState } from "react"
import { ethers } from "ethers";
import axios from 'axios';
import './Bet.css'

export default function UserBet({ bet, myBet, contract }) {
    const [bets, setBets] = useState([])
    const [score, setScore] = useState(false)
    const betsType = ["W1", "X", "W2"]




    async function handleClaimBet(id) {
        try {
            const tx = await contract.claimBet(id)
            tx.wait()
        }
        catch (error) {
            console.log(error.reason)
        }

    }

    async function requestScore(id) {
        try {
            const score = await contract.score(id)
            setScore(score)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <div className="football-game-card">
                <div className="football-game-card-header">
                    <h2>Match ID: {bet.match.id}</h2>
                </div>
                <div className="football-game-card-body">

                    <div className="football-game-card-body-item">
                        <img src={bet.match.homeTeam.crest} height="40" width="40" alt="homeTeam" />
                        <p>{bet.match.homeTeam.name}</p>
                    </div>
                    VS
                    <div className="football-game-card-body-item">
                        <img src={bet.match.awayTeam.crest} height="40" width="40" alt="awayTeam" />
                        <p>{bet.match.awayTeam.name}</p>
                    </div>

                </div>
                <div className="football-game-card-body-bet">
                    <div className="football-game-card-body-item-bet">

                        {console.log(myBet.amount.toString())}
                        {score ? <>{ethers.utils.formatEther(myBet.amount.toString())} ETH : {betsType[myBet.wld]}
                            {myBet.claimed ?
                                <button type="button" disabled>Claimed</button>

                                :
                                <button onClick={() => handleClaimBet(bet.match.id)} >Claim your bet</button>
                            }</> : <button onClick={() => requestScore(bet.match.id)}>Request Score</button>}



                    </div>
                </div>

            </div>
        </>


    )
}
