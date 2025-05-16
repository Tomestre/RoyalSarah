document.getElementById('qualificationForm').addEventListener('submit', function(event) {
    event.preventDefault();
    var visa = document.getElementById('visa').value;
    var nif = document.getElementById('nif').value;
    var niss = document.getElementById('niss').value;
    var cplp = document.getElementById('cplp').value;
    var morada = document.getElementById('morada').value;

    if (!visa || !nif || !niss || !cplp || !morada) {
        alert('Por favor, preencha todos os campos.');
        return;
    }

    if (visa === 'turista') {
        document.getElementById('errorMessage').style.display = 'block';
        document.getElementById('whatsappButton').style.display = 'none';
    } else {
        var documents = [];
        if (nif === 'sim') documents.push('NIF');
        if (niss === 'sim') documents.push('NISS');
        if (cplp === 'sim') documents.push('CPLP');
        var docsString = documents.length > 0 ? 'já possuo ' + documents.join(', ') : 'não possuo nenhum dos documentos';

        var message = 'Olá, gostaria de agendar uma consulta gratuita. Tenho o visto de ' + visa + '. ' + docsString + '.';
        var encodedMessage = encodeURIComponent(message);
        var whatsappUrl = 'https://wa.me/351911545582?text=' + encodedMessage;

        // Exibe o botão
        document.getElementById('whatsappButton').style.display = 'block';
        document.getElementById('errorMessage').style.display = 'none';

        // Remove listeners anteriores para evitar duplicação
        var whatsappLink = document.getElementById('whatsappLink');
        whatsappLink.removeEventListener('click', handleWhatsAppClick); // Remove listener antigo, se existir
        whatsappLink.addEventListener('click', handleWhatsAppClick); // Adiciona novo listener

        function handleWhatsAppClick(event) {
            event.preventDefault();
            
            window.open(whatsappUrl, '_blank');
            gtag_report_conversion("https://wa.me/351911545582");
        }
    }
});