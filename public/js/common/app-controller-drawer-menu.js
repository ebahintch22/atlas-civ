

function create_drawerMenu_controller(elt_id , options){

  var componentHtml =  `

      <header>
          <input type="checkbox" id="${options.id}"/>
          <label class="fa ${options.toggler.fa_icon} menu-bar" for="${options.id}"></label>
          <span style="font-size: 5vmin;font-weight: 700;color:#fff "> ${options.app_name} </span> 
                <sub style="font-size: 3.5vmin; color:orange; font-weight: 600; ">  ${options.module_name} </sub> 
          <div class="drawer">
            <div class="scroll-xxx" style="position:relative; width=100%; height=600px;overflow-y=auto;">
                <nav>
                  <ul>
                     ${ render_drawer_menuitems(options.menu_items) }
                     <li> <img src="./images/banner-personnel-sante.jpg" alt="Girl in a jacket" width="100%" ></li>
                  </ul>
                </nav>
            </div>
          </div>
      </header>`;

  d3.select(elt_id).html(componentHtml );
  //console.log( componentHtml );


  return {
      toggle_menu: function(){
        
        var _state = document.getElementById( `${options.id}` ).checked ;
        document.getElementById( `${options.id}` ).checked = !_state
      },
      refresh_options : function(options) {
        __refresh_options(options)
      }
  }

  function render_drawer_menuitems( item_arr){
    return( item_arr.reduce(
        function( accu, menu, idx ){
          accu = accu + render_item_1(menu, idx);
          return (accu)
        }, "")
    )
    function render_item_1( item, idx ){
      var key = UTIL.random_string("item") + idx
      var html = `
          <li>
              <input class="yyyy" type="checkbox" id="${key}" style="display:none"/>
              <label class="xxxx" for="${key}"> <i class="fa ${item.fa_icon}"></i> ${item.menu_label} <i class="zzzz fa fa-caret-right pull-right" ></i></label>
              ${ submenu_box_insert_if( item)}
                
          </li> ` ;
      return ( html );
    }

    function submenu_box_insert_if( item){
      var html = (item.is_developpable) ? 
      `<div id="${item.container_ref}" class="sub-menu-box" style="overflow-y: auto;"> 
      </div>` : `` ;

      return (html)
    }
  }
}
