import { useEffect, useState } from "react";
import Bet from "./Bet"
import axios from 'axios';
import "./Bet.css";

export default function Bets({ contract }) {
    const [matches, setMatches] = useState([])

    useEffect(() => {
        axios({
            //https://cors-anywhere.herokuapp.com/
            url: 'https://api.football-data.org/v4/competitions/CL/matches?status=SCHEDULED&limit=5',
            method: 'get',
            headers: {
                'X-Auth-Token': '7feefaada93c4992af729bf0b67fb77f',
                'Content-Type': 'application/json'
            }
        }).then(res => {
            setMatches(res.data.matches)
            console.log(res.data.matches)
        })
    }, [])

    return (<>
        <h1>Place your bets on following</h1>
        <div className="smart-contract-form-container">

            {matches.map(match => (
                <Bet key={match.id} match={match} contract={contract} />
            ))}
        </div></>
    );
}
