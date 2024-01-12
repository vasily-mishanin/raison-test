import { Contact } from './types'
import flagEgypt from './assets/images/flag-egypt.svg'
import flagUsa from './assets/images/flag-usa.svg'
import flagFrance from './assets/images/flag-france.svg'
import flagGreenland from './assets/images/flag-greenland.svg'
import flagJapan from './assets/images/flag-japan.svg'

export const contacts: Contact[] = [
    {
        title: 'Damietta',
        phone: '+20 0219033',
        email: 'alexbank@damietta.com',
        address: '3 Al Togari, Qism Damietta, Damietta, Damietta Governorate 34511, Egypt',
        flagImg: flagEgypt,
    },
    {
        title: 'Dayton',
        phone: '+1 937 226 1710',
        email: 'info@americaspackardmuseum.org',
        address: '420 S Ludlow St, Dayton, OH 45402, United States',
        flagImg: flagUsa,
    },
    {
        title: 'Lille',
        phone: '+33 3 20 54 44 50',
        email: 'theatre-sebastobol@lille.fr',
        address: 'Pl. Sébastopol, 59000 Lille, France',
        flagImg: flagFrance,
    },
    {
        title: 'Kulusuk',
        phone: '+299 98 69 88',
        email: 'info@mit.gl',
        address: 'HVF8+R82, Kulusuk, Greenland',
        flagImg: flagGreenland,
    },
    {
        title: 'Kanazawa',
        phone: '+81 76 220 2469',
        email: 'kanazawa@lg.jp',
        address: '1 Chome Higashiyama, Kanazawa, Ishikawa 920-0831, Japan',
        flagImg: flagJapan,
    },
]
