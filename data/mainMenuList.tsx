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
        title: 'Pages',
        path: '/projects',
        megamenu: [
            {
                heading: 'SERVICE PAGES',
                path: '/services',
                dropdown: [
                    {
                        title: 'Services',
                        path: '/services'
                    },
                    {
                        title: 'Service Details',
                        path: '/services/business-consulting'
                    },
                    {
                        title: 'Pricing Plan',
                        path: '/pricing-plan'
                    }
                ]
            },
            {
                heading: 'OTHER PAGES',
                path: '/projects',
                dropdown: [
                    {
                        title: 'About Us',
                        path: '/about-us'
                    },
                    {
                        title: 'Contact Us',
                        path: '/contact-us'
                    },
                    {
                        title: 'FAQ',
                        path: '/faq'
                    },
                    {
                        title: '404 Page',
                        path: '/not-found'
                    }
                ]
            },
            {
                heading: 'PROJECTS',
                path: '/projects',
                dropdown: [
                    {
                        title: 'Project List',
                        path: '/projects'
                    },
                    {
                        title: 'Project Details',
                        path: '/projects/business-development'
                    },
                    {
                        title: 'Our Team',
                        path: '/teams'
                    },
                    {
                        title: 'Team Details',
                        path: '/teams/ethan-reynolds'
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
        title: 'Contact',
        path: '/contact-us'
    }
]

export default Menus;