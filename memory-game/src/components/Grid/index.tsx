import './style.css';
import { CardProps } from '../Cards';
import Cards from '../Cards';
import { useRef, useState, useEffect } from 'react';
import { duplicateRegenerateSortArray } from '../../utils/card-utils';
import { Link } from 'react-router-dom';

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
                } else {
                    unflip.current = true;
                }

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

            <div className="contain">
                <div id='table'>

                    <Link to={"/"}>
                        <div className="circle-arrow">
                            <i className="ri-arrow-left-line"></i>
                        </div>
                    </Link>

                    <div className="player-table">
                        <div className="circle"></div>
                        <h3>Ryan</h3>
                        <p>00:30</p>
                    </div>
                    <div className="player-table">
                        <div className="circle"></div>
                        <h3>Netin</h3>
                        <p>00:35</p>
                    </div>
                    <div className="player-table">
                        <div className="circle"></div>
                        <h3>Henry</h3>
                        <p>00:43</p>
                    </div>
                    <div className="player-table">
                        <div className="circle"></div>
                        <h3>Francisca</h3>
                        <p>00:51</p>
                    </div>
                    <div className="player-table">
                        <div className="circle"></div>
                        <h3>Cleber</h3>
                        <p>01:20</p>
                    </div>

                </div>

                <div id='content'>
                    <div className="text">
                        <p>
                            Temporizador: {formatTime(time)}
                        </p>
                        
                    </div>
                    <div className="grid">
                        {stateCards.map((card) => {
                            return <Cards {...card} key={card.id}
                                handleClick={handleClick} />;
                        })}
                    </div>
                    <button className="btn-reset"  onClick={() => handleReset()}>
                            Reiniciar
                        </button>{' '}
                        <button className="btn-reset" onClick={() => handleStopTimer()}>
                            Parar Tempo
                        </button>
                </div>
            </div>


        </>
    );
}