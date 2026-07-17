import { NavLink } from "react-router-dom";

export default function Logo() {
    return (
        <div className="flex gap-1">
            {/* <Bus className="text-emerald-600" /> */}
            <NavLink
                to="/"
                className="font-sora text-xl font-bold tracking-tight text-zinc-900"
            >
                Dh
                <span className="text-emerald-600">eBus</span>
            </NavLink>
        </div>
    );
}