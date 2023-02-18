import { useState } from 'react';
import { ethers } from 'ethers';

export default function Bet({ match, contract }) {
    const [betAmount, setBetAmount] = useState('');
    const [betType, setBetType] = useState("1")

    const onOptionChange = e => {
        setBetType(e.target.value)
    }

    const handleBetAmountChange = (e) => {
        setBetAmount(e.target.value);
    }

    const handlePlaceBet = async () => {
        // onPlaceBet(match.id, betAmount);
        try {

            const bet = await contract.betNow(betType, match.id, { "value": ethers.utils.parseUnits(betAmount.toString(), "ether") })



        } catch (error) {
            console.error(error);

        }
    }


    return (
        <div className="football-game-card">
            <div className="football-game-card-header">
                <h2>Match ID: {match.id}  <p>Time: {match.utcDate}</p></h2>
            </div>
            <div className="football-game-card-body">

                <div className="football-game-card-body-item">
                    <img src={match.homeTeam.crest} height="40" width="40" alt="homeTeam" />
                    <p>{match.homeTeam.name}</p>
                </div>
                VS
                <div className="football-game-card-body-item">
                    <img src={match.awayTeam.crest} height="40" width="40" alt="awayTeam" />
                    <p>{match.awayTeam.name}</p>
                </div>

            </div>

            <div className="football-game-card-body-bet">
                <div className="football-game-card-body-item-bet">
                    <div className='football-betType'>
                        <input
                            type="radio"
                            name="bet"
                            value="0"
                            id="0"
                            checked={betType === "0"}
                            onChange={onOptionChange}
                        />
                        <label htmlFor="0">W1</label>

                        <input
                            type="radio"
                            name="bet"
                            value="1"
                            id="1"
                            checked={betType === "1"}
                            onChange={onOptionChange}
                        />
                        <label htmlFor="1">X</label>

                        <input
                            type="radio"
                            name="bet"
                            value="2"
                            id="2"
                            checked={betType === "2"}
                            onChange={onOptionChange}
                        />
                        <label htmlFor="2">W2</label>
                    </div>
                    <input type="number" placeholder="Enter bet amount(ETH)" value={betAmount} onChange={handleBetAmountChange} />
                    <button onClick={handlePlaceBet}>Place bet</button>
                </div>
            </div>
        </div>
    )
}
