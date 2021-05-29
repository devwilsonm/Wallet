var btnSearch = document.getElementById("btnSearch");

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
    $('#tabla').DataTable({
        "processing": true,
        destroy: true,
        "data": data.results,
        "columns": [
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

}