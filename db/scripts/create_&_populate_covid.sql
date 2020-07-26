CREATE SEQUENCE public.covid_records_gid_seq
    INCREMENT 1
    START 135
    MINVALUE 1
    MAXVALUE 2147483647
    CACHE 1;

ALTER SEQUENCE public.covid_records_gid_seq
    OWNER TO postgres;


CREATE TABLE public.covid_records (
    id integer NOT NULL DEFAULT nextval('covid_records_gid_seq'::regclass),
    ref_date date,
    new_case integer,
    new_healed integer,
    new_deceased integer,
    nb_sample integer,
    sum_case integer,
    sum_healed integer,
    sum_deceased integer,
    sum_sample integer,
    active_case integer,
    incidence_rate numeric,
    remission_rate numeric,
    letality_rate numeric,
    created_at TIMESTAMPTZ DEFAULT Now(),
    updated_at TIMESTAMPTZ DEFAULT Now(),
    CONSTRAINT covid_record_pkey PRIMARY KEY (id)

)
WITH (
    OIDS = FALSE
);


ALTER TABLE public.covid_records
    OWNER to postgres;  

INSERT INTO public.covid_records (  
    id, 
    ref_date,
    new_case, 
    new_healed, 
    new_deceased, 
    sum_case, 
    sum_healed,
    sum_deceased, 
    active_case, 
    nb_sample, 
    incidence_rate,  
    remission_rate, 
    letality_rate, 
    sum_sample  
    )  

