import Icons from "../components/Icons";
import { MenuItem } from "@/types/menu";

const Menus: MenuItem[] = [
    {
        title: 'Home',
        path: '/'
    },
    {
        title: 'About Us',
        path: '/about-us'
    },
    {
        title: 'Services',
        path: '/services',
        megamenutwocolumn: [
            {
                title: 'WHY CONSULO',
                path: '/about-us',
                dropdown: [
                    {
                        imageUrl: null,
                        imageUrlMobile: null,
                        title: 'Become a Partner',
                        text: 'Links customers with trusted Partners who help them realize greater value—faster—through Consulo.',
                        path: '/teams'
                    },
                    {
                        imageUrl: null,
                        imageUrlMobile: null,
                        title: 'Case Studies',
                        text: 'Hundreds of emerging brands thrive with Consulo. Discover their journeys.',
                        path: '/projects'
                    },
                    {
                        imageUrl: null,
                        imageUrlMobile: null,
                        title: 'Product Development',
                        text: 'Speed up innovation to enable quicker, effective team-driven product launches.',
                        path: '/projects/business-development'
                    }
                ]
            },
            {
                title: 'FEATURED CASE STUDY',
                path: '/projects',
                dropdown: [
                    {
                        imageUrl: '/img/menu/1.jpg',
                        imageUrlMobile: '/img/menu/575.jpg',
                        title: 'Consulo Subscriptions',
                        text: 'Hundreds of emerging brands thrive with Consulo. Discover their journeys.',
                        path: '/projects/business-development',
                        showbutton: true,
                    }
                ]
            }
        ],
        bottommenu: [
            {
                title: 'Contact Sales',
                path: '/contact-us',
                icon: <Icons.Contact />
            },
            {
                title: 'Watch Demo',
                path: '/projects/business-development',
                icon: <Icons.Video />
            },
            {
                title: 'Webinars',
                path: '/projects',
                icon: <Icons.Webinar />
            }
        ]
    },
    {
        title: 'Product',
        path: '/projects'
    },
    {
        title: 'Career',
        path: '/career'
    },
    {
        title: 'Contact',
        path: '/contact-us'
    }
]

export default Menus;