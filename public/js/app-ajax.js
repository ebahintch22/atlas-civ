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

        },
        post : function(URL, data, callBackSuccess, callBackFailure){

            $.ajax({
                     url : URL ,
                    type : "post",
                dataType : "json",
             contentType : "application/json",
                    data : JSON.stringify(data),
                  success: function (data, textSTatus , JQxhr) {
                            callBackSuccess(data)
                  },

                    error: function (xhr, ajaxOptions, thrownError) {
                            callBackFailure(xhr, ajaxOptions, thrownError);
                            console.log(xhr)
                        }
                })

        }
    }
 
  }


