// import './style.css';
// import { CardProps } from '../Cards';
// import Cards from '../Cards';
// import { useRef, useState } from 'react';
// import { duplicateRegenerateSortArray } from '../../utils/card-utils';

// export interface GridProps {
//     cards: CardProps[];
// }

// export function Grid({ cards }: GridProps) {
//     const [stateCards, setStateCards] = useState(() => {
//         return duplicateRegenerateSortArray(cards);
//     });
//     const first = useRef<CardProps | null>(null);
//     const second = useRef<CardProps | null>(null);
//     const unflip = useRef(false);
//     const [matches, setMatches] = useState(0);
//     const [moves, setMoves] = useState(0);

//     const handleReset = () => {
//         setStateCards(duplicateRegenerateSortArray(cards));
//         first.current = null;
//         second.current = null;
//         unflip.current = false;
//         setMatches(0);
//         setMoves(0);
//     };

//     const handleClick = (id: string) => {
//         const newStateCards = stateCards.map((card) => {
//             // Se o id do cartão não for o id clicado, não faz nada
//             if (card.id !== id) return card;
//             // Se o cartão já estiver virado, não faz nada
//             if (card.flipped) return card;

//             // Desviro possíveis cartas erradas
//             if (unflip.current && first.current && second.current) {
//                 first.current.flipped = false;
//                 second.current.flipped = false;
//                 first.current = null;
//                 second.current = null;
//                 unflip.current = false;
//             }

//             // Virar o card
//             card.flipped = true;

//             // Configura primeiro e segundo cartão clicados
//             if (first.current === null) {
//                 first.current = card;
//             } else if (second.current === null) {
//                 second.current = card;
//             }

//             // Se eu tenho os dois cartão virados
//             // Posso checar se estão corretos
//             if (first.current && second.current) {
//                 if (first.current.back === second.current.back) {
//                     // A pessoa acertou
//                     first.current = null;
//                     second.current = null;
//                     setMatches((m) => m + 1);
//                 } else {
//                     // A pessoa errou
//                     unflip.current = true;
//                 }

//                 setMoves((m) => m + 1);
//             }

//             return card;
//         });

//         setStateCards(newStateCards);
//     };

//     return (
//         <>
//             <div className="text">
//                 <p>
//                     Moves: {moves} | Matches: {matches} |{' '}
//                     <button id='btn-reset' onClick={() => handleReset()}>Reiniciar</button>
//                 </p>
//             </div>
//             <div className="grid">
//                 {stateCards.map((card) => {
//                     return <Cards {...card} key={card.id} handleClick={handleClick} />;
//                 })}
//             </div>
//         </>
//     );
// }

import './style.css';
import { CardProps } from '../Cards';
import Cards from '../Cards';
import { useRef, useState, useEffect } from 'react';
import { duplicateRegenerateSortArray } from '../../utils/card-utils';

export interface GridProps {
    cards: CardProps[];
}

export function Grid({ cards }: GridProps) {
    const [stateCards, setStateCards] = useState(() => {
        return duplicateRegenerateSortArray(cards);
    });
    const first = useRef<CardProps | null>(null);
    const second = useRef<CardProps | null>(null);
    const unflip = useRef(false);
    const [matches, setMatches] = useState(0);
    const [moves, setMoves] = useState(0);

    const [time, setTime] = useState(0); // Estado para controlar o cronômetro
    const [timerRunning, setTimerRunning] = useState(false); // Controle do estado do cronômetro

    useEffect(() => {
        let timer: NodeJS.Timeout | undefined;
        if (timerRunning) {
            timer = setInterval(() => {
                setTime((prevTime) => prevTime + 1);
            }, 1000);
        }
        return () => {
            if (timer) clearInterval(timer); // Limpa o timer ao desmontar ou ao parar
        };
    }, [timerRunning]);

    const handleReset = () => {
        setStateCards(duplicateRegenerateSortArray(cards));
        first.current = null;
        second.current = null;
        unflip.current = false;
        setMatches(0);
        setMoves(0);
        setTime(0);
        setTimerRunning(false);
    };

    const handleStopTimer = () => {
        setTimerRunning(false);
    };

    const handleClick = (id: string) => {
        if (!timerRunning) setTimerRunning(true); // Inicia o cronômetro no primeiro clique

        const newStateCards = stateCards.map((card) => {
            if (card.id !== id) return card;
            if (card.flipped) return card;

            if (unflip.current && first.current && second.current) {
                first.current.flipped = false;
                second.current.flipped = false;
                first.current = null;
                second.current = null;
                unflip.current = false;
            }

            card.flipped = true;

            if (first.current === null) {
                first.current = card;
            } else if (second.current === null) {
                second.current = card;
            }

            if (first.current && second.current) {
                if (first.current.back === second.current.back) {
                    first.current = null;
                    second.current = null;
                    setMatches((m) => m + 1);
                } else {
                    unflip.current = true;
                }

                setMoves((m) => m + 1);
            }

            return card;
        });

        setStateCards(newStateCards);
    };

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
    };

    return (
        <>
            <div className="text">
                <p>
                    Temporizador: {formatTime(time)} | Movimentos: {moves} | Encontrados: {matches} |{' '}
                </p>
                <button className="btn-reset" onClick={() => handleReset()}>
                    Reiniciar
                </button>{' '}

                <button className="btn-reset" onClick={() => handleStopTimer()}>
                    Parar Tempo
                </button>
            </div>
            <div className="grid">
                {stateCards.map((card) => {
                    return <Cards {...card} key={card.id} handleClick={handleClick} />;
                })}
            </div>
        </>
    );
}


