
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