VALUES 
    ( -1, '09/03/2020', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.000, 0.000, 0 ),
    ( 0, '10/03/2020', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.000, 0.000, 0 ),
    ( 1, '11/03/2020', 1, 0, 0, 1, 0, 0, 1, 96, 0.010, 0.000, 0.0000, 96),
    ( 2, '12/03/2020', 0, 0, 0, 1, 0, 0, 1, 96, 0.000, 0.000, 0.0000, 192),
    ( 3, '13/03/2020', 0, 0, 0, 1, 0, 0, 1, 96, 0.000, 0.000, 0.0000, 288),
    ( 4, '14/03/2020', 3, 0, 0, 4, 0, 0, 4, 96, 0.031, 0.000, 0.0000, 384),
    ( 5, '15/03/2020', 0, 0, 0, 4, 0, 0, 4, 96, 0.000, 0.000, 0.0000, 480),
    ( 6, '16/03/2020', 2, 1, 0, 6, 1, 0, 5, 96, 0.021, 0.167, 0.0000, 576),
    ( 7, '17/03/2020', 0, 0, 0, 6, 1, 0, 5, 96, 0.000, 0.167, 0.0000, 672),
    ( 8, '18/03/2020', 3, 0, 0, 9, 1, 0, 8, 96, 0.031, 0.111, 0.0000, 768),
    ( 9, '19/03/2020', 0, 0, 0, 9, 1, 0, 8, 96, 0.000, 0.111, 0.0000, 864),
    ( 10, '20/03/2020', 5, 0, 0, 14, 1, 0, 13, 96, 0.052, 0.071, 0.0000, 960),
    ( 11, '21/03/2020', 3, 0, 0, 17, 1, 0, 16, 96, 0.031, 0.059, 0.0000, 1056),
    ( 12, '22/03/2020', 8, 1, 0, 25, 2, 0, 23, 96, 0.083, 0.080, 0.0000, 1152),
    ( 13, '23/03/2020', 0, 0, 0, 25, 2, 0, 23, 96, 0.000, 0.080, 0.0000, 1248),
    ( 14, '24/03/2020', 48, 1, 0, 73, 3, 0, 70, 96, 0.500, 0.041, 0.0000, 1344),
    ( 15, '25/03/2020', 7, 0, 0, 80, 3, 0, 77, 96, 0.073, 0.038, 0.0000, 1440),
    ( 16, '26/03/2020', 16, 0, 0, 96, 3, 0, 93, 96, 0.167, 0.031, 0.0000, 1536),
    ( 17, '27/03/2020', 5, 0, 0, 101, 3, 0, 98, 96, 0.052, 0.030, 0.0000, 1632),
    ( 18, '28/03/2020', 39, 0, 0, 140, 3, 0, 137, 96, 0.406, 0.021, 0.0000, 1728),
    ( 19, '29/03/2020', 25, 1, 1, 165, 4, 1, 160, 96, 0.260, 0.024, 0.0061, 1824),
    ( 20, '30/03/2020', 3, 2, 0, 168, 6, 1, 161, 97, 0.031, 0.036, 0.0060, 1921),
    ( 21, '31/03/2020', 11, 1, 0, 179, 7, 1, 171, 97, 0.113, 0.039, 0.0056, 2018),
    ( 22, '01/04/2020', 11, 2, 0, 190, 9, 1, 180, 97, 0.113, 0.047, 0.0053, 2115),
    ( 23, '02/04/2020', 4, 6, 0, 194, 15, 1, 178, 81, 0.049, 0.077, 0.0052, 2196),
    ( 24, '03/04/2020', 24, 4, 0, 218, 19, 1, 198, 226, 0.106, 0.087, 0.0046, 2422),
    ( 25, '04/04/2020', 27, 6, 0, 245, 25, 1, 219, 96, 0.281, 0.102, 0.0041, 2518),
    ( 26, '05/04/2020', 16, 12, 2, 261, 37, 3, 221, 96, 0.167, 0.142, 0.0115, 2614),
    ( 27, '06/04/2020', 62, 4, 0, 323, 41, 3, 279, 96, 0.646, 0.127, 0.0093, 2710),
    ( 28, '07/04/2020', 26, 0, 0, 349, 41, 3, 305, 96, 0.271, 0.117, 0.0086, 2806),
    ( 29, '08/04/2020', 35, 7, 0, 384, 48, 3, 333, 125, 0.280, 0.125, 0.0078, 2931),
    ( 30, '09/04/2020', 60, 4, 0, 444, 52, 3, 389, 247, 0.243, 0.117, 0.0068, 3178),
    ( 31, '10/04/2020', 36, 2, 0, 480, 54, 3, 423, 192, 0.188, 0.113, 0.0063, 3370),
    ( 32, '11/04/2020', 53, 4, 1, 533, 58, 4, 471, 96, 0.552, 0.109, 0.0075, 3466),
    ( 33, '12/04/2020', 41, 27, 1, 574, 85, 5, 484, 96, 0.427, 0.148, 0.0087, 3562),
    ( 34, '13/04/2020', 52, 4, 1, 626, 89, 6, 531, 96, 0.542, 0.142, 0.0096, 3658),
    ( 35, '14/04/2020', 12, 25, 0, 638, 114, 6, 518, 129, 0.093, 0.179, 0.0094, 3787),
    ( 36, '15/04/2020', 16, 32, 0, 654, 146, 6, 502, 238, 0.067, 0.223, 0.0092, 4025),
    ( 37, '16/04/2020', 34, 47, 0, 688, 193, 6, 489, 298, 0.114, 0.281, 0.0087, 4323),
    ( 38, '17/04/2020', 54, 27, 0, 742, 220, 6, 516, 296, 0.182, 0.296, 0.0081, 4619),
    ( 39, '18/04/2020', 59, 19, 2, 801, 239, 8, 554, 361, 0.163, 0.298, 0.0100, 4980),
    ( 40, '19/04/2020', 46, 21, 1, 847, 260, 9, 578, 399, 0.115, 0.307, 0.0106, 5379),
    ( 41, '20/04/2020', 32, 27, 1, 879, 287, 10, 582, 351, 0.091, 0.327, 0.0114, 5730),
    ( 42, '21/04/2020', 37, 16, 3, 916, 303, 13, 600, 270, 0.137, 0.331, 0.0142, 6000),
    ( 43, '22/04/2020', 36, 7, 1, 952, 310, 14, 628, 342, 0.105, 0.326, 0.0147, 6342),
    ( 44, '23/04/2020', 52, 49, 0, 1004, 359, 14, 631, 504, 0.103, 0.358, 0.0139, 6846),
    ( 45, '24/04/2020', 73, 60, 0, 1077, 419, 14, 644, 584, 0.125, 0.389, 0.0130, 7430),
    ( 46, '25/04/2020', 34, 30, 0, 1111, 449, 14, 648, 302, 0.113, 0.404, 0.0126, 7732),
    ( 47, '26/04/2020', 39, 19, 0, 1150, 468, 14, 668, 560, 0.070, 0.407, 0.0122, 8292),
    ( 48, '27/04/2020', 14, 31, 0, 1164, 487, 14, 651, 289, 0.048, 0.429, 0.0120, 8581),
    ( 49, '28/04/2020', 19, 26, 0, 1183, 525, 14, 644, 179, 0.106, 0.444, 0.0118, 8760),
    ( 50, '29/04/2020', 55, 32, 0, 1238, 557, 14, 667, 512, 0.107, 0.450, 0.0113, 9272),
    ( 51, '30/04/2020', 37, 17, 0, 1275, 574, 14, 687, 385, 0.096, 0.450, 0.0110, 9657),
    ( 52, '01/05/2020', 58, 23, 1, 1333, 597, 15, 721, 416, 0.139, 0.448, 0.0113, 10073),
    ( 53, '02/05/2020', 29, 25, 0, 1362, 622, 15, 725, 435, 0.067, 0.457, 0.0110, 10508),
    ( 54, '03/05/2020', 36, 31, 2, 1398, 653, 17, 728, 288, 0.125, 0.467, 0.0122, 10796),
    ( 55, '04/05/2020', 34, 40, 0, 1432, 693, 17, 722, 482, 0.071, 0.484, 0.0119, 11278),
    ( 56, '05/05/2020', 32, 8, 1, 1432, 701, 18, 745, 170, 0.188, 0.479, 0.0123, 11448),
    ( 57, '06/05/2020', 52, 20, 0, 1516, 721, 18, 777, 497, 0.105, 0.476, 0.0119, 11945),
    ( 58, '07/05/2020', 55, 21, 2, 1571, 742, 20, 809, 367, 0.150, 0.472, 0.0127, 12312),
    ( 59, '08/05/2020', 31, 12, 0, 1602, 754, 20, 828, 456, 0.068, 0.471, 0.0125, 12768),
    ( 60, '09/05/2020', 65, 15, 1, 1667, 769, 21, 877, 573, 0.113, 0.461, 0.0126, 13341),
    ( 61, '10/05/2020', 33, 25, 0, 1700, 794, 21, 885, 322, 0.102, 0.467, 0.0124, 13663),
    ( 62, '11/05/2020', 30, 24, 0, 1730, 818, 21, 891, 499, 0.060, 0.473, 0.0121, 14162),
    ( 63, '12/05/2020', 127, 2, 0, 1857, 820, 21, 1016, 506, 0.251, 0.442, 0.0113, 14668),
    ( 64, '13/05/2020', 55, 82, 3, 1912, 902, 24, 986, 592, 0.093, 0.472, 0.0126, 15260),
    ( 65, '14/05/2020', 59, 28, 0, 1971, 930, 24, 1017, 680, 0.087, 0.472, 0.0122, 15940),
    ( 66, '15/05/2020', 46, 12, 0, 2017, 942, 24, 1051, 728, 0.063, 0.467, 0.0119, 16668),
    ( 67, '16/05/2020', 44, 45, 1, 2061, 987, 25, 1049, 845, 0.052, 0.479, 0.0121, 17513),
    ( 68, '17/05/2020', 48, 17, 2, 2109, 1004, 27, 1078, 790, 0.061, 0.476, 0.0128, 18303),
    ( 69, '18/05/2020', 10, 36, 1, 2119, 1040, 28, 1051, 305, 0.033, 0.491, 0.0132, 18608),
    ( 70, '19/05/2020', 34, 10, 0, 2153, 1050, 28, 1075, 566, 0.060, 0.488, 0.0130, 19174),
    ( 71, '20/05/2020', 78, 33, 1, 2231, 1083, 29, 1119, 840, 0.093, 0.485, 0.0130, 20014),
    ( 72, '21/05/2020', 70, 17, 0, 2301, 1100, 29, 1172, 1055, 0.066, 0.478, 0.0126, 21069),
    ( 73, '22/05/2020', 40, 46, 0, 2341, 1146, 29, 1166, 1164, 0.034, 0.490, 0.0124, 22233),
    ( 74, '23/05/2020', 25, 42, 1, 2366, 1188, 30, 1148, 727, 0.034, 0.502, 0.0127, 22960),
    ( 75, '24/05/2020', 10, 31, 0, 2376, 1219, 30, 1127, 484, 0.021, 0.513, 0.0126, 23444),
    ( 76, '25/05/2020', 47, 38, 0, 2423, 1257, 30, 1136, 873, 0.054, 0.519, 0.0124, 24317),
    ( 77, '26/05/2020', 54, 29, 0, 2477, 1286, 30, 1161, 782, 0.069, 0.519, 0.0121, 25099),
    ( 78, '27/05/2020', 79, 16, 1, 2556, 1302, 31, 1223, 425, 0.186, 0.509, 0.0121, 25524),
    ( 79, '28/05/2020', 85, 24, 1, 2641, 1326, 32, 1283, 497, 0.171, 0.502, 0.0121, 26021),
    ( 80, '29/05/2020', 109, 44, 0, 2750, 1370, 32, 1348, 527, 0.207, 0.498, 0.0116, 26548),
    ( 81, '30/05/2020', 49, 15, 1, 2799, 1385, 33, 1381, 357, 0.137, 0.495, 0.0118, 26905),
    ( 82, '31/05/2020', 34, 50, 0, 2833, 1435, 33, 1365, 134, 0.254, 0.507, 0.0116, 27039),
    ( 83, '01/06/2020', 118, 32, 0, 2951, 1467, 33, 1451, 611, 0.193, 0.497, 0.0112, 27650),
    ( 84, '02/06/2020', 73, 34, 0, 3024, 1501, 33, 1490, 470, 0.155, 0.496, 0.0109, 28120),
    ( 85, '03/06/2020', 86, 29, 2, 3110, 1530, 35, 1545, 402, 0.214, 0.492, 0.0113, 28522),
    ( 86, '04/06/2020', 152, 54, 0, 3262, 1584, 35, 1643, 706, 0.215, 0.486, 0.0107, 29228),
    ( 87, '05/06/2020', 169, 20, 1, 3431, 1604, 36, 1791, 628, 0.269, 0.468, 0.0105, 29856),
    ( 88, '06/06/2020', 126, 146, 0, 3557, 1750, 36, 1771, 756, 0.167, 0.492, 0.0101, 30612),
    ( 89, '07/06/2020', 182, 68, 0, 3739, 1818, 36, 1885, 937, 0.194, 0.486, 0.0096, 31549),
    ( 90, '08/06/2020', 142, 51, 2, 3881, 1869, 38, 1974, 800, 0.178, 0.482, 0.0098, 32349),
    ( 91, '09/06/2020', 114, 176, 0, 3995, 2045, 38, 1912, 515, 0.221, 0.512, 0.0095, 32864),
    ( 92, '10/06/2020', 186, 129, 3, 4181, 2174, 41, 1966, 612, 0.304, 0.520, 0.0098, 33476),
    ( 93, '11/06/2020', 223, 38, 0, 4404, 2212, 41, 2151, 796, 0.280, 0.502, 0.0093, 34272),
    ( 94, '12/06/2020', 280, 51, 4, 4684, 2263, 45, 2376, 907, 0.309, 0.483, 0.0096, 35179),
    ( 95, '13/06/2020', 164, 134, 0, 4848, 2397, 45, 2406, 756, 0.217, 0.494, 0.0093, 35935),
    ( 96, '14/06/2020', 236, 108, 0, 5084, 2505, 45, 2534, 848, 0.278, 0.493, 0.0089, 36783),
    ( 97, '15/06/2020', 355, 85, 1, 5439, 2590, 46, 2803, 870, 0.408, 0.476, 0.0085, 37653),
    ( 98, '16/06/2020', 240, 47, 0, 5679, 2637, 46, 2996, 984, 0.244, 0.464, 0.0081, 38637),
    ( 99, '17/06/2020', 384, 112, 2, 6063, 2749, 48, 3266, 1214, 0.316, 0.453, 0.0079, 39851),
    ( 100, '18/06/2020', 381, 114, 1, 6444, 2863, 49, 3532, 1592, 0.239, 0.444, 0.0076, 41443),
    ( 101, '19/06/2020', 430, 79, 0, 6874, 2942, 49, 3883, 1632, 0.263, 0.428, 0.0071, 43075),
    ( 102, '20/06/2020', 402, 50, 3, 7276, 2992, 52, 4232, 1155, 0.348, 0.411, 0.0071, 44230),
    ( 103, '21/06/2020', 216, 76, 2, 7492, 3068, 54, 4370, 922, 0.234, 0.410, 0.0072, 45152),
    ( 104, '22/06/2020', 185, 60, 2, 7677, 3128, 56, 4493, 844, 0.219, 0.407, 0.0073, 45996),
    ( 105, '23/06/2020', 227, 54, 2, 7904, 3182, 58, 4664, 1303, 0.174, 0.403, 0.0073, 47299),
    ( 106, '24/06/2020', 260, 237, 0, 8164, 3419, 58, 4687, 1041, 0.250, 0.419, 0.0071, 48340),
    ( 107, '25/06/2020', 170, 68, 2, 8334, 3487, 60, 4787, 1012, 0.168, 0.418, 0.0072, 49352),
    ( 108, '26/06/2020', 405, 100, 4, 8739, 3587, 64, 5088, 1562, 0.259, 0.410, 0.0073, 50914),
    ( 109, '27/06/2020', 205, 135, 2, 8944, 3722, 66, 5156, 1347, 0.152, 0.416, 0.0074, 52261),
    ( 110, '28/06/2020', 157, 86, 0, 9101, 3808, 66, 5227, 624, 0.252, 0.418, 0.0073, 52885),
    ( 111, '29/06/2020', 113, 188, 0, 9214, 3996, 66, 5152, 1053, 0.107, 0.434, 0.0072, 53938),
    ( 112, '30/06/2020', 285, 277, 2, 9499, 4273, 68, 5158, 2012, 0.142, 0.450, 0.0072, 55950),
    ( 113, '01/07/2020', 203, 108, 0, 9702, 4381, 68, 5253, 1824, 0.111, 0.452, 0.0070, 57774),
    ( 114, '02/07/2020', 290, 279, 0, 9992, 4660, 68, 5264, 1608, 0.180, 0.466, 0.0068, 59382),
    ( 115, '03/07/2020', 252, 66, 2, 10244, 4726, 70, 5448, 1270, 0.198, 0.461, 0.0068, 60652),
    ( 116, '04/07/2020', 218, 81, 2, 10462, 4807, 72, 5583, 1553, 0.140, 0.459, 0.0069, 62205),
    ( 117, '05/07/2020', 310, 260, 2, 10772, 5067, 74, 5631, 2219, 0.140, 0.470, 0.0069, 64424),
    ( 118, '06/07/2020', 194, 317, 1, 10966, 5384, 75, 5507, 1404, 0.138, 0.491, 0.0068, 65828),
    ( 119, '07/07/2020', 228, 103, 1, 11194, 5487, 76, 5631, 1280, 0.178, 0.490, 0.0068, 67108),
    ( 120, '08/07/2020', 310, 84, 2, 11504, 5571, 78, 5855, 1841, 0.168, 0.484, 0.0068, 68949),
    ( 121, '09/07/2020', 246, 181, 1, 11750, 5752, 79, 5919, 1405, 0.175, 0.490, 0.0067, 70354),
    ( 122, '10/07/2020', 302, 328, 2, 12052, 6080, 81, 5891, 2185, 0.138, 0.504, 0.0067, 72539),
    ( 123, '11/07/2020', 391, 277, 1, 12443, 6357, 82, 6004, 2281, 0.171, 0.511, 0.0066, 74820),
    ( 124, '12/07/2020', 323, 297, 2, 12766, 6654, 84, 6028, 1370, 0.236, 0.521, 0.0066, 76190),
    ( 125, '13/07/2020', 106, 156, 0, 12872, 6810, 84, 5978, 1134, 0.093, 0.529, 0.0065, 77324),
    ( 126, '14/07/2020', 165, 98, 3, 13037, 6908, 87, 6042, 682, 0.242, 0.530, 0.0067, 78006),
    ( 127, '15/07/2020', 366, 238, 0, 13403, 7146, 87, 6170, 1829, 0.200, 0.533, 0.0065, 79835),
    ( 128, '16/07/2020', 151, 217, 0, 13554, 7363, 87, 6104, 738, 0.205, 0.543, 0.0064, 80573),
    ( 129, '17/07/2020', 142, 244, 0, 13696, 7607, 87, 6002, 746, 0.190, 0.555, 0.0064, 81319),
    ( 130, '18/07/2020', 216, 396, 4, 13912, 8003, 91, 5818, 1237, 0.175, 0.575, 0.0065, 82556),
    ( 131, '19/07/2020', 207, 366, 1, 14119, 8369, 92, 5658, 1137, 0.182, 0.593, 0.0065, 83693),
    ( 132, '20/07/2020', 193, 293, 0, 14312, 8662, 92, 5558, 1656, 0.117, 0.605, 0.0064, 85349),
    ( 133, '21/07/2020', 219, 198, 1, 14531, 8860, 93, 5578, 1143, 0.192, 0.610, 0.0064, 86492),
    ( 134, '22/07/2020', 202, 138, 0, 14733, 8998, 93, 5642, 1131, 0.179, 0.611, 0.0063, 87623)
 