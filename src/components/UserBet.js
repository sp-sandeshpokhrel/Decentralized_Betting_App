import { useEffect, useState } from "react"
import { ethers } from "ethers";



export default function UserBet({ bet, myBet, contract }) {
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

            const eventScr = await contract.eventScore(id)
            setScore(eventScr)
            await contract.requestMatchScore("0x00041F080c6624Cb34649fee8492f50b5fb13a01", "c0fdd13cfcca4e308d0948cd1de7ef23", id)

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
                    {bet.match.status == "FINISHED" ? `${bet.match.score.fullTime.home} - ${bet.match.score.fullTime.away}`
                        : "VS"}
                    <div className="football-game-card-body-item">
                        <img src={bet.match.awayTeam.crest} height="40" width="40" alt="awayTeam" />
                        <p>{bet.match.awayTeam.name}</p>
                    </div>

                </div>
                <div className="football-game-card-body-bet">
                    <div className="football-game-card-body-item-bet">
                        {ethers.utils.formatEther(myBet.amount.toString())} ETH : {betsType[myBet.wld]}
                        {score ? <>
                            {myBet.claimed ?
                                <button type="button" disabled>Claimed</button>
                                :
                                <button onClick={() => handleClaimBet(bet.match.id)} >Claim your bet</button>
                            }
                        </>
                            :
                            <>
                                {bet.match.score.winner ?
                                    <button onClick={() => requestScore(bet.match.id)}>Request Score on Blockchain</button>
                                    :
                                    <button >Happening Soon</button>
                                }

                            </>
                        }




                    </div>
                </div>

            </div>
        </>


    )
}
