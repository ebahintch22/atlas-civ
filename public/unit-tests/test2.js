REGIONS/DISTRICTS

 Nombre de femmes enceintes vue en CPN 1 au 1er trimestre de la grossesse (services PTME) Nombre de femmes enceintes vue en CPN 1 autre trimestre de la grossesse (services PTME) Nombre de femmes enceintes dépistées positives à la syphilis en CPN Nombre de femmes enceintes reçues en CPN1 et se connaissant déjà séropositives au VIH Nombre de femmes enceintes conseillées et testées qui ont reçu le résultat du test VIH en CPN et en Maternité Nombre de femmes enceintes dépistées séropositives au VIH Nombre de femmes enceintes déjà sous Traitement ARV et reçues en CPN1 Nombre de femmes enceintes séropositives ayant nouvellement commencé (initié) le traitement ARV dans l'établissement sanitaire Nombre de femmes enceintes séropositives dont l'accouchement a été enregistré dans l’établissement sanitaire Nombre d'enfants nés vivants de mères séropositives au VIH Nombre d'enfants nés de mères séropositives au VIH ayant reçu des ARV dans les 72h après la naissance Nombre d'enfants nés de mères séropositives au VIH initiant la prophylaxie au Cotrimoxazole avant 2 mois Nombre d'enfants nés de mères séropositives au VIH dépistés précocement (avant 2 mois) Nombre d'enfants nés de mères séropositives au VIH dépistés précocement (2 à 9 mois) Nombre d'enfants nés de mères séropositives au VIH dépistés tardivement (10 à 18 mois) Nombre total d'enfants nés de mères séropositives au VIH dépistés Nombre d'enfants nés de mères séropositives au VIH dépistés VIH positif Proportion d'enfants nés de mères VIH+ dépistés VIH+ (%)

get_missing_fields = function (data, searchFields){

	var base_fld_arr = Object.keys(data)
	var missing_flds = searchFields.reduce(function( accum, fld_name){
		if ( base_fld_arr.indexOf(fld_name)==-1) {
			accum.push(fld_name)
		}
		return accum
	}, [])
}

{}