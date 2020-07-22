 
TABLESPACE pg_default;

ALTER TABLE public.covid_records
    OWNER to postgres;;


    CREATE TABLE public.my_visitors
(
    uuid character varying(50) COLLATE pg_catalog."default" NOT NULL,
    login character varying(50) COLLATE pg_catalog."default",
    firstname character varying(50) COLLATE pg_catalog."default",
    lastname character varying(50) COLLATE pg_catalog."default",
    registered boolean,

    id integer,
    date date,
    new_case integer,
    new_healed integer,
    new_deceased integer,
 	nb_sample integer,
 	sum_case integer,
 	sum_healed integer,
 	sum_deceased integer,
 	sum_sample integer,
 	active_case integer,
 	incidence_rate xxxxx,
 	remission_rate yyyyy,
 	letality_rate
 	CONSTRAINT covid_record_pkey PRIMARY KEY (id)

    created_on timestamp without time zone,

)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.my_visitors
    OWNER to postgres;  


 [{
 		"id": 0,
 		"date": "09/03/2020",
 		"new_case": 0,
 		"new_healed": 0,
 		"new_deceased": 0,
 		"sum_case": 0,
 		"sum_healed": 0,
 		"sum_deceased": 0,
 		"active_case": 0,
 		"nb_sample": 0,
 		"incidence": 0,
 		"remission": 0.000,
 		"letalite": 0.000,
 		"sum_sample": 0
 	},
 	{
 		"id": 0,
 		"date": "10/03/2020",
 		"new_case": 0,
 		"new_healed": 0,
 		"new_deceased": 0,
 		"sum_case": 0,
 		"sum_healed": 0,
 		"sum_deceased": 0,
 		"active_case": 0,
 		"nb_sample": 0,
 		"incidence": 0,
 		"remission": 0.000,
 		"letalite": 0.000,
 		"sum_sample": 0
 	},
 	{
 		"id": 1,
 		"date": "11/03/2020",
 		"new_case": 1,
 		"new_healed": 0,
 		"new_deceased": 0,
 		"sum_case": 1,
 		"sum_healed": 0,
 		"sum_deceased": 0,
 		"active_case": 1,
 		"nb_sample": 96,
 		"incidence": 0.010,
 		"remission": 0.000,
 		"letalite": 0.0000,
 		"sum_sample": 96
 	},
 	{
 		"id": 2,
 		"date": "12/03/2020",
 		"new_case": 0,
 		"new_healed": 0,
 		"new_deceased": 0,
 		"sum_case": 1,
 		"sum_healed": 0,
 		"sum_deceased": 0,
 		"active_case": 1,
 		"nb_sample": 96,
 		"incidence": 0.000,
 		"remission": 0.000,
 		"letalite": 0.0000,
 		"sum_sample": 192
 	},
 	{
 		"id": 3,
 		"date": "13/03/2020",
 		"new_case": 0,
 		"new_healed": 0,
 		"new_deceased": 0,
 		"sum_case": 1,
 		"sum_healed": 0,
 		"sum_deceased": 0,
 		"active_case": 1,
 		"nb_sample": 96,
 		"incidence": 0.000,
 		"remission": 0.000,
 		"letalite": 0.0000,
 		"sum_sample": 288
 	},
 	{
 		"id": 4,
 		"date": "14/03/2020",
 		"new_case": 3,
 		"new_healed": 0,
 		"new_deceased": 0,
 		"sum_case": 4,
 		"sum_healed": 0,
 		"sum_deceased": 0,
 		"active_case": 4,
 		"nb_sample": 96,
 		"incidence": 0.031,
 		"remission": 0.000,
 		"letalite": 0.0000,
 		"sum_sample": 384
 	},
 	{
 		"id": 5,
 		"date": "15/03/2020",
 		"new_case": 0,
 		"new_healed": 0,
 		"new_deceased": 0,
 		"sum_case": 4,
 		"sum_healed": 0,
 		"sum_deceased": 0,
 		"active_case": 4,
 		"nb_sample": 96,
 		"incidence": 0.000,
 		"remission": 0.000,
 		"letalite": 0.0000,
 		"sum_sample": 480
 	},
 	{
 		"id": 6,
 		"date": "16/03/2020",
 		"new_case": 2,
 		"new_healed": 1,
 		"new_deceased": 0,
 		"sum_case": 6,
 		"sum_healed": 1,
 		"sum_deceased": 0,
 		"active_case": 5,
 		"nb_sample": 96,
 		"incidence": 0.021,
 		"remission": 0.167,
 		"letalite": 0.0000,
 		"sum_sample": 576
 	},
 	{
 		"id": 7,
 		"date": "17/03/2020",
 		"new_case": 0,
 		"new_healed": 0,
 		"new_deceased": 0,
 		"sum_case": 6,
 		"sum_healed": 1,
 		"sum_deceased": 0,
 		"active_case": 5,
 		"nb_sample": 96,
 		"incidence": 0.000,
 		"remission": 0.167,
 		"letalite": 0.0000,
 		"sum_sample": 672
 	},
 	{
 		"id": 8,
 		"date": "18/03/2020",
 		"new_case": 3,
 		"new_healed": 0,
 		"new_deceased": 0,
 		"sum_case": 9,
 		"sum_healed": 1,
 		"sum_deceased": 0,
 		"active_case": 8,
 		"nb_sample": 96,
 		"incidence": 0.031,
 		"remission": 0.111,
 		"letalite": 0.0000,
 		"sum_sample": 768
 	},
 	{
 		"id": 9,
 		"date": "19/03/2020",
 		"new_case": 0,
 		"new_healed": 0,
 		"new_deceased": 0,
 		"sum_case": 9,
 		"sum_healed": 1,
 		"sum_deceased": 0,
 		"active_case": 8,
 		"nb_sample": 96,
 		"incidence": 0.000,
 		"remission": 0.111,
 		"letalite": 0.0000,
 		"sum_sample": 864
 	},
 	{
 		"id": 10,
 		"date": "20/03/2020",
 		"new_case": 5,
 		"new_healed": 0,
 		"new_deceased": 0,
 		"sum_case": 14,
 		"sum_healed": 1,
 		"sum_deceased": 0,
 		"active_case": 13,
 		"nb_sample": 96,
 		"incidence": 0.052,
 		"remission": 0.071,
 		"letalite": 0.0000,
 		"sum_sample": 960
 	},
 	{
 		"id": 11,
 		"date": "21/03/2020",
 		"new_case": 3,
 		"new_healed": 0,
 		"new_deceased": 0,
 		"sum_case": 17,
 		"sum_healed": 1,
 		"sum_deceased": 0,
 		"active_case": 16,
 		"nb_sample": 96,
 		"incidence": 0.031,
 		"remission": 0.059,
 		"letalite": 0.0000,
 		"sum_sample": 1056
 	},
 	{
 		"id": 12,
 		"date": "22/03/2020",
 		"new_case": 8,
 		"new_healed": 1,
 		"new_deceased": 0,
 		"sum_case": 25,
 		"sum_healed": 2,
 		"sum_deceased": 0,
 		"active_case": 23,
 		"nb_sample": 96,
 		"incidence": 0.083,
 		"remission": 0.080,
 		"letalite": 0.0000,
 		"sum_sample": 1152
 	},
 	{
 		"id": 13,
 		"date": "23/03/2020",
 		"new_case": 0,
 		"new_healed": 0,
 		"new_deceased": 0,
 		"sum_case": 25,
 		"sum_healed": 2,
 		"sum_deceased": 0,
 		"active_case": 23,
 		"nb_sample": 96,
 		"incidence": 0.000,
 		"remission": 0.080,
 		"letalite": 0.0000,
 		"sum_sample": 1248
 	},
 	{
 		"id": 14,
 		"date": "24/03/2020",
 		"new_case": 48,
 		"new_healed": 1,
 		"new_deceased": 0,
 		"sum_case": 73,
 		"sum_healed": 3,
 		"sum_deceased": 0,
 		"active_case": 70,
 		"nb_sample": 96,
 		"incidence": 0.500,
 		"remission": 0.041,
 		"letalite": 0.0000,
 		"sum_sample": 1344
 	},
 	{
 		"id": 15,
 		"date": "25/03/2020",
 		"new_case": 7,
 		"new_healed": 0,
 		"new_deceased": 0,
 		"sum_case": 80,
 		"sum_healed": 3,
 		"sum_deceased": 0,
 		"active_case": 77,
 		"nb_sample": 96,
 		"incidence": 0.073,
 		"remission": 0.038,
 		"letalite": 0.0000,
 		"sum_sample": 1440
 	},
 	{
 		"id": 16,
 		"date": "26/03/2020",
 		"new_case": 16,
 		"new_healed": 0,
 		"new_deceased": 0,
 		"sum_case": 96,
 		"sum_healed": 3,
 		"sum_deceased": 0,
 		"active_case": 93,
 		"nb_sample": 96,
 		"incidence": 0.167,
 		"remission": 0.031,
 		"letalite": 0.0000,
 		"sum_sample": 1536
 	},
 	{
 		"id": 17,
 		"date": "27/03/2020",
 		"new_case": 5,
 		"new_healed": 0,
 		"new_deceased": 0,
 		"sum_case": 101,
 		"sum_healed": 3,
 		"sum_deceased": 0,
 		"active_case": 98,
 		"nb_sample": 96,
 		"incidence": 0.052,
 		"remission": 0.030,
 		"letalite": 0.0000,
 		"sum_sample": 1632
 	},
 	{
 		"id": 18,
 		"date": "28/03/2020",
 		"new_case": 39,
 		"new_healed": 0,
 		"new_deceased": 0,
 		"sum_case": 140,
 		"sum_healed": 3,
 		"sum_deceased": 0,
 		"active_case": 137,
 		"nb_sample": 96,
 		"incidence": 0.406,
 		"remission": 0.021,
 		"letalite": 0.0000,
 		"sum_sample": 1728
 	},
 	{
 		"id": 19,
 		"date": "29/03/2020",
 		"new_case": 25,
 		"new_healed": 1,
 		"new_deceased": 1,
 		"sum_case": 165,
 		"sum_healed": 4,
 		"sum_deceased": 1,
 		"active_case": 160,
 		"nb_sample": 96,
 		"incidence": 0.260,
 		"remission": 0.024,
 		"letalite": 0.0061,
 		"sum_sample": 1824
 	},
 	{
 		"id": 20,
 		"date": "30/03/2020",
 		"new_case": 3,
 		"new_healed": 2,
 		"new_deceased": 0,
 		"sum_case": 168,
 		"sum_healed": 6,
 		"sum_deceased": 1,
 		"active_case": 161,
 		"nb_sample": 97,
 		"incidence": 0.031,
 		"remission": 0.036,
 		"letalite": 0.0060,
 		"sum_sample": 1921
 	},
 	{
 		"id": 21,
 		"date": "31/03/2020",
 		"new_case": 11,
 		"new_healed": 1,
 		"new_deceased": 0,
 		"sum_case": 179,
 		"sum_healed": 7,
 		"sum_deceased": 1,
 		"active_case": 171,
 		"nb_sample": 97,
 		"incidence": 0.113,
 		"remission": 0.039,
 		"letalite": 0.0056,
 		"sum_sample": 2018
 	},
 	{
 		"id": 22,
 		"date": "01/04/2020",
 		"new_case": 11,
 		"new_healed": 2,
 		"new_deceased": 0,
 		"sum_case": 190,
 		"sum_healed": 9,
 		"sum_deceased": 1,
 		"active_case": 180,
 		"nb_sample": 97,
 		"incidence": 0.113,
 		"remission": 0.047,
 		"letalite": 0.0053,
 		"sum_sample": 2115
 	},
 	{
 		"id": 23,
 		"date": "02/04/2020",
 		"new_case": 4,
 		"new_healed": 6,
 		"new_deceased": 0,
 		"sum_case": 194,
 		"sum_healed": 15,
 		"sum_deceased": 1,
 		"active_case": 178,
 		"nb_sample": 81,
 		"incidence": 0.049,
 		"remission": 0.077,
 		"letalite": 0.0052,
 		"sum_sample": 2196
 	},
 	{
 		"id": 24,
 		"date": "03/04/2020",
 		"new_case": 24,
 		"new_healed": 4,
 		"new_deceased": 0,
 		"sum_case": 218,
 		"sum_healed": 19,
 		"sum_deceased": 1,
 		"active_case": 198,
 		"nb_sample": 226,
 		"incidence": 0.106,
 		"remission": 0.087,
 		"letalite": 0.0046,
 		"sum_sample": 2422
 	},
 	{
 		"id": 25,
 		"date": "04/04/2020",
 		"new_case": 27,
 		"new_healed": 6,
 		"new_deceased": 0,
 		"sum_case": 245,
 		"sum_healed": 25,
 		"sum_deceased": 1,
 		"active_case": 219,
 		"nb_sample": 96,
 		"incidence": 0.281,
 		"remission": 0.102,
 		"letalite": 0.0041,
 		"sum_sample": 2518
 	},
 	{
 		"id": 26,
 		"date": "05/04/2020",
 		"new_case": 16,
 		"new_healed": 12,
 		"new_deceased": 2,
 		"sum_case": 261,
 		"sum_healed": 37,
 		"sum_deceased": 3,
 		"active_case": 221,
 		"nb_sample": 96,
 		"incidence": 0.167,
 		"remission": 0.142,
 		"letalite": 0.0115,
 		"sum_sample": 2614
 	},
 	{
 		"id": 27,
 		"date": "06/04/2020",
 		"new_case": 62,
 		"new_healed": 4,
 		"new_deceased": 0,
 		"sum_case": 323,
 		"sum_healed": 41,
 		"sum_deceased": 3,
 		"active_case": 279,
 		"nb_sample": 96,
 		"incidence": 0.646,
 		"remission": 0.127,
 		"letalite": 0.0093,
 		"sum_sample": 2710
 	},
 	{
 		"id": 28,
 		"date": "07/04/2020",
 		"new_case": 26,
 		"new_healed": 0,
 		"new_deceased": 0,
 		"sum_case": 349,
 		"sum_healed": 41,
 		"sum_deceased": 3,
 		"active_case": 305,
 		"nb_sample": 96,
 		"incidence": 0.271,
 		"remission": 0.117,
 		"letalite": 0.0086,
 		"sum_sample": 2806
 	},
 	{
 		"id": 29,
 		"date": "08/04/2020",
 		"new_case": 35,
 		"new_healed": 7,
 		"new_deceased": 0,
 		"sum_case": 384,
 		"sum_healed": 48,
 		"sum_deceased": 3,
 		"active_case": 333,
 		"nb_sample": 125,
 		"incidence": 0.280,
 		"remission": 0.125,
 		"letalite": 0.0078,
 		"sum_sample": 2931
 	},
 	{
 		"id": 30,
 		"date": "09/04/2020",
 		"new_case": 60,
 		"new_healed": 4,
 		"new_deceased": 0,
 		"sum_case": 444,
 		"sum_healed": 52,
 		"sum_deceased": 3,
 		"active_case": 389,
 		"nb_sample": 247,
 		"incidence": 0.243,
 		"remission": 0.117,
 		"letalite": 0.0068,
 		"sum_sample": 3178
 	},
 	{
 		"id": 31,
 		"date": "10/04/2020",
 		"new_case": 36,
 		"new_healed": 2,
 		"new_deceased": 0,
 		"sum_case": 480,
 		"sum_healed": 54,
 		"sum_deceased": 3,
 		"active_case": 423,
 		"nb_sample": 192,
 		"incidence": 0.188,
 		"remission": 0.113,
 		"letalite": 0.0063,
 		"sum_sample": 3370
 	},
 	{
 		"id": 32,
 		"date": "11/04/2020",
 		"new_case": 53,
 		"new_healed": 4,
 		"new_deceased": 1,
 		"sum_case": 533,
 		"sum_healed": 58,
 		"sum_deceased": 4,
 		"active_case": 471,
 		"nb_sample": 96,
 		"incidence": 0.552,
 		"remission": 0.109,
 		"letalite": 0.0075,
 		"sum_sample": 3466
 	},
 	{
 		"id": 33,
 		"date": "12/04/2020",
 		"new_case": 41,
 		"new_healed": 27,
 		"new_deceased": 1,
 		"sum_case": 574,
 		"sum_healed": 85,
 		"sum_deceased": 5,
 		"active_case": 484,
 		"nb_sample": 96,
 		"incidence": 0.427,
 		"remission": 0.148,
 		"letalite": 0.0087,
 		"sum_sample": 3562
 	},
 	{
 		"id": 34,
 		"date": "13/04/2020",
 		"new_case": 52,
 		"new_healed": 4,
 		"new_deceased": 1,
 		"sum_case": 626,
 		"sum_healed": 89,
 		"sum_deceased": 6,
 		"active_case": 531,
 		"nb_sample": 96,
 		"incidence": 0.542,
 		"remission": 0.142,
 		"letalite": 0.0096,
 		"sum_sample": 3658
 	},
 	{
 		"id": 35,
 		"date": "14/04/2020",
 		"new_case": 12,
 		"new_healed": 25,
 		"new_deceased": 0,
 		"sum_case": 638,
 		"sum_healed": 114,
 		"sum_deceased": 6,
 		"active_case": 518,
 		"nb_sample": 129,
 		"incidence": 0.093,
 		"remission": 0.179,
 		"letalite": 0.0094,
 		"sum_sample": 3787
 	},
 	{
 		"id": 36,
 		"date": "15/04/2020",
 		"new_case": 16,
 		"new_healed": 32,
 		"new_deceased": 0,
 		"sum_case": 654,
 		"sum_healed": 146,
 		"sum_deceased": 6,
 		"active_case": 502,
 		"nb_sample": 238,
 		"incidence": 0.067,
 		"remission": 0.223,
 		"letalite": 0.0092,
 		"sum_sample": 4025
 	},
 	{
 		"id": 37,
 		"date": "16/04/2020",
 		"new_case": 34,
 		"new_healed": 47,
 		"new_deceased": 0,
 		"sum_case": 688,
 		"sum_healed": 193,
 		"sum_deceased": 6,
 		"active_case": 489,
 		"nb_sample": 298,
 		"incidence": 0.114,
 		"remission": 0.281,
 		"letalite": 0.0087,
 		"sum_sample": 4323
 	},
 	{
 		"id": 38,
 		"date": "17/04/2020",
 		"new_case": 54,
 		"new_healed": 27,
 		"new_deceased": 0,
 		"sum_case": 742,
 		"sum_healed": 220,
 		"sum_deceased": 6,
 		"active_case": 516,
 		"nb_sample": 296,
 		"incidence": 0.182,
 		"remission": 0.296,
 		"letalite": 0.0081,
 		"sum_sample": 4619
 	},
 	{
 		"id": 39,
 		"date": "18/04/2020",
 		"new_case": 59,
 		"new_healed": 19,
 		"new_deceased": 2,
 		"sum_case": 801,
 		"sum_healed": 239,
 		"sum_deceased": 8,
 		"active_case": 554,
 		"nb_sample": 361,
 		"incidence": 0.163,
 		"remission": 0.298,
 		"letalite": 0.0100,
 		"sum_sample": 4980
 	},
 	{
 		"id": 40,
 		"date": "19/04/2020",
 		"new_case": 46,
 		"new_healed": 21,
 		"new_deceased": 1,
 		"sum_case": 847,
 		"sum_healed": 260,
 		"sum_deceased": 9,
 		"active_case": 578,
 		"nb_sample": 399,
 		"incidence": 0.115,
 		"remission": 0.307,
 		"letalite": 0.0106,
 		"sum_sample": 5379
 	},
 	{
 		"id": 41,
 		"date": "20/04/2020",
 		"new_case": 32,
 		"new_healed": 27,
 		"new_deceased": 1,
 		"sum_case": 879,
 		"sum_healed": 287,
 		"sum_deceased": 10,
 		"active_case": 582,
 		"nb_sample": 351,
 		"incidence": 0.091,
 		"remission": 0.327,
 		"letalite": 0.0114,
 		"sum_sample": 5730
 	},
 	{
 		"id": 42,
 		"date": "21/04/2020",
 		"new_case": 37,
 		"new_healed": 16,
 		"new_deceased": 3,
 		"sum_case": 916,
 		"sum_healed": 303,
 		"sum_deceased": 13,
 		"active_case": 600,
 		"nb_sample": 270,
 		"incidence": 0.137,
 		"remission": 0.331,
 		"letalite": 0.0142,
 		"sum_sample": 6000
 	},
 	{
 		"id": 43,
 		"date": "22/04/2020",
 		"new_case": 36,
 		"new_healed": 7,
 		"new_deceased": 1,
 		"sum_case": 952,
 		"sum_healed": 310,
 		"sum_deceased": 14,
 		"active_case": 628,
 		"nb_sample": 342,
 		"incidence": 0.105,
 		"remission": 0.326,
 		"letalite": 0.0147,
 		"sum_sample": 6342
 	},
 	{
 		"id": 44,
 		"date": "23/04/2020",
 		"new_case": 52,
 		"new_healed": 49,
 		"new_deceased": 0,
 		"sum_case": 1004,
 		"sum_healed": 359,
 		"sum_deceased": 14,
 		"active_case": 631,
 		"nb_sample": 504,
 		"incidence": 0.103,
 		"remission": 0.358,
 		"letalite": 0.0139,
 		"sum_sample": 6846
 	},
 	{
 		"id": 45,
 		"date": "24/04/2020",
 		"new_case": 73,
 		"new_healed": 60,
 		"new_deceased": 0,
 		"sum_case": 1077,
 		"sum_healed": 419,
 		"sum_deceased": 14,
 		"active_case": 644,
 		"nb_sample": 584,
 		"incidence": 0.125,
 		"remission": 0.389,
 		"letalite": 0.0130,
 		"sum_sample": 7430
 	},
 	{
 		"id": 46,
 		"date": "25/04/2020",
 		"new_case": 34,
 		"new_healed": 30,
 		"new_deceased": 0,
 		"sum_case": 1111,
 		"sum_healed": 449,
 		"sum_deceased": 14,
 		"active_case": 648,
 		"nb_sample": 302,
 		"incidence": 0.113,
 		"remission": 0.404,
 		"letalite": 0.0126,
 		"sum_sample": 7732
 	},
 	{
 		"id": 47,
 		"date": "26/04/2020",
 		"new_case": 39,
 		"new_healed": 19,
 		"new_deceased": 0,
 		"sum_case": 1150,
 		"sum_healed": 468,
 		"sum_deceased": 14,
 		"active_case": 668,
 		"nb_sample": 560,
 		"incidence": 0.070,
 		"remission": 0.407,
 		"letalite": 0.0122,
 		"sum_sample": 8292
 	},
 	{
 		"id": 48,
 		"date": "27/04/2020",
 		"new_case": 14,
 		"new_healed": 31,
 		"new_deceased": 0,
 		"sum_case": 1164,
 		"sum_healed": 487,
 		"sum_deceased": 14,
 		"active_case": 651,
 		"nb_sample": 289,
 		"incidence": 0.048,
 		"remission": 0.429,
 		"letalite": 0.0120,
 		"sum_sample": 8581
 	},
 	{
 		"id": 49,
 		"date": "28/04/2020",
 		"new_case": 19,
 		"new_healed": 26,
 		"new_deceased": 0,
 		"sum_case": 1183,
 		"sum_healed": 525,
 		"sum_deceased": 14,
 		"active_case": 644,
 		"nb_sample": 179,
 		"incidence": 0.106,
 		"remission": 0.444,
 		"letalite": 0.0118,
 		"sum_sample": 8760
 	},
 	{
 		"id": 50,
 		"date": "29/04/2020",
 		"new_case": 55,
 		"new_healed": 32,
 		"new_deceased": 0,
 		"sum_case": 1238,
 		"sum_healed": 557,
 		"sum_deceased": 14,
 		"active_case": 667,
 		"nb_sample": 512,
 		"incidence": 0.107,
 		"remission": 0.450,
 		"letalite": 0.0113,
 		"sum_sample": 9272
 	},
 	{
 		"id": 51,
 		"date": "30/04/2020",
 		"new_case": 37,
 		"new_healed": 17,
 		"new_deceased": 0,
 		"sum_case": 1275,
 		"sum_healed": 574,
 		"sum_deceased": 14,
 		"active_case": 687,
 		"nb_sample": 385,
 		"incidence": 0.096,
 		"remission": 0.450,
 		"letalite": 0.0110,
 		"sum_sample": 9657
 	},
 	{
 		"id": 52,
 		"date": "01/05/2020",
 		"new_case": 58,
 		"new_healed": 23,
 		"new_deceased": 1,
 		"sum_case": 1333,
 		"sum_healed": 597,
 		"sum_deceased": 15,
 		"active_case": 721,
 		"nb_sample": 416,
 		"incidence": 0.139,
 		"remission": 0.448,
 		"letalite": 0.0113,
 		"sum_sample": 10073
 	},
 	{
 		"id": 53,
 		"date": "02/05/2020",
 		"new_case": 29,
 		"new_healed": 25,
 		"new_deceased": 0,
 		"sum_case": 1362,
 		"sum_healed": 622,
 		"sum_deceased": 15,
 		"active_case": 725,
 		"nb_sample": 435,
 		"incidence": 0.067,
 		"remission": 0.457,
 		"letalite": 0.0110,
 		"sum_sample": 10508
 	},
 	{
 		"id": 54,
 		"date": "03/05/2020",
 		"new_case": 36,
 		"new_healed": 31,
 		"new_deceased": 2,
 		"sum_case": 1398,
 		"sum_healed": 653,
 		"sum_deceased": 17,
 		"active_case": 728,
 		"nb_sample": 288,
 		"incidence": 0.125,
 		"remission": 0.467,
 		"letalite": 0.0122,
 		"sum_sample": 10796
 	},
 	{
 		"id": 55,
 		"date": "04/05/2020",
 		"new_case": 34,
 		"new_healed": 40,
 		"new_deceased": 0,
 		"sum_case": 1432,
 		"sum_healed": 693,
 		"sum_deceased": 17,
 		"active_case": 722,
 		"nb_sample": 482,
 		"incidence": 0.071,
 		"remission": 0.484,
 		"letalite": 0.0119,
 		"sum_sample": 11278
 	},
 	{
 		"id": 56,
 		"date": "05/05/2020",
 		"new_case": 32,
 		"new_healed": 8,
 		"new_deceased": 1,
 		"sum_case": 1432,
 		"sum_healed": 701,
 		"sum_deceased": 18,
 		"active_case": 745,
 		"nb_sample": 170,
 		"incidence": 0.188,
 		"remission": 0.479,
 		"letalite": 0.0123,
 		"sum_sample": 11448
 	},
 	{
 		"id": 57,
 		"date": "06/05/2020",
 		"new_case": 52,
 		"new_healed": 20,
 		"new_deceased": 0,
 		"sum_case": 1516,
 		"sum_healed": 721,
 		"sum_deceased": 18,
 		"active_case": 777,
 		"nb_sample": 497,
 		"incidence": 0.105,
 		"remission": 0.476,
 		"letalite": 0.0119,
 		"sum_sample": 11945
 	},
 	{
 		"id": 58,
 		"date": "07/05/2020",
 		"new_case": 55,
 		"new_healed": 21,
 		"new_deceased": 2,
 		"sum_case": 1571,
 		"sum_healed": 742,
 		"sum_deceased": 20,
 		"active_case": 809,
 		"nb_sample": 367,
 		"incidence": 0.150,
 		"remission": 0.472,
 		"letalite": 0.0127,
 		"sum_sample": 12312
 	},
 	{
 		"id": 59,
 		"date": "08/05/2020",
 		"new_case": 31,
 		"new_healed": 12,
 		"new_deceased": 0,
 		"sum_case": 1602,
 		"sum_healed": 754,
 		"sum_deceased": 20,
 		"active_case": 828,
 		"nb_sample": 456,
 		"incidence": 0.068,
 		"remission": 0.471,
 		"letalite": 0.0125,
 		"sum_sample": 12768
 	},
 	{
 		"id": 60,
 		"date": "09/05/2020",
 		"new_case": 65,
 		"new_healed": 15,
 		"new_deceased": 1,
 		"sum_case": 1667,
 		"sum_healed": 769,
 		"sum_deceased": 21,
 		"active_case": 877,
 		"nb_sample": 573,
 		"incidence": 0.113,
 		"remission": 0.461,
 		"letalite": 0.0126,
 		"sum_sample": 13341
 	},
 	{
 		"id": 61,
 		"date": "10/05/2020",
 		"new_case": 33,
 		"new_healed": 25,
 		"new_deceased": 0,
 		"sum_case": 1700,
 		"sum_healed": 794,
 		"sum_deceased": 21,
 		"active_case": 885,
 		"nb_sample": 322,
 		"incidence": 0.102,
 		"remission": 0.467,
 		"letalite": 0.0124,
 		"sum_sample": 13663
 	},
 	{
 		"id": 62,
 		"date": "11/05/2020",
 		"new_case": 30,
 		"new_healed": 24,
 		"new_deceased": 0,
 		"sum_case": 1730,
 		"sum_healed": 818,
 		"sum_deceased": 21,
 		"active_case": 891,
 		"nb_sample": 499,
 		"incidence": 0.060,
 		"remission": 0.473,
 		"letalite": 0.0121,
 		"sum_sample": 14162
 	},
 	{
 		"id": 63,
 		"date": "12/05/2020",
 		"new_case": 127,
 		"new_healed": 2,
 		"new_deceased": 0,
 		"sum_case": 1857,
 		"sum_healed": 820,
 		"sum_deceased": 21,
 		"active_case": 1016,
 		"nb_sample": 506,
 		"incidence": 0.251,
 		"remission": 0.442,
 		"letalite": 0.0113,
 		"sum_sample": 14668
 	},
 	{
 		"id": 64,
 		"date": "13/05/2020",
 		"new_case": 55,
 		"new_healed": 82,
 		"new_deceased": 3,
 		"sum_case": 1912,
 		"sum_healed": 902,
 		"sum_deceased": 24,
 		"active_case": 986,
 		"nb_sample": 592,
 		"incidence": 0.093,
 		"remission": 0.472,
 		"letalite": 0.0126,
 		"sum_sample": 15260
 	},
 	{
 		"id": 65,
 		"date": "14/05/2020",
 		"new_case": 59,
 		"new_healed": 28,
 		"new_deceased": 0,
 		"sum_case": 1971,
 		"sum_healed": 930,
 		"sum_deceased": 24,
 		"active_case": 1017,
 		"nb_sample": 680,
 		"incidence": 0.087,
 		"remission": 0.472,
 		"letalite": 0.0122,
 		"sum_sample": 15940
 	},
 	{
 		"id": 66,
 		"date": "15/05/2020",
 		"new_case": 46,
 		"new_healed": 12,
 		"new_deceased": 0,
 		"sum_case": 2017,
 		"sum_healed": 942,
 		"sum_deceased": 24,
 		"active_case": 1051,
 		"nb_sample": 728,
 		"incidence": 0.063,
 		"remission": 0.467,
 		"letalite": 0.0119,
 		"sum_sample": 16668
 	},
 	{
 		"id": 67,
 		"date": "16/05/2020",
 		"new_case": 44,
 		"new_healed": 45,
 		"new_deceased": 1,
 		"sum_case": 2061,
 		"sum_healed": 987,
 		"sum_deceased": 25,
 		"active_case": 1049,
 		"nb_sample": 845,
 		"incidence": 0.052,
 		"remission": 0.479,
 		"letalite": 0.0121,
 		"sum_sample": 17513
 	},
 	{
 		"id": 68,
 		"date": "17/05/2020",
 		"new_case": 48,
 		"new_healed": 17,
 		"new_deceased": 2,
 		"sum_case": 2109,
 		"sum_healed": 1004,
 		"sum_deceased": 27,
 		"active_case": 1078,
 		"nb_sample": 790,
 		"incidence": 0.061,
 		"remission": 0.476,
 		"letalite": 0.0128,
 		"sum_sample": 18303
 	},
 	{
 		"id": 69,
 		"date": "18/05/2020",
 		"new_case": 10,
 		"new_healed": 36,
 		"new_deceased": 1,
 		"sum_case": 2119,
 		"sum_healed": 1040,
 		"sum_deceased": 28,
 		"active_case": 1051,
 		"nb_sample": 305,
 		"incidence": 0.033,
 		"remission": 0.491,
 		"letalite": 0.0132,
 		"sum_sample": 18608
 	},
 	{
 		"id": 70,
 		"date": "19/05/2020",
 		"new_case": 34,
 		"new_healed": 10,
 		"new_deceased": 0,
 		"sum_case": 2153,
 		"sum_healed": 1050,
 		"sum_deceased": 28,
 		"active_case": 1075,
 		"nb_sample": 566,
 		"incidence": 0.060,
 		"remission": 0.488,
 		"letalite": 0.0130,
 		"sum_sample": 19174
 	},
 	{
 		"id": 71,
 		"date": "20/05/2020",
 		"new_case": 78,
 		"new_healed": 33,
 		"new_deceased": 1,
 		"sum_case": 2231,
 		"sum_healed": 1083,
 		"sum_deceased": 29,
 		"active_case": 1119,
 		"nb_sample": 840,
 		"incidence": 0.093,
 		"remission": 0.485,
 		"letalite": 0.0130,
 		"sum_sample": 20014
 	},
 	{
 		"id": 72,
 		"date": "21/05/2020",
 		"new_case": 70,
 		"new_healed": 17,
 		"new_deceased": 0,
 		"sum_case": 2301,
 		"sum_healed": 1100,
 		"sum_deceased": 29,
 		"active_case": 1172,
 		"nb_sample": 1055,
 		"incidence": 0.066,
 		"remission": 0.478,
 		"letalite": 0.0126,
 		"sum_sample": 21069
 	},
 	{
 		"id": 73,
 		"date": "22/05/2020",
 		"new_case": 40,
 		"new_healed": 46,
 		"new_deceased": 0,
 		"sum_case": 2341,
 		"sum_healed": 1146,
 		"sum_deceased": 29,
 		"active_case": 1166,
 		"nb_sample": 1164,
 		"incidence": 0.034,
 		"remission": 0.490,
 		"letalite": 0.0124,
 		"sum_sample": 22233
 	},
 	{
 		"id": 74,
 		"date": "23/05/2020",
 		"new_case": 25,
 		"new_healed": 42,
 		"new_deceased": 1,
 		"sum_case": 2366,
 		"sum_healed": 1188,
 		"sum_deceased": 30,
 		"active_case": 1148,
 		"nb_sample": 727,
 		"incidence": 0.034,
 		"remission": 0.502,
 		"letalite": 0.0127,
 		"sum_sample": 22960
 	},
 	{
 		"id": 75,
 		"date": "24/05/2020",
 		"new_case": 10,
 		"new_healed": 31,
 		"new_deceased": 0,
 		"sum_case": 2376,
 		"sum_healed": 1219,
 		"sum_deceased": 30,
 		"active_case": 1127,
 		"nb_sample": 484,
 		"incidence": 0.021,
 		"remission": 0.513,
 		"letalite": 0.0126,
 		"sum_sample": 23444
 	},
 	{
 		"id": 76,
 		"date": "25/05/2020",
 		"new_case": 47,
 		"new_healed": 38,
 		"new_deceased": 0,
 		"sum_case": 2423,
 		"sum_healed": 1257,
 		"sum_deceased": 30,
 		"active_case": 1136,
 		"nb_sample": 873,
 		"incidence": 0.054,
 		"remission": 0.519,
 		"letalite": 0.0124,
 		"sum_sample": 24317
 	},
 	{
 		"id": 77,
 		"date": "26/05/2020",
 		"new_case": 54,
 		"new_healed": 29,
 		"new_deceased": 0,
 		"sum_case": 2477,
 		"sum_healed": 1286,
 		"sum_deceased": 30,
 		"active_case": 1161,
 		"nb_sample": 782,
 		"incidence": 0.069,
 		"remission": 0.519,
 		"letalite": 0.0121,
 		"sum_sample": 25099
 	},
 	{
 		"id": 78,
 		"date": "27/05/2020",
 		"new_case": 79,
 		"new_healed": 16,
 		"new_deceased": 1,
 		"sum_case": 2556,
 		"sum_healed": 1302,
 		"sum_deceased": 31,
 		"active_case": 1223,
 		"nb_sample": 425,
 		"incidence": 0.186,
 		"remission": 0.509,
 		"letalite": 0.0121,
 		"sum_sample": 25524
 	},
 	{
 		"id": 79,
 		"date": "28/05/2020",
 		"new_case": 85,
 		"new_healed": 24,
 		"new_deceased": 1,
 		"sum_case": 2641,
 		"sum_healed": 1326,
 		"sum_deceased": 32,
 		"active_case": 1283,
 		"nb_sample": 497,
 		"incidence": 0.171,
 		"remission": 0.502,
 		"letalite": 0.0121,
 		"sum_sample": 26021
 	},
 	{
 		"id": 80,
 		"date": "29/05/2020",
 		"new_case": 109,
 		"new_healed": 44,
 		"new_deceased": 0,
 		"sum_case": 2750,
 		"sum_healed": 1370,
 		"sum_deceased": 32,
 		"active_case": 1348,
 		"nb_sample": 527,
 		"incidence": 0.207,
 		"remission": 0.498,
 		"letalite": 0.0116,
 		"sum_sample": 26548
 	},
 	{
 		"id": 81,
 		"date": "30/05/2020",
 		"new_case": 49,
 		"new_healed": 15,
 		"new_deceased": 1,
 		"sum_case": 2799,
 		"sum_healed": 1385,
 		"sum_deceased": 33,
 		"active_case": 1381,
 		"nb_sample": 357,
 		"incidence": 0.137,
 		"remission": 0.495,
 		"letalite": 0.0118,
 		"sum_sample": 26905
 	},
 	{
 		"id": 82,
 		"date": "31/05/2020",
 		"new_case": 34,
 		"new_healed": 50,
 		"new_deceased": 0,
 		"sum_case": 2833,
 		"sum_healed": 1435,
 		"sum_deceased": 33,
 		"active_case": 1365,
 		"nb_sample": 134,
 		"incidence": 0.254,
 		"remission": 0.507,
 		"letalite": 0.0116,
 		"sum_sample": 27039
 	},
 	{
 		"id": 83,
 		"date": "01/06/2020",
 		"new_case": 118,
 		"new_healed": 32,
 		"new_deceased": 0,
 		"sum_case": 2951,
 		"sum_healed": 1467,
 		"sum_deceased": 33,
 		"active_case": 1451,
 		"nb_sample": 611,
 		"incidence": 0.193,
 		"remission": 0.497,
 		"letalite": 0.0112,
 		"sum_sample": 27650
 	},
 	{
 		"id": 84,
 		"date": "02/06/2020",
 		"new_case": 73,
 		"new_healed": 34,
 		"new_deceased": 0,
 		"sum_case": 3024,
 		"sum_healed": 1501,
 		"sum_deceased": 33,
 		"active_case": 1490,
 		"nb_sample": 470,
 		"incidence": 0.155,
 		"remission": 0.496,
 		"letalite": 0.0109,
 		"sum_sample": 28120
 	},
 	{
 		"id": 85,
 		"date": "03/06/2020",
 		"new_case": 86,
 		"new_healed": 29,
 		"new_deceased": 2,
 		"sum_case": 3110,
 		"sum_healed": 1530,
 		"sum_deceased": 35,
 		"active_case": 1545,
 		"nb_sample": 402,
 		"incidence": 0.214,
 		"remission": 0.492,
 		"letalite": 0.0113,
 		"sum_sample": 28522
 	},
 	{
 		"id": 86,
 		"date": "04/06/2020",
 		"new_case": 152,
 		"new_healed": 54,
 		"new_deceased": 0,
 		"sum_case": 3262,
 		"sum_healed": 1584,
 		"sum_deceased": 35,
 		"active_case": 1643,
 		"nb_sample": 706,
 		"incidence": 0.215,
 		"remission": 0.486,
 		"letalite": 0.0107,
 		"sum_sample": 29228
 	},
 	{
 		"id": 87,
 		"date": "05/06/2020",
 		"new_case": 169,
 		"new_healed": 20,
 		"new_deceased": 1,
 		"sum_case": 3431,
 		"sum_healed": 1604,
 		"sum_deceased": 36,
 		"active_case": 1791,
 		"nb_sample": 628,
 		"incidence": 0.269,
 		"remission": 0.468,
 		"letalite": 0.0105,
 		"sum_sample": 29856
 	},
 	{
 		"id": 88,
 		"date": "06/06/2020",
 		"new_case": 126,
 		"new_healed": 146,
 		"new_deceased": 0,
 		"sum_case": 3557,
 		"sum_healed": 1750,
 		"sum_deceased": 36,
 		"active_case": 1771,
 		"nb_sample": 756,
 		"incidence": 0.167,
 		"remission": 0.492,
 		"letalite": 0.0101,
 		"sum_sample": 30612
 	},
 	{
 		"id": 89,
 		"date": "07/06/2020",
 		"new_case": 182,
 		"new_healed": 68,
 		"new_deceased": 0,
 		"sum_case": 3739,
 		"sum_healed": 1818,
 		"sum_deceased": 36,
 		"active_case": 1885,
 		"nb_sample": 937,
 		"incidence": 0.194,
 		"remission": 0.486,
 		"letalite": 0.0096,
 		"sum_sample": 31549
 	},
 	{
 		"id": 90,
 		"date": "08/06/2020",
 		"new_case": 142,
 		"new_healed": 51,
 		"new_deceased": 2,
 		"sum_case": 3881,
 		"sum_healed": 1869,
 		"sum_deceased": 38,
 		"active_case": 1974,
 		"nb_sample": 800,
 		"incidence": 0.178,
 		"remission": 0.482,
 		"letalite": 0.0098,
 		"sum_sample": 32349
 	},
 	{
 		"id": 91,
 		"date": "09/06/2020",
 		"new_case": 114,
 		"new_healed": 176,
 		"new_deceased": 0,
 		"sum_case": 3995,
 		"sum_healed": 2045,
 		"sum_deceased": 38,
 		"active_case": 1912,
 		"nb_sample": 515,
 		"incidence": 0.221,
 		"remission": 0.512,
 		"letalite": 0.0095,
 		"sum_sample": 32864
 	},
 	{
 		"id": 92,
 		"date": "10/06/2020",
 		"new_case": 186,
 		"new_healed": 129,
 		"new_deceased": 3,
 		"sum_case": 4181,
 		"sum_healed": 2174,
 		"sum_deceased": 41,
 		"active_case": 1966,
 		"nb_sample": 612,
 		"incidence": 0.304,
 		"remission": 0.520,
 		"letalite": 0.0098,
 		"sum_sample": 33476
 	},
 	{
 		"id": 93,
 		"date": "11/06/2020",
 		"new_case": 223,
 		"new_healed": 38,
 		"new_deceased": 0,
 		"sum_case": 4404,
 		"sum_healed": 2212,
 		"sum_deceased": 41,
 		"active_case": 2151,
 		"nb_sample": 796,
 		"incidence": 0.280,
 		"remission": 0.502,
 		"letalite": 0.0093,
 		"sum_sample": 34272
 	},
 	{
 		"id": 94,
 		"date": "12/06/2020",
 		"new_case": 280,
 		"new_healed": 51,
 		"new_deceased": 4,
 		"sum_case": 4684,
 		"sum_healed": 2263,
 		"sum_deceased": 45,
 		"active_case": 2376,
 		"nb_sample": 907,
 		"incidence": 0.309,
 		"remission": 0.483,
 		"letalite": 0.0096,
 		"sum_sample": 35179
 	},
 	{
 		"id": 95,
 		"date": "13/06/2020",
 		"new_case": 164,
 		"new_healed": 134,
 		"new_deceased": 0,
 		"sum_case": 4848,
 		"sum_healed": 2397,
 		"sum_deceased": 45,
 		"active_case": 2406,
 		"nb_sample": 756,
 		"incidence": 0.217,
 		"remission": 0.494,
 		"letalite": 0.0093,
 		"sum_sample": 35935
 	},
 	{
 		"id": 96,
 		"date": "14/06/2020",
 		"new_case": 236,
 		"new_healed": 108,
 		"new_deceased": 0,
 		"sum_case": 5084,
 		"sum_healed": 2505,
 		"sum_deceased": 45,
 		"active_case": 2534,
 		"nb_sample": 848,
 		"incidence": 0.278,
 		"remission": 0.493,
 		"letalite": 0.0089,
 		"sum_sample": 36783
 	},
 	{
 		"id": 97,
 		"date": "15/06/2020",
 		"new_case": 355,
 		"new_healed": 85,
 		"new_deceased": 1,
 		"sum_case": 5439,
 		"sum_healed": 2590,
 		"sum_deceased": 46,
 		"active_case": 2803,
 		"nb_sample": 870,
 		"incidence": 0.408,
 		"remission": 0.476,
 		"letalite": 0.0085,
 		"sum_sample": 37653
 	},
 	{
 		"id": 98,
 		"date": "16/06/2020",
 		"new_case": 240,
 		"new_healed": 47,
 		"new_deceased": 0,
 		"sum_case": 5679,
 		"sum_healed": 2637,
 		"sum_deceased": 46,
 		"active_case": 2996,
 		"nb_sample": 984,
 		"incidence": 0.244,
 		"remission": 0.464,
 		"letalite": 0.0081,
 		"sum_sample": 38637
 	},
 	{
 		"id": 99,
 		"date": "17/06/2020",
 		"new_case": 384,
 		"new_healed": 112,
 		"new_deceased": 2,
 		"sum_case": 6063,
 		"sum_healed": 2749,
 		"sum_deceased": 48,
 		"active_case": 3266,
 		"nb_sample": 1214,
 		"incidence": 0.316,
 		"remission": 0.453,
 		"letalite": 0.0079,
 		"sum_sample": 39851
 	},
 	{
 		"id": 100,
 		"date": "18/06/2020",
 		"new_case": 381,
 		"new_healed": 114,
 		"new_deceased": 1,
 		"sum_case": 6444,
 		"sum_healed": 2863,
 		"sum_deceased": 49,
 		"active_case": 3532,
 		"nb_sample": 1592,
 		"incidence": 0.239,
 		"remission": 0.444,
 		"letalite": 0.0076,
 		"sum_sample": 41443
 	},
 	{
 		"id": 101,
 		"date": "19/06/2020",
 		"new_case": 430,
 		"new_healed": 79,
 		"new_deceased": 0,
 		"sum_case": 6874,
 		"sum_healed": 2942,
 		"sum_deceased": 49,
 		"active_case": 3883,
 		"nb_sample": 1632,
 		"incidence": 0.263,
 		"remission": 0.428,
 		"letalite": 0.0071,
 		"sum_sample": 43075
 	},
 	{
 		"id": 102,
 		"date": "20/06/2020",
 		"new_case": 402,
 		"new_healed": 50,
 		"new_deceased": 3,
 		"sum_case": 7276,
 		"sum_healed": 2992,
 		"sum_deceased": 52,
 		"active_case": 4232,
 		"nb_sample": 1155,
 		"incidence": 0.348,
 		"remission": 0.411,
 		"letalite": 0.0071,
 		"sum_sample": 44230
 	},
 	{
 		"id": 103,
 		"date": "21/06/2020",
 		"new_case": 216,
 		"new_healed": 76,
 		"new_deceased": 2,
 		"sum_case": 7492,
 		"sum_healed": 3068,
 		"sum_deceased": 54,
 		"active_case": 4370,
 		"nb_sample": 922,
 		"incidence": 0.234,
 		"remission": 0.410,
 		"letalite": 0.0072,
 		"sum_sample": 45152
 	},
 	{
 		"id": 104,
 		"date": "22/06/2020",
 		"new_case": 185,
 		"new_healed": 60,
 		"new_deceased": 2,
 		"sum_case": 7677,
 		"sum_healed": 3128,
 		"sum_deceased": 56,
 		"active_case": 4493,
 		"nb_sample": 844,
 		"incidence": 0.219,
 		"remission": 0.407,
 		"letalite": 0.0073,
 		"sum_sample": 45996
 	},
 	{
 		"id": 105,
 		"date": "23/06/2020",
 		"new_case": 227,
 		"new_healed": 54,
 		"new_deceased": 2,
 		"sum_case": 7904,
 		"sum_healed": 3182,
 		"sum_deceased": 58,
 		"active_case": 4664,
 		"nb_sample": 1303,
 		"incidence": 0.174,
 		"remission": 0.403,
 		"letalite": 0.0073,
 		"sum_sample": 47299
 	},
 	{
 		"id": 106,
 		"date": "24/06/2020",
 		"new_case": 260,
 		"new_healed": 237,
 		"new_deceased": 0,
 		"sum_case": 8164,
 		"sum_healed": 3419,
 		"sum_deceased": 58,
 		"active_case": 4687,
 		"nb_sample": 1041,
 		"incidence": 0.250,
 		"remission": 0.419,
 		"letalite": 0.0071,
 		"sum_sample": 48340
 	},
 	{
 		"id": 107,
 		"date": "25/06/2020",
 		"new_case": 170,
 		"new_healed": 68,
 		"new_deceased": 2,
 		"sum_case": 8334,
 		"sum_healed": 3487,
 		"sum_deceased": 60,
 		"active_case": 4787,
 		"nb_sample": 1012,
 		"incidence": 0.168,
 		"remission": 0.418,
 		"letalite": 0.0072,
 		"sum_sample": 49352
 	},
 	{
 		"id": 108,
 		"date": "26/06/2020",
 		"new_case": 405,
 		"new_healed": 100,
 		"new_deceased": 4,
 		"sum_case": 8739,
 		"sum_healed": 3587,
 		"sum_deceased": 64,
 		"active_case": 5088,
 		"nb_sample": 1562,
 		"incidence": 0.259,
 		"remission": 0.410,
 		"letalite": 0.0073,
 		"sum_sample": 50914
 	},
 	{
 		"id": 109,
 		"date": "27/06/2020",
 		"new_case": 205,
 		"new_healed": 135,
 		"new_deceased": 2,
 		"sum_case": 8944,
 		"sum_healed": 3722,
 		"sum_deceased": 66,
 		"active_case": 5156,
 		"nb_sample": 1347,
 		"incidence": 0.152,
 		"remission": 0.416,
 		"letalite": 0.0074,
 		"sum_sample": 52261
 	},
 	{
 		"id": 110,
 		"date": "28/06/2020",
 		"new_case": 157,
 		"new_healed": 86,
 		"new_deceased": 0,
 		"sum_case": 9101,
 		"sum_healed": 3808,
 		"sum_deceased": 66,
 		"active_case": 5227,
 		"nb_sample": 624,
 		"incidence": 0.252,
 		"remission": 0.418,
 		"letalite": 0.0073,
 		"sum_sample": 52885
 	},
 	{
 		"id": 111,
 		"date": "29/06/2020",
 		"new_case": 113,
 		"new_healed": 188,
 		"new_deceased": 0,
 		"sum_case": 9214,
 		"sum_healed": 3996,
 		"sum_deceased": 66,
 		"active_case": 5152,
 		"nb_sample": 1053,
 		"incidence": 0.107,
 		"remission": 0.434,
 		"letalite": 0.0072,
 		"sum_sample": 53938
 	},
 	{
 		"id": 112,
 		"date": "30/06/2020",
 		"new_case": 285,
 		"new_healed": 277,
 		"new_deceased": 2,
 		"sum_case": 9499,
 		"sum_healed": 4273,
 		"sum_deceased": 68,
 		"active_case": 5158,
 		"nb_sample": 2012,
 		"incidence": 0.142,
 		"remission": 0.450,
 		"letalite": 0.0072,
 		"sum_sample": 55950
 	}
 ]