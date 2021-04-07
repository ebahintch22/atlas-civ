Models["employee"] = ( function(){
   
    const headCells  = [

      { id: "emp_id", label: "Code", numeric:false, minWidth: 150,  align: "left", isVisible: true},
      { id: "emp_matricule", label: "Matricule", numeric:false, minWidth: 150,  align: "left", isVisible: true},
      { id: "emp_lastname", label: "Nom", numeric:false, minWidth: 150,  align: "left", isVisible: true},
      { id: "emp_firstname", label: "Prénoms", numeric:false, minWidth: 150,  align: "left", isVisible: false},
      { id: "emp_post_code", label: "Code du post", numeric:false, minWidth: 150,  align: "left", isVisible: false},
      { id: "code_emploi", label: "Code emploi", numeric:false, minWidth: 150,  align: "left", isVisible: false},
      { id: "emp_cnps_num", label: "N° CNPS", numeric:false, minWidth: 150,  align: "left", isVisible: false},
      { id: "emp_sex", label: "Sexe", numeric:false, minWidth: 150,  align: "left", isVisible: true},
      { id: "emp_nationality_1", label: "Nationalité 1", numeric:false, minWidth: 150,  align: "left", isVisible: false},
      { id: "emp_nationality_2", label: "Nationalité 2", numeric:false, minWidth: 150,  align: "left", isVisible: false},
      { id: "emp_birthdate", label: "Date de naissance", numeric:false, minWidth: 150,  align: "left", isVisible: false, 
          format : (value) => value.toLocaleDateString('fr-FR')},
      { id: "emp_birthplace", label: "Lieu de naissance", numeric:false, minWidth: 150,  align: "left", isVisible: false},
      { id: "emp_date_embauche", label: "Date d'embauche", numeric:false, minWidth: 150,  align: "left", isVisible: false, 
          format : (value) => value.toLocaleDateString('fr-FR')},
      { id: "emp_date_depart", label: "Date de départ", numeric:false, minWidth: 150,  align: "left", isVisible: false, 
          format : (value) => value.toLocaleDateString('fr-FR')},
      { id: "emp_contract_type", label: "Type de Contrat", numeric:false, minWidth: 150,  align: "left", isVisible: true},
      { id: "emp_statut_matrim", label: "Statut Matrimonial", numeric:false, minWidth: 150,  align: "left", isVisible: false},
      { id: "emp_children_count", label: "Nombre d'enfants", numeric:true, minWidth: 150,  align: "right", isVisible: false},
      { id: "emp_phone_job", label: "Téléphone de travail", numeric:false, minWidth: 150,  align: "left", isVisible: false},
      { id: "emp_phone_pers_1", label: "Téléphone perso 1", numeric:false, minWidth: 150,  align: "left", isVisible: false},
      { id: "emp_phone_pers_2", label: "Téléphone perso 2", numeric:false, minWidth: 150,  align: "left", isVisible: false},
      { id: "emp_email", label: "Adresse électronique", numeric:false, minWidth: 150,  align: "left", isVisible: false},
      { id: "emp_addr_geo", label: "Adresse  géographique", numeric:false, minWidth: 150,  align: "left", isVisible: false},
      { id: "emp_igr_part", label: "IGR", numeric:true, minWidth: 150,  align: "right", isVisible: false},
      { id: "emp_category", label: "Catégorie professionnelle", numeric:false, minWidth: 150,  align: "left", isVisible: false},
      { id: "emp_job_position", label: "Position", numeric:false, minWidth: 150,  align: "left", isVisible: false},
      { id: "service_affectation", label: "Service d'affectation", numeric:false, minWidth: 150,  align: "left", isVisible: false},
      { id: "emp_pay_freq", label: "Périodicité de la paye", numeric:true, minWidth: 150,  align: "right", isVisible: false},
      { id: "emp_picture", label: "Photo d'identité", numeric:false, minWidth: 150,  align: "left", isVisible: false}
    ];

    const idField = "emp_id";
    const defaults = {
      idField : idField,
      orderField : "emp_lastname",
      order : "asc"
    }

    
    const visualAttrib = {
       title : "Répertoire des employés de la société"
    }

    const metadata = { headCells, defaults }

  return { metadata , visualAttrib }

})()

