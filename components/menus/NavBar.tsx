import Logo from "../Logo";
import LogoImage from "@/public/img/logo.png";
import "@/styles/navigation.css";
import Menus from "../../data/mainMenuList";
import Icons from "../Icons";
import DrawerOpener from "../DrawerOpener";
import DrawerMenu from "../DrawerMenu";

import {
  LinkHeading, 
  ParentLink, 
  ChildLink, 
  LinkWithImg, 
  LinkWithDesc, 
  BottomMenuLink 
} from "./MenuLinks";

const NavBar = () => {
  return (
    <DrawerMenu>
      <nav className="header-nav drawer-menu">
        <div className="lg:hidden header-nav-headings">
          <Logo 
            src={LogoImage.src}
            width={189}
            height={32}
            url="/"
            cls="header-logo"
            alt="Consulo logo"
            ariaLabel="Consulo logo"
            loading="lazy"
          />
          <DrawerOpener
            cls="svg-wrapper menu-close"
            data-drawer=".drawer-menu"
          >
            <Icons.CloseCircle />
          </DrawerOpener>
        </div>
        <ul className="header-menu list-unstyled">
          {
            Menus?.map((link, index) => (
              <li className={`nav-item${link.megamenu || link.megamenutwocolumn ? ' nav-item-static': ''}`} key={`link-${index}`}>
                  <ParentLink 
                    title={link.title} 
                    path={link.path} 
                    dropdown={link.dropdown || link.megamenu || link.megamenutwocolumn ? true : false} 
                  />

                  {link.dropdown &&
                    <div className="header-submenu menu-absolute submenu-color">
                      <ul className="list-unstyled">
                        {link.dropdown.map((childlink, index) => (
                            <li className="nav-item" key={`childlink-${index}`}>
                              <ChildLink 
                                title={childlink.title} 
                                path={childlink.path} 
                                dropdown={childlink.dropdown ? true : false} 
                              />

                              {childlink.dropdown &&                                 
                                <div className="header-submenu menu-absolute submenu-color header-grandmenu">
                                    <ul className="list-unstyled">
                                      {childlink.dropdown.map((grandchildlink, index) => (
                                          <li className="nav-item" key={`grandchildlink-${index}`}>
                                            <ChildLink 
                                              title={grandchildlink.title} 
                                              path={grandchildlink.path} 
                                              dropdown={false} 
                                            />
                                          </li>
                                        ))
                                      }
                                    </ul>
                                  </div>
                                }                          
                            </li>
                          ))
                        }
                      </ul>
                    </div>
                  }

                  {link.megamenu &&             
                    <div className="header-submenu menu-absolute submenu-color header-megamenu">
                      <ul className="list-unstyled">
                        {link.megamenu.map((childlink, index) => (
                            <li className="nav-item" key={`megachild-${index}`}>
                              <LinkHeading 
                                title={childlink.heading} 
                                path={childlink.path}
                              />
                              {childlink.dropdown && 
                                <ul className="submenu-lists reset-submenu list-unstyled submenu-color">
                                  {childlink.dropdown.map((grandchildlink, index) => (
                                      <li className="nav-item" key={`megagrandchild-${index}`}>
                                        <ChildLink 
                                          title={grandchildlink.title} 
                                          path={grandchildlink.path}
                                          dropdown={false}
                                        />
                                      </li>
                                    ))
                                  }
                                </ul>
                              }
                            </li>
                          ))
                        }

                        {link.bottommenu &&
                          <li className="nav-item megamenu-links">
                            {link.bottommenu.map((link, index) => (
                              <BottomMenuLink 
                                title={link.title} 
                                path={link.path}
                                icon={link.icon}
                                key={`BottomMenu-${index}`}
                              />
                            ))}
                          </li>
                        }
                      </ul>
                    </div>
                  }

                  {link.megamenutwocolumn && 
                    <div className="header-submenu menu-absolute submenu-color header-megamenu">
                      <ul className="list-unstyled">                        
                        {link.megamenutwocolumn.map((childlink, index) =>(
                            <li className="nav-item" key={`megatwocol-${index}`}>
                              <LinkHeading 
                                title={childlink.title}
                                path={childlink.path}
                              />

                              {childlink.dropdown && 
                                <ul className="reset-submenu list-unstyled submenu-color">
                                  {childlink.dropdown.map((grandchildlink, index) => (
                                      <li className="nav-item" key={`megadesc-${index}`}>
                                        {grandchildlink.imageUrl != null ? (
                                          <LinkWithImg 
                                            imageUrl={grandchildlink.imageUrl}
                                            imageUrlMobile={grandchildlink.imageUrlMobile}
                                            title={grandchildlink.title}
                                            text={grandchildlink.text}
                                            path={grandchildlink.path}
                                            altText="Menu image"
                                            showbutton={true}
                                          />
                                        ) : (
                                          <LinkWithDesc 
                                            title={grandchildlink.title}
                                            text={grandchildlink.text}
                                            path={grandchildlink.path}
                                          />
                                        )}
                                      </li>
                                    ))
                                  }
                                </ul>
                              }
                            </li>
                          ))
                        }

                        {link.bottommenu &&
                          <li className="nav-item megamenu-links">
                            {link.bottommenu.map((link, index) => (
                              <BottomMenuLink 
                                title={link.title} 
                                path={link.path}
                                icon={link.icon}
                                key={`BottomMenu-${index}`}
                              />
                            ))}
                          </li>
                        }
                      </ul>
                    </div>
                  }
              </li>
            ))
          }
        </ul>
      </nav>
    </DrawerMenu>
  )
}

export default NavBar;