$(() => {
    $('#files').load('http://localhost:4008/file')

    var data = new FormData()

    /* $('#filesForm').change((e) => {
        form = new FormData();
        form.append('file', e.target.files[0]); // para apenas 1 arquivo
        name = e.target.files[0].name; // para capturar o nome do arquivo com sua extenção
    }); */

    $('#add').click(e => {
        e.preventDefault()
        data.append('file', $('#file')[0].files[0])
        data.append('desc', $('#desc').val())
        $('#files').append('<tr> <td> <a href="http://localhost:4008/uploads/' + $('#file')[0].files[0].name + '" target="_blank">' + $('#file')[0].files[0].name + '</a> </td>' + '<td>' + $('#desc').val() + '</td> </tr>')
        ajaxPost()
        $('#filesForm')[0].reset();
    })

    function ajaxPost() {
        $.ajax({
            type: "POST",
            method: 'POST',
            //contentType: "application/json",
            url: "http://localhost:4008/file/save",
            data: data,
            cache: false,
            contentType: false,
            processData: false,
            dataType: 'json',
            success: f => alert('Ficheiro ' + JSON.stringify(f.name) + ' adicionado com sucesso!'),
            error: e => {
                alert('Erro no post: ' + e.status)
            }
        })
    }
})