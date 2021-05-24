

$('#add_employee').submit(function(event){
    alert("Employee created succesfully!");
})

$("#update_employee").submit(function(event){
    event.preventDefault();

    var unindexed_array= $(this).serializeArray();
    var data={};
    $.map(unindexed_array, function(n,i) {
        data[n['name']] =n['value']
    })
    console.log(unindexed_array);

    var request={
        "url":`http://localhost:5000/api/employees/${data.id}`,
        "method" : "PUT",
        "data": data
    }

    $.ajax(request).done(function(response){
        alert("Employee updated succesfully.")
    })
})

if(window.location.pathname =="/"){
    $ondelete= $(".table tbody td a.delete");
    $ondelete.click(function(){
        var id= $(this).attr("data-id")

        var request={
            "url":`http://localhost:5000/api/employees/${id}`,
            "method" : "DELETE",
        }
        if(confirm("Do you really want to delete this employee?")){
            $.ajax(request).done(function(response){
                alert("Employee deleted succesfully.");
                location.reload()
            })
        }
    })
}