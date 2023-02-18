import { useState } from "react"
import { ethers } from "ethers";
import axios from 'axios';
import UserBet from "./UserBet";
import './Bet.css'

export default function UserBets({ contract }) {
    const [bets, setBets] = useState([])
    const [score, setScore] = useState(false)
    const betsType = ["W1", "X", "W2"]


    async function seeBets() {
        try {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
            const eventIds = await contract.getEventIdArray()
            let eventId, bet
            for (eventId of eventIds) {
                console.log(eventId.toString());
                bet = await contract.getUserBetArray(eventId.toString(), accounts[0])
                //https://cors-anywhere.herokuapp.com/
                axios({
                    url: `https://api.football-data.org/v4/matches/${eventId.toString()}`,
                    method: 'get',
                    headers: {
                        'X-Auth-Token': '7feefaada93c4992af729bf0b67fb77f',
                        'Content-Type': 'application/json'
                    }
                }).then(res => {
                    setBets(prev => {

                        const tempBets = [...prev, { "match": res.data, "bets": bet }]
                        console.log(tempBets)
                        return tempBets
                    })
                }
                )
            }

            console.log(bets)
        }
        catch (error) {
            console.log(error)
        }
    }



    return (
        <>
            <h1>Your Bets</h1>
            <button onClick={seeBets}>See your Bets</button>
            <div className="smart-contract-form-container">
                {bets.map((bet, index) =>
                    <div key={index}>
                        {bet.bets.map(myBet =>
                            <UserBet bet={bet} myBet={myBet} contract={contract} />
                        )}
                    </div>
                )}
            </div>
        </>
    )
}
