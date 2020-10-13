Models["covid_recods"] = ( function(){
   
    const headCells = [
      { id: 'id', label: 'Id', minWidth: 70 },
      { 
          id: 'ref_date', 
          label: 'Date', 
          minWidth: 170,
          align: 'right',
          format: (value) => DATE_FORMATTER.short(value)
      },
      { id: 'new_case',       label: 'Cas détecté',     minWidth: 170 , numeric: true },
      { id: 'new_healed',     label: 'Cas guéris',      minWidth: 170 , numeric: true },
      { id: 'new_deceased',   label: 'Cas de décès',    minWidth: 170 , numeric: true },
      { id: 'nb_sample',      label: 'Nb échantillons', minWidth: 170 , numeric: true },
      { 
          id: 'created_at', 
          label: 'Créé le', 
          minWidth: 270,
          align: 'center',
          format: (value) => value.toLocaleDateString('fr-FR')
      }
    ]; 

    const defaults = {
      orderField : "ref_date",
      order : "asc"
    }

    const rows = covid_data_records;

    const visualAttrib = {
       title : "Enregistrements des indicateurs journalier du Covid-19"
    }

    const dataSource = { rows , headCells, defaults }

  return { dataSource , visualAttrib }

})()