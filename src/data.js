export default 
{
    "clients": [
        {
            "id": 0,
            "name": {
                "first": "أحمد",
                "last": "نبيل"
            },
            "email": "ahmadnabil@gmail.com",
            "password": "nabil1",
            "age": 34,
            "city": "بور سعيد",
            "profile_picture_url": "",
            "favorites_id": [4,2],
            "blocked_id": [1]
        },
        {
            "id": 1,
            "name": {
                "first": "إبراهيم",
                "last": "عرابي"
            },
            "email": "ibrahimoraby@gmail.com",
            "password": "oraby1",
            "age": 28,
            "city": "مرسى مطروح",
            "profile_picture_url": "",
            "favorites_id": [3],
            "blocked_id": []
        },
        {
            "id": 2,
            "name": {
                "first": "عز الدين",
                "last": "قنديل"
            },
            "email": "ezzeldinkandeel@gmail.com",
            "password": "kandeel1",
            "age": 64,
            "city": "الغردقة",
            "profile_picture_url": "",
            "favorites_id": [],
            "blocked_id": [1,2,3,4]
        },
        {
            "id": 3,
            "name": {
                "first": "محمد",
                "last": "الشامي"
            },
            "email": "mohammadalshamy@gmail.com",
            "password": "alshamy1",
            "age": 40,
            "city": "مدينة نصر",
            "profile_picture_url": "",
            "favorites_id": [1,2],
            "blocked_id": [4]
        },
        {
            "id": 4,
            "name": {
                "first": "ميرنا",
                "last": "كتانة"
            },
            "email": "meranketana@gmail.com",
            "password": "ketana1",
            "age": 29,
            "city": "شلاتين",
            "profile_picture_url": "",
            "favorites_id": [0,1,2,3],
            "blocked_id": [4]
        }
    ],
    "workers": [
        {
            "id": 0,
            "name": {
                "first": "جيم",
                "last": "موريسون"
            },
            "email": "jimmorrison@gmail.com",
            "password": "morrison1",
            "profession": "نقاشة",
            "age": 27,
            "city": "المنوفية",
            "profile_picture_url": "",
            "bio": "",
            "reviews": [
                {
                    "client_id": 4,
                    "rating": 5,
                    "date": {
                        "year": 2018,
                        "month": 5,
                        "day": 5,
                        "hour": 5,
                        "minute": 5
                    },
                    "review_head": "إنه حقا نقاش رائع",
                    "review_body": "لقد أنجز الوظيفة على أكمل وجه، وفي وقت قياسي"
                }
            ],
            "projects": [
                {
                    "title": "أول وظيفة لي كحرفي مستقل",
                    "description": "بعدما أتممت أربعة سنوات من العمل كحرفي مسجل فى مكتب ’ذا دورز‘، وبعدما تعلمت الكثير من زملائي فى المكتب ومن رئيسي فى العمل، قررت أن أستقل وأبدأ عملي الخاص، ويسعدني للغاية أن أريكم أول وظيفة أتممها كحرفي مستقل. أنتظر آرائكم!",
                    "pictures_url": []
                }
            ],
            "blocked_id": []
        },
        {
            "id": 1,
            "name": {
                "first": "سمير",
                "last": "محمد"
            },
            "email": "samirmohammad@gmail.com",
            "password": "mohammad1",
            "profession": "سباكة",
            "age": 40,
            "city": "حلايب",
            "profile_picture_url": "",
            "bio": "",
            "reviews": [
                {
                    "client_id": 1,
                    "rating": 3,
                    "date": {
                        "year": 2008,
                        "month": 4,
                        "day": 1,
                        "hour": 14,
                        "minute": 57
                    },
                    "review_head": "تمكن من تصليح العطل ولكنه ترك الحمام فى حالة يرثى لها",
                    "review_body": "من رأيى أنه ينقصه بعض الخبرة، ولكنى واثق أنه سيكتسبها مع مرور والوقت وكثرة الوظائف. هو شخص مثابر تمكن من تصليح عطل صعب، ولكن على حساب الحوائط التي تم تكسيرها بالكامل."
                }
            ],
            "projects": [
                {
                    "title": "",
                    "description": "",
                    "pictures_url": []
                }
            ],
            "blocked_id": [4]
        },
        {
            "id": 2,
            "name": {
                "first": "سامح",
                "last": "العيدروس"
            },
            "email": "samehalaydaros@gmail.com",
            "password": "alaydaros1",
            "profession": "ميكانيكا سيارات",
            "age": 31,
            "city": "دمياط",
            "profile_picture_url": "",
            "bio": "",
            "reviews": [],
            "projects": [],
            "blocked_id": []
        },
        {
            "id": 3,
            "name": {
                "first": "عمرو",
                "last": "السولية"
            },
            "email": "amralsolia@gmail.com",
            "password": "alsolia1",
            "profession": "كهرباء",
            "age": 29,
            "city": "السويس",
            "profile_picture_url": "",
            "bio": "",
            "reviews": [],
            "projects": [],
            "blocked_id": []
        },
        {
            "id": 4,
            "name": {
                "first": "حسام",
                "last": "باولو"
            },
            "email": "hossampaulo@gmail.com",
            "password": "paulo1",
            "profession": "نجارة",
            "age": 38,
            "city": "الإسكندرية",
            "profile_picture_url": "",
            "bio": "",
            "reviews": [],
            "projects": [],
            "blocked_id": []
        }
    ],
    "conversations": [
        {
            "client_id": 0,
            "worker_id": 0
        },
        {
            "client_id": 0,
            "worker_id": 3
        },
        {
            "client_id": 1,
            "worker_id": 1
        },
        {
            "client_id": 1,
            "worker_id": 3
        },
        {
            "client_id": 1,
            "worker_id": 2
        },
        {
            "client_id": 2,
            "worker_id": 0
        },
        {
            "client_id": 2,
            "worker_id": 1
        },
        {
            "client_id": 3,
            "worker_id": 0
        },
        {
            "client_id": 3,
            "worker_id": 1
        }
    ],
    "professions": [
        {
            "arabic_name": "نجارة",
            "engish_name": "carpentry"
        },
        {
            "arabic_name": "نقاشة",
            "engish_name": "house-painting"
        },
        {
            "arabic_name": "ميكانيكا سيارات",
            "engish_name": "car-mechanics"
        },
        {
            "arabic_name": "سباكة",
            "engish_name": "plumbing"
        },
        {
            "arabic_name": "كهرباء",
            "engish_name": "electricity"
        },
        {
            "arabic_name": "تكييف وتبريد",
            "engish_name": "hvac"
        },
        {
            "arabic_name": "ألوميتال",
            "engish_name": "aluminum-frames"
        },
        {
            "arabic_name": "تركيب أرضيات",
            "engish_name": "flooring-installation"
        },
        {
            "arabic_name": "أنظمة دش",
            "engish_name": "satellite-dish"
        },
        {
            "arabic_name": "تصليح أدوات منزلية",
            "engish_name": "home-appliance-maintenance"
        },
        {
            "arabic_name": "نقل ورفع الموبيليا",
            "engish_name": "transport-and-lifting"
        },
        {
            "arabic_name": "قطر السيارات",
            "engish_name": "car-towing"
        },
        {
            "arabic_name": "سمكرة سيارات",
            "engish_name": "car-body-work"
        },
        {
            "arabic_name": "أنظمة صوت",
            "engish_name": "sound-systems"
        },
        {
            "arabic_name": "صناعات يدوية",
            "engish_name": "crafts"
        }
    ]

}