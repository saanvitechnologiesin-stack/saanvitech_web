interface MenuType {
  title: string;
  path: string;
}

export const QuickLink: MenuType[] = [
    {
        title: 'About Us',
        path: '/about-us'
    },
    {
        title: 'Our Team',
        path: '/teams'
    },
    {
        title: 'Pricing Plans',
        path: '/pricing-plan'
    },
    {
        title: 'Blogs',
        path: '/blogs'
    },
    {
        title: 'Contact Us',
        path: '/contact-us'
    }
];

export const Services: MenuType[] = [
    {
        title: 'UI/UX Design',
        path: '/projects'
    },
    {
        title: 'App Development',
        path: '/projects'
    },
    {
        title: 'Digital Marketing',
        path: '/services'
    },
    {
        title: 'Web Development',
        path: '/pricing-plan'
    },
    {
        title: 'Cyber Security',
        path: '/projects/business-development'
    }
];

export const Information: MenuType[] = [
    {
        title: 'Working Process',
        path: '/services'
    },
    {
        title: 'Privacy Policy',
        path: '/privacy-policy'
    },
    {
        title: 'Terms & Conditions',
        path: '/terms-condition'
    },
    {
        title: 'FAQ',
        path: '/faq'
    }
];

export const MenuContact: MenuType[] = [
    {
        title: 'consulo@yourcompany.com',
        path: 'mailto:consulo@yourcompany.com'
    },
    {
        title: '+1 (437) 555-0198',
        path: 'tel:+1 (437) 555-0198'
    },
    {
        title: '123 Maple Avenue, Toronto, ON M5H 2N2, Canada',
        path: '#'
    }
];

export const MenuPolicies: MenuType[] = [
    {
        title: 'Privacy Policy',
        path: '/privacy-policy'
    },
    {
        title: 'FAQ',
        path: '/faq'
    },
    {
        title: 'Contact',
        path: '/contact-us'
    }
];
