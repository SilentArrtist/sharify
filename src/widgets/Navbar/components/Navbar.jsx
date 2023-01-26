import React, { useEffect } from 'react';
import { AiFillHome } from 'react-icons/ai'
import { useState } from 'react';
import { Search } from '../../../features/Search';
import { HeaderBtnBlack, HeaderBtnWhite } from '../../../shared/ui';
import { AiOutlinePlus } from 'react-icons/ai'
import '../styles/style.scss'
const Navbar = ({ searchQuery, setSearchQuery }) => {
    const [sticky, setSticky] = useState("");
    useEffect(() => {
        window.addEventListener("scroll", isSticky);
        return () => {
            window.removeEventListener("scroll", isSticky);
        };
    }, []);

    const isSticky = () => {
        setSticky(window.scrollY >= 80);
    };

    return (
        <header className={`header ${sticky ? "sticky" : ""}`}>
            <div className="header_item">
                <HeaderBtnBlack link={'/'} setSearchQuery={setSearchQuery}>
                    <AiFillHome />
                    <span>Главная</span>
                </HeaderBtnBlack>
                <HeaderBtnWhite link={'/create'}>
                    <span>Создать</span>
                    <AiOutlinePlus fontSize={21} />
                </HeaderBtnWhite>
            </div>
            <div className="header_item">
                <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            </div>
        </header>
    );
};

export { Navbar };