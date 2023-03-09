
$(document).ready(function() {
    fetchStudentList();
    $("body").on("click", ".removeStudent", function(){
        const ra = $(this).data("ra");
        const confirmation = confirm (
            "Voce realmente deseja eliminar estes estudantes?"
        );

        if(confirmation) {
            deleteStudent(ra);
            
        }
        
        
    });

    $("formSearchStudent").submit((Event) => {
        Event.preventDefaut();
        fetchStudentList(Event.target.searchInput.value);      
    });
});

const deleteStudent = (ra) =>
    fetch(`http://localhost:3000/students/delete/${ra}`, {
        method: "DELETE",
    })
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        alert(data.message);
        fetchStudentList();
    });

function fetchStudentList(searchQuery = "") {
    $(".loader").show("fast");
    $(".content-page").hide("slow");

    fetch(`http://localhost:3000/students/List/${searchQuery}`)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            const table = $("#studentsList tbody");
            table.html("");
            data.map((student) => {
                table.append(`
                
                <tr>
                    
                    <td>${student.ra}</td>
                    <td>${student.nome}</td>
                    <td>${student.cpf}</td>
                    <td>
                        
                        <a href="studentManager.html?ra=${student.ra}">Editar</a>
                        <a class="removeStudent" data-ra="${student.ra}" href="#">Excluir</a>
                        
                    </td> 
                </tr>    

            `);
        }); 
        
        $(".loader").hide("fast");
        $(".content-page").show("slow");
    });

}