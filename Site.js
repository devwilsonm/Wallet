var btnSearch = document.getElementById("btnSearch");
var card = document.getElementById("cardDetalle");

document.addEventListener("DOMContentLoaded", function (event) {

    btnSearch.addEventListener("click", async (e) => {

        let url = "https://api.alienworlds.io/v1/alienworlds/nfts?miner=" + document.getElementById("txtToken").value;

        await fetch(url).then(response => response.json())
            .then(data => {

                LoadDatatable(data);
            }
            );
    });
});

function LoadDatatable(data){
    var dt = $('#tabla').DataTable({
        "processing": true,
        destroy: true,
        "data": data.results,
        "columns": [
            {
                "class":          "details-control",
                "orderable":      false,
                "data":           null,
                "defaultContent": '<button type="button" class="btn btn-outline-info"><i class="ri-file-info-fill"></i></button>'
            },
            { "data": "miner" },
            { "data": "land_id" },
            { "data": "rand1" },
            { "data": "rand2" },
            { "data": "rand3" },
            { "data": "template_id" },
            { "data": "block_num" },
            { "data": "block_timestamp" },
            { "data": "global_sequence" }
        ]
    });

    // Array to track the ids of the details displayed rows
    var detailRows = [];
 
    $('#tabla tbody').on( 'click', 'tr td.details-control', function () {
        var tr = $(this).closest('tr');
        var row = dt.row( tr );
        var idx = $.inArray( tr.attr('id'), detailRows );
 
        if ( row.child.isShown() ) {
            tr.removeClass( 'details' );
            row.child.hide();
 
            // Remove from the 'open' array
            detailRows.splice( idx, 1 );
        }
        else {
            tr.addClass( 'details' );
            row.child( format( row.data() ) ).show();
 
            // Add to the 'open' array
            if ( idx === -1 ) {
                detailRows.push( tr.attr('id') );
            }
        }
    } );
 
    // On each draw, loop over the `detailRows` array and show any child rows
    dt.on( 'draw', function () {
        $.each(detailRows, function ( i, id ) {
            $('#'+id+' td.details-control').trigger( 'click' );
        } );
    } );
}

function format ( d ) {
    let result="";
    let sparams="";

    card.querySelector(".card .card-header").innerText="params:";

    for (const property in d.params) {
        sparams +=''+`${property}: ${d.params[property]}`+'<br>';
      }

      card.querySelector(".card .card-text").innerHTML=sparams;
      
      result+=card.innerHTML;

      card.querySelector(".card .card-header").innerText="template_data:";
   
      sparams="";
      for (const property in d.template_data) {
        sparams +=''+`${property}: ${d.template_data[property]}`+'<br>';
      }

      card.querySelector(".card .card-text").innerHTML=sparams;
      
      result+=card.innerHTML;

    return '<div class="row">'+result+'</div>';
}