 Ajaxian = new function (){

    return {

        read : function(URL, callBackSuccess, callBackFailure){

            $.ajax({
                url: URL,
                type: "get",
                success: function (data) {
                    callBackSuccess(data)
                   
                
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    callBackFailure(xhr, ajaxOptions, thrownError)
                }
            });

        }
    }
 
  }


