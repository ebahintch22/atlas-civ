


covidManager = function COVID_MANAGER(){
	var $root_ELT ;
	return {
		      openview : __openView,
		      showView : __showView,
		     emptyView : __emptyView,
		     closeView : __closeView,
		  closeManager : __closeManager
	}




	//Chargement de la fenêtre d'administration
	function __openView( Elt_ID ){

		$root_ELT = $(Elt_ID)
		$root_ELT.removeClass("hidden");


	}

}()


