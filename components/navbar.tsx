import Link from "next/link"

const Navbar = () => {
    return (
        <div className="navbar bg-base-300 mb-16">
            <Link href={"/"} className="btn btn-ghost text-xl">Assignment Maker</Link>
        </div>
    )
}

export default Navbar