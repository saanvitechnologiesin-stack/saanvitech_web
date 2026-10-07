'use client';

import { useState } from "react";
import Icons from "./Icons";
import DrawerOpener from "./DrawerOpener";

const SearchModal = ({title, placeholder}: { title: string, placeholder: string }) => {
    const [query, setQuery] = useState('');

    const handleForm = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        // add your custom functionality here
    }

    return(
        <>
          <DrawerOpener
            cls="header-search search-open svg-wrapper"
            data-drawer=".modal-search"
          >
            <Icons.Search />
          </DrawerOpener>
          
          <modal-search className="theme-modal modal-search">
              <div className="modal-container">
                <div className="modal-header">
                  <DrawerOpener
                    cls="search-close svg-wrapper"
                    data-drawer=".modal-search"
                  >
                    <Icons.CloseCircle />
                  </DrawerOpener>
                </div>
                
                <div className="modal-main flex items-center justify-center">
                  <form
                    className="form-search flex items-center justify-center flex-wrap"
                    onSubmit={handleForm}
                  >
                    <label htmlFor="Search" className="text text-30">{title}</label>
                    <input
                      type="text"
                      placeholder={placeholder}
                      name="search"
                      id="Search"
                      className="text text-16"
                      autoComplete="off"
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                    />
                    <button
                      className="button button--primary"
                      type="submit"
                      aria-label="Search"
                    >
                      <span className="svg-wrapper">
                        <Icons.Search />
                      </span>
                    </button>
                  </form>
                </div>
              </div>
          </modal-search>
        </>
    )
}

export default SearchModal;