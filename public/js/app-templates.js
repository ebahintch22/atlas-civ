
 var tmplt_details_hard =   `
	<div class="pane-header">
	 	<span>
	 		<strong> {{ ADM_NAME }} </strong> 
	 	</span>
	 	<a href="#" id="close-details"  onclick="hideDetails(); return false;">    
	 		<i class="fa fa-window-close fa-1x"></i>  
	 	</a>
	 </div>
	 <div class="enveloppe">
		 <table class="detail-table">
		 	{{{ HTML_TABLE_ROWS}}}
		 </table>
	</div>	`


var tmplt_key_select =  `
	<label for="var_selector"> Choisir l'indicateur à cartographier : </label><br/>
	<select id="select-key" name="var_selector" >
		{{#data_fields}}
		 	<option value = "{{fld_name}}"" {{field_selected}}> {{short_name}}  </option>
		{{/data_fields}}
	</select>
`

var tmplt_table_select = `
	<label for="table_selector"> Choisir une thématique : </label><br/>
	<select id="select-table" name="table_selector" >
		{{#table_details}}
		     {{#valid}}<option value = "{{name}}"" {{table_selected}}> {{label}} </option>{{/valid}}
		{{/table_details}}
	</select>
`


var tmplt_palette_select = `
	<nav id="main_nav">
	  <ul>
	    <li>
			<a> Modifier la palette </a>
		  <ul>
			{{#color_palettes}}
				<li class="x{{name}}"><a href="#/action/select-palette/{{name}}">{{name}}<br>
			 		<span class="color-cll  q0-9"> </span>
			 		<span class="color-cll  q1-9"> </span>
			 		<span class="color-cll  q2-9"> </span>
			 		<span class="color-cll  q3-9"> </span> 
			 		<span class="color-cll  q4-9"> </span> 
			 		<span class="color-cll  q5-9"> </span> 
			 		<span class="color-cll  q6-9"> </span> 
			 		<span class="color-cll  q7-9"> </span> 
			 		<span class="color-cll  q8-9"> </span> </a>
		  		</li> <br>
			{{/color_palettes}}
		  </ul>
	    </li>
	  </ul>
	</nav>
	`;


var tmplt_sysinfos = `
			 <div class="pane-header">
			 	<span>
			 		<strong> SYS INFOS </strong> 
			 	</span>
			 	<a href="#" class="close-bttn"  onclick="hideSysInfos(); return false;">    
			 		<i class="fa fa-window-close fa-1x"></i>  
			 	</a>
			 </div>
			 <div class="enveloppe">
				<table class="detail-table">

					<tr><th colspan="2"> View settings </th> </tr>
					<tr><th> svg size : </th> <td> W: {{ svg_width }}; H: {{svg_height}} </td>	</tr>
					<tr><th> Range : </th> <td>  {{range}} </td></tr>
					<tr><th> Domain values : </th> <td> {{domain}} </td></tr>	

					<tr><th colspan="2"> Current Table properties </th> </tr>	
					<tr><th> Table name :  </th> <td>{{table.name}}   </td></tr>	 		
					<tr><th> Table number :</th> <td>{{table.table_num }}   </td></tr>	 		
					<tr><th> Title :       </th> <td>{{table.label}}   </td></tr>	 		
					<tr><th> File path :   </th> <td>{{table.path}} </td></tr>	 		
					<tr><th> Data source : </th> <td>{{table.source}} </td></tr>	 		

					<tr><th colspan="2"> Current field properties </th> </tr>	 		
					<tr><th> key name : </th>    <td>    {{field.fld_name}}   </td></tr>	 		
					<tr><th> Short name : </th> <td>    {{field.short_name}} </td></tr>	 		
					<tr><th> Long name : </th> <td>    {{field.long_name}} </td></tr>	 		
					<tr><th> Unit : </th> <td>    {{field.unit}} </td></tr>	 		
				</table>
			</div>`;


    Mustache.parse(tmplt_details_hard);
    Mustache.parse(tmplt_key_select);
    Mustache.parse(tmplt_table_select);
    Mustache.parse(tmplt_table_select);
    Mustache.parse(tmplt_sysinfos);