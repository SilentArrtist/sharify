import { useState } from "react";
import { Link, Outlet, useOutletContext } from "react-router-dom";
import { Navbar } from "../../widgets/Navbar";
const Layout = () => {
    const [searchQuery, setSearchQuery] = useState("");
    return (
        <>
            <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            <Outlet context={[searchQuery, setSearchQuery]} />
        </>
    );
};

export { Layout };