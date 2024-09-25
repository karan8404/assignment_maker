import Image from 'next/image'
import Link from 'next/link'

const Card = (props: CardProps) => {
    return (
        <Link href={props.redirectTo} className="card w-80 bg-base-100 shadow-xl cursor-pointer transform transition-transform duration-300 hover:scale-105">
            <figure>
                <Image src={props.image} alt="Card Image" width={400} height={400} />
            </figure>
            <div className="card-body">
                <h2 className='card-title'>{props.name}</h2>
            </div>
        </Link>
    )
}

export default Card

interface CardProps {
    name: string
    image: string
    redirectTo: string
}