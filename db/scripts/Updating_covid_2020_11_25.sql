
SET DateStyle TO European ;  
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
(   259	, '24/11/2020' , 8 , 14 , 0 , 21156 , 20833 , 131 , 192 , 338 , 0.024 , 0.985 , 0.0062 , 211480 ),
(   260 , '25/11/2020' , 12 , 10 , 0 , 21168 , 20843 , 131 , 194 , 1071 , 0.011 , 0.985 , 0.0062 , 212551 );
