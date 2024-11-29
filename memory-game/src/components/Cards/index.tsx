import './style.css'
import logo from '../../../public/images/logo-discoveryKids.png'

export interface CardProps {
    id: string;
    flipped?: boolean;
    back: string;
    handleClick?: (id: string) => void;
}

export default function Cards({ flipped = false, back, handleClick, id }: CardProps) {
    const cardContentClassNames = ['card_content'];
    flipped && cardContentClassNames.push('card_content_flipped');

    const handleClickFn = (id: string) => {
        if (handleClick) {
            handleClick(id)
        }
    }

    return (
        <>
            <div className="card" onClick={() => handleClickFn(id)}>
                <div className={cardContentClassNames.join(' ')}>
                    <div className="card_face card_face_front"><img id='logo' src={logo} /></div>
                    <div className="card_face card_face_back"> <img src={back} className='img-cards'/></div>
                </div>
            </div>
        </>
    )
}
