import React from 'react'
import styled from 'styled-components'

const GameRules = () => {
  return (
    <Rules>
        <div className="rules-header">
            <h1 className="rules-title"> RULES </h1>
        </div>
        <div className="rule-list-container">
            <ul className="rule-list">
                <li className="rule-item">
                    <span className="rule-number"> 1. </span>
                    <span className="rule-description">
                        Everyone Will Get 1 turn except for the first player.
                    </span>
                </li>
                <li className="rule-item">
                    <span className="rule-number"> 2. </span>
                    <span className="rule-description">
                        Gifts can only be stolen 1 time per turn. With a total of 3 steals per game. Once a gift is stolen 3 times it can not be stolen again.
                    </span>
                </li>
                <li className="rule-item">
                    <span className="rule-number"> 3. </span>
                    <span className="rule-description">
                        Don't be afraid to hurt peoples feelings. Remember this is just a game so have fun!
                    </span>
                </li>
            </ul>
        </div>
    </Rules>
  )
}

export default GameRules


const Rules = styled.div `
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;

    ul {
        list-style: none;
    }

    li {
        margin: 10px 0;
    }

    .rule-list-container {
       font-family: ${pr => pr.theme.fonts.family.nicus};
       font-size: ${pr => pr.theme.fonts.size.xlarge};
    }

    .rule-number {
        font-weight: bold;
        color: ${pr => pr.theme.colors.green};
    }
    
   .rules-header > h1 {
        font-size: ${pr => pr.theme.fonts.size.xlarge};
        font-family: ${pr => pr.theme.fonts.family.nicus};
        color: ${pr => pr.theme.colors.red};
   }
   
    
    


`