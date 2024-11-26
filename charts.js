
const ALAVANCAGEM = "Alavancagem";
const LIQUIDEZ_CORRENTE = "LiquidezCorrente";
const MARGEM_LIQUIDA = "MargemLiquida";
const MARTEM_OPERACIONAL = "MargemOperacional";

const CHART_ALAVANCAGEM = "Alavancagem";
const CHART_LIQUIDEZ_CORRENTE = "Liquidez corrente";
const CHART_MARGEM_LIQUIDA = "Margem líquida";
const CHART_MARTEM_OPERACIONAL = "Margem operacional";

const EBITDA = "Ebitda";
const RECEITA_LIQUIDA = "ReceitaLiquida";
const CUSTOS = "Custos";
const LUCRO_LIQUIDO = "LucroLiquido";


const CHART_EBITDA = "Ebitda";
const CHART_RECEITA_LIQUIDA = "Receita líquida";
const CHART_CUSTOS = "Custos";
const CHART_LUCRO_LIQUIDO = "Lucro líquido";

const ROE = "ROE";
const DIVIDA_LIQUIDA = "DividaLiquida";

const CHART_ROE = "Retorno sobre o patrimônio";
const CHART_DIVIDA_LIQUIDA = "Dívida líquida";




var EmpresasArray = [];
function dataTreatment(){
    Banco['MargemLiquida'].replace('null','0');
    Banco['MargemOperacional'].replace('null','0');
    Banco['LiquidezCorrente'].replace('null','0');
    Banco['Alavancagem'].replace('null','0');
    Banco['Ebitda'].replace('null','0');
    Banco['ReceitaLiquida'].replace('null','0');
    Banco['Custos'].replace('null','0');
    Banco['LucroLiquido'].replace('null','0');
    Banco['ROE'].replace('null','0');
    Banco['DividaLiquida'].replace('null','0');
}


    SelectSetor();
    SelectPorte();
    SelectRegiao();
    SelectUF();


function SelectPorte() {
    var portes = banco.map(x => x.Porte);
    var uniquePortes = [...new Set(portes)].sort();
    
    const porteSelect = document.getElementById("porte");
    
    // Limpa as opções existentes
    porteSelect.options.length = 0;
    
    // Adiciona opção padrão
    porteSelect.options.add(new Option("Todos os Portes", ""));
    
    // Adiciona as opções de porte
    uniquePortes.forEach((porte, index) => {
        porteSelect.options.add(new Option(porte, index + 1));
    });
}

function SelectRegiao() {
    var regioes = banco.map(x => x.Região);
    var uniqueRegioes = [...new Set(regioes)].sort();
    
    const regiaoSelect = document.getElementById("regiao");
    
    // Limpa as opções existentes
    regiaoSelect.options.length = 0;
    
    // Adiciona opção padrão
    regiaoSelect.options.add(new Option("Todas as Regiões", ""));
    
    // Adiciona as opções de região
    uniqueRegioes.forEach((regiao, index) => {
        regiaoSelect.options.add(new Option(regiao, index + 1));
    });
}

function SelectUF() {
    var ufs = banco.map(x => x.UF);
    var uniqueUFs = [...new Set(ufs)].sort();
    
    const ufSelect = document.getElementById("uf");
    
    // Limpa as opções existentes
    ufSelect.options.length = 0;
    
    // Adiciona opção padrão
    ufSelect.options.add(new Option("Todas as UFs", ""));
    
    // Adiciona as opções de UF
    uniqueUFs.forEach((uf, index) => {
        ufSelect.options.add(new Option(uf, index + 1));
    });
}

// Funções de filtro individual
function handlePorteChange() {
    atualizarEmpresas();
}

function handleRegiaoChange() {
    atualizarEmpresas();
}

function handleUFChange() {
    atualizarEmpresas();
}



/* ------------------ Início Eventos DropDown List -------------------------*/
//Renomear Pais para Região
//SelectSetor();


function SelectSetor(){

    var setor = banco.filter(x=>x.Setor);

    var uniqueNames = [];
    for(i = 0; i< setor.length; i++){ 
        if(uniqueNames.indexOf(setor[i].Setor) === -1){
            uniqueNames.push(setor[i].Setor)    
        }        
    }

    uniqueNames = uniqueNames.sort()

    const setorSelect = document.getElementById("setor");


      for(i = 0; i< uniqueNames.length; i++){    
            option = new Option(uniqueNames[i], i);
            setorSelect.options[setorSelect.options.length] = option; 
        }

}

function CarregaSeguimentos(){

    var select = document.getElementById('setor');
    var value = select.options[select.selectedIndex].text;

    SelectSegmentos(value);

}

function SelectSegmentos(segmentoFilter){

    var segmentoFilho = banco.filter(x=>x.Setor == segmentoFilter);

    var uniqueNames = [];

    for(i = 0; i< segmentoFilho.length; i++){ 
        if(uniqueNames.indexOf(segmentoFilho[i].Segmento) === -1){
            uniqueNames.push(segmentoFilho[i].Segmento)    
        }        
    }


    uniqueNames = uniqueNames.sort()
    uniqueNames.unshift("Selecione um segmento")

    const segmentosSelect = document.getElementById("segmentos");

    for (i = segmentosSelect.options.length -1; i >= 0; i--) {
        segmentosSelect.options[i] = null;
    }

      for(i = 0; i< uniqueNames.length; i++){    
            option = new Option(uniqueNames[i], i);
            segmentosSelect.options[segmentosSelect.options.length] = option;  
        }

}

//Alterada Filtros Individuais
function CarregaEmpresas() {
    var selectSegmento = document.getElementById('segmentos');
    var selectPorte = document.getElementById('porte');
    var selectRegiao = document.getElementById('regiao');
    var selectUF = document.getElementById('uf');

    var segmento = selectSegmento.options[selectSegmento.selectedIndex].text;
    var porte = selectPorte.options[selectPorte.selectedIndex].text;
    var regiao = selectRegiao.options[selectRegiao.selectedIndex].text;
    var uf = selectUF.options[selectUF.selectedIndex].text;

    if (segmento !== "Selecione um segmento") {
        atualizarEmpresas();
    } else {
        CarregarDropDowEmpresas("empresa1", ["Selecione uma empresa"]);
        CarregarDropDowEmpresas("empresa2", ["Selecione uma empresa"]);
        CarregarDropDowEmpresas("empresa3", ["Selecione uma empresa"]);
    }
}

// Nova função para atualizar a lista de empresas com base em todos os filtros
function atualizarEmpresas() {
    var selectSegmento = document.getElementById('segmentos');
    var selectPorte = document.getElementById('porte');
    var selectRegiao = document.getElementById('regiao');
    var selectUF = document.getElementById('uf');

    var segmento = selectSegmento.options[selectSegmento.selectedIndex].text;
    var porte = selectPorte.options[selectPorte.selectedIndex].text;
    var regiao = selectRegiao.options[selectRegiao.selectedIndex].text;
    var uf = selectUF.options[selectUF.selectedIndex].text;

    var empresasFiltradas = banco.filter(empresa => {
        var matchSegmento = segmento === "Selecione um segmento" || empresa.Segmento === segmento;
        var matchPorte = porte === "Todos os Portes" || empresa.Porte === porte;
        var matchRegiao = regiao === "Todas as Regiões" || empresa.Região === regiao;
        var matchUF = uf === "Todas as UFs" || empresa.UF === uf;

        return matchSegmento && matchPorte && matchRegiao && matchUF;
    });

    var uniqueNames = [...new Set(empresasFiltradas.map(x => x.Empresa))].sort();
    uniqueNames.unshift("Selecione uma empresa");

    CarregarDropDowEmpresas("empresa1", uniqueNames);
    CarregarDropDowEmpresas("empresa2", uniqueNames);
    CarregarDropDowEmpresas("empresa3", uniqueNames);
}

function CarregarDropDowEmpresas(ElementId, uniqueNames){
    const empresasSelect = document.getElementById(ElementId);

    for (let i = empresasSelect.options.length -1; i >= 0; i--) {
        empresasSelect.options[i] = null;
    }

    for(let i = 0; i < uniqueNames.length; i++){    
        option = new Option(uniqueNames[i], i);
        empresasSelect.options[empresasSelect.options.length] = option;  
    }
}

 /*------------------ Fim Eventos DropDown List -------------------------*/

/* ------------------ Início Eventos CheckBox -------------------------*/

function addCheckbox(name, i) {
    var container = $('#listEmpresas');


    $('<div>', {
        id: 'checkbox'+i,
        class: 'form-check form-check-inline listEmpresas'
    }).appendTo(container);

    var checkCriado = $('#checkbox'+i);

    $('<input />', { type: 'checkbox', id: 'empresa'+i, value: name, class: 'form-check-input', onclick: 'QuantidadeEmpresa()' }).appendTo(checkCriado);
    $('<label />', { 'for': 'empresa'+i, text: name, class: 'form-check-label' }).appendTo(checkCriado);
 }


 function QuantidadeEmpresa(){
     //alert('aki');
     var cont = 0;

     EmpresasArray = [];

     $("input:checked").each(function(){
        //console.log($(this).attr("id"));

        var checked = ($(this).val());        

        if ($(this).is(':checked')) {            
            EmpresasArray.push(checked);
        } else {
            EmpresasArray.splice($.inArray(checked, EmpresasArray),1);
        }

        cont = cont + 1;
      });

      console.log('Total selecionados: ' + cont);

      if(cont == 6){
        console.log('O máximo de empresas ja forma selecionadas: ' + cont);

        $('input[type=checkbox]').each(function() {
            if (!this.checked) this.disabled = true;
          });

      }
      else{
        $('input[type=checkbox]').each(function() {
            if (!this.checked) this.disabled = false;
          });
      }


    //  $(".listEmpresas").click(function(){

    //   });
 }

 /* ------------------ Fim Eventos CheckBox -------------------------*/


 /* ------------------ Início Eventos Paramentos Url -------------------------*/
function getParamUrl(){

    //Array de parametros 'chave=valor'
    var params = decodeURIComponent(window.location.search).substring(1).split('&');

    //Criar objeto que vai conter os parametros
    var paramArray = {};

    //Passar por todos os parametros
    for(var i=0; i<params.length; i++) {
        //Dividir os parametros chave e valor
        var param = params[i].split('=');

        //Adicionar ao objeto criado antes
        paramArray[param[0]] = param[1];
    }

    // console.log(paramArray)

    //console.log(paramArray['s'])

    document.getElementById('textSegmento').innerHTML = document.getElementById('textSegmento').innerHTML.replace("[segmento]", String(paramArray['s']).replace(/\+/g,' ').replace(/----/g, ''));

    SelectSegmentos(paramArray['s'])

}

function getSegmentoParamUrl(){

    //Array de parametros 'chave=valor'
    var params = decodeURIComponent(window.location.search).substring(1).split('&');

    //Criar objeto que vai conter os parametros
    var paramArray = {};

    //Passar por todos os parametros
    for(var i=0; i<params.length; i++) {
        //Dividir os parametros chave e valor
        var param = params[i].split('=');

        //Adicionar ao objeto criado antes
        paramArray[param[0]] = param[1];
    }

    // console.log(paramArray)

    console.log(String(paramArray['s']).replace(/\+/g,' ').replace(/----/g, ''))

    return paramArray['s'].replace(/\+/g,' ').replace(/----/g, '');

}

/* ------------------ Fim Eventos Paramentos Url -------------------------*/


/* ------------------ Início Eventos Chart -------------------------*/

/* ------------------ Início Configuração Chart -------------------------*/

function chartName(id)
{
    var nameChart = "";

    if(id == 1){
        nameChart = CHART_ALAVANCAGEM;
    }else if(id == 2){
        nameChart = CHART_LIQUIDEZ_CORRENTE;
    }
    else if(id == 3){
        nameChart = CHART_MARGEM_LIQUIDA;
    } 
    else if(id == 4){
        nameChart = CHART_MARTEM_OPERACIONAL;
    }
    else if(id == 5){
        nameChart = CHART_EBITDA;
    }
    else if(id == 6){
        nameChart = CHART_RECEITA_LIQUIDA;
    } 
    else if(id == 7){
        nameChart = CHART_CUSTOS;
    }
    else if(id == 8){
        nameChart = CHART_LUCRO_LIQUIDO;
    }
    else if(id == 9){
        nameChart = CHART_ROE;
    } 
    else if(id == 10){
        nameChart = CHART_DIVIDA_LIQUIDA;
    } 

    return nameChart;
}

function chartColName(id)
{
    var nameChart = "";

    //DisplayNone();

    if(id == 1){
        nameChart = ALAVANCAGEM;
        document.getElementById("tpAF").style.display = "block";
    }else if(id == 2){
        nameChart = LIQUIDEZ_CORRENTE;
        document.getElementById("tpLC").style.display = "block";
    }else if(id == 3){
        nameChart = MARGEM_LIQUIDA;
        document.getElementById("tpML").style.display = "block";
    }else if(id == 4){
        nameChart = MARTEM_OPERACIONAL;
        document.getElementById("tpMO").style.display = "block";
    }else if(id == 5){
        nameChart = EBITDA;
        document.getElementById("tpE").style.display = "block";
    }else if(id == 6){
        nameChart = RECEITA_LIQUIDA;
        document.getElementById("tpRL").style.display = "block";
    }else if(id == 7){
        nameChart = CUSTOS;
        document.getElementById("tpC").style.display = "block";
    }else if(id == 8){
        nameChart = LUCRO_LIQUIDO;
        document.getElementById("tpLL").style.display = "block";
    }else if(id == 9){
        nameChart = ROE;
        document.getElementById("tpROE").style.display = "block";
    }else if(id == 10){
        nameChart = DIVIDA_LIQUIDA;
        document.getElementById("tpDL").style.display = "block";
    }
    return nameChart;
}

function DrawnChartDiv(id)
{
    var divChart = "";

    if(id == 1){
        divChart = "chart_div_A";
    }else if(id == 2){
        divChart = "chart_div_LC";
    }else if(id == 3){
        divChart = "chart_div_ML";
    }else if(id == 4){
        divChart = "chart_div_MO";
    }else if(id == 5){
        divChart = "chart_div_E";
    }else if(id == 6){
        divChart = "chart_div_RL";
    }else if(id == 7){
        divChart = "chart_div_C";
    }else if(id == 8){
        divChart = "chart_div_LL";
    }else if(id == 9){
        divChart = "chart_div_ROE";
    }else if(id == 10){
        divChart = "chart_div_DL";
    }

    return divChart;
}


function DisplayNone(){
    document.getElementById("tpAF").style.display = "none";
    document.getElementById("tpLC").style.display = "none";
    document.getElementById("tpML").style.display = "none";
    document.getElementById("tpMO").style.display = "none";
    document.getElementById("tpE").style.display = "none";
    document.getElementById("tpRL").style.display = "none";
    document.getElementById("tpC").style.display = "none";
    document.getElementById("tpLL").style.display = "none";
    document.getElementById("tpROE").style.display = "none";
    document.getElementById("tpDL").style.display = "none";
    
}

/* ------------------ Fim Configuração Chart -------------------------*/

/* ------------------ Início Geração Chart -------------------------*/

function drawChart(id){

    var select = document.getElementById('segmentos');
    var value = select.options[select.selectedIndex].value;

    showChart(id);

}

function showChart(id){
// console.log(id);
    // Load the Visualization API and the corechart package.
    // Set a callback to run when the Google Visualization API is loaded.
    if(id > 0){
        google.charts.load("visualization", "1", {'packages':['bar']});
        google.charts.setOnLoadCallback(drawChartMargemLiquida(id));
    }else { 
        google.charts.load('current', {'packages':['bar']});
        google.charts.setOnLoadCallback(drawChartMargemOperacional(0));        
    }    

}




// Callback that creates and populates a data table,
// instantiates the pie chart, passes in the data and
// draws it.
function drawChartMargemLiquida(id) {
    var select = document.getElementById('segmentos');
    var value = select.options[select.selectedIndex].text;
    var segmento = banco.filter(x => x.Segmento == value);
    var empresas = segmento.filter(x => x.Empresa.includes(EmpresasArray));
    var chartBuild = [];
    var Header = ['Element', 'valor', { role: 'style' }];
    chartBuild.push(Header);

    for (let i = 0; i < segmento.length; i++) {
        var temp = [];
        temp.push(segmento[i].Ano); // Mantido como número
        var valueToReplace = segmento[i][chartColName(id)];
        if (valueToReplace != null) {
            temp.push(parseFloat(valueToReplace.toString().replace(',', '.'))); // Converter para float
        } else {
            temp.push(0); // Ou outro valor padrão
        }
        temp.push('stroke-color: #836FFF; stroke-width: 1; fill-color: #473C8B');
        chartBuild.push(temp);
    }

    var data = new google.visualization.arrayToDataTable(chartBuild);
    var view = new google.visualization.DataView(data);
    view.setColumns([0, 1, { calc: "stringify", sourceColumn: 1, type: "string", role: "annotation" }, 2]);

    var options = {
        width: 'auto',
        height: 400,
        bar: { groupWidth: "65%" },
        legend: { position: "none" },
    };

    var chart = new google.visualization.LineChart(document.getElementById(DrawnChartDiv(id)));

    if (id == 2) {
        var formatter = new google.visualization.NumberFormat({
            decimalSymbol: ',',
            groupingSymbol: '.',
            negativeColor: 'red',
            negativeParens: true,
            fractionDigits: 2,
        });
        formatter.format(data, 1);
    } else {
        var formatter = new google.visualization.NumberFormat({
            decimalSymbol: ',',
            groupingSymbol: '.',
            negativeColor: 'red',
            negativeParens: true,
            fractionDigits: 0,
            suffix: '%'
        });
        formatter.format(data, 1);
    }

    chart.draw(view, options);
}


function zeroChart(){
        google.charts.load('current', {'packages':['corechart']});
        google.charts.setOnLoadCallback(drawChartMargemOperacional);
}

function ajustaValoresNaN(array){

    for (let i = 0; i < array.length; i++) {

        if(isNaN(array[i])){
            array[i] = 0;
        }

    }
    return array;
}

function convertToInt(valor){
    return parseInt(valor.replace('.', '').replace('.', '').replace('.', '').replace(',','.'))
}

function getAtivoCirculante(){
    var ativoCirculante2019 = convertToInt($("#ativoCirculante2019").val()) ;
    var ativoCirculante2020 = convertToInt($("#ativoCirculante2020").val()) ;
    var ativoCirculante2021 = convertToInt($("#ativoCirculante2021").val()) ;
    var ativoCirculante2022 = convertToInt($("#ativoCirculante2022").val()) ;
    var ativoCirculante2023 = convertToInt($("#ativoCirculante2023").val()) ;

    var valores_ativoCirculante = [ativoCirculante2019, ativoCirculante2020, ativoCirculante2021, ativoCirculante2022, ativoCirculante2023];

    return ajustaValoresNaN(valores_ativoCirculante);
}

function getAtivoTotal(){
    var ativoTotal2019 = convertToInt($("#ativoTotal2019").val()) ;
    var ativoTotal2020 = convertToInt($("#ativoTotal2020").val()) ;
    var ativoTotal2021 = convertToInt($("#ativoTotal2021").val()) ;
    var ativoTotal2022 = convertToInt($("#ativoTotal2022").val()) ;
    var ativoTotal2023 = convertToInt($("#ativoTotal2023").val()) ; // Adicionar este

    var valores_ativoTotal = [ativoTotal2019, ativoTotal2020, ativoTotal2021, ativoTotal2022, ativoTotal2023];

    return ajustaValoresNaN(valores_ativoTotal);
}

function getPassivoCirculante(){
    var passivoCirculante2019 = convertToInt($("#passivoCirculante2019").val()) ;
    var passivoCirculante2020 = convertToInt($("#passivoCirculante2020").val()) ;
    var passivoCirculante2021 = convertToInt($("#passivoCirculante2021").val()) ;
    var passivoCirculante2022 = convertToInt($("#passivoCirculante2022").val()) ;
    var passivoCirculante2023 = convertToInt($("#passivoCirculante2023").val()) ; // Adicionar este

    var valores_passivoCirculante = [passivoCirculante2019, passivoCirculante2020, passivoCirculante2021, passivoCirculante2022, passivoCirculante2023];

    return ajustaValoresNaN(valores_passivoCirculante);
}

function getPassivoNaoCirculante(){
    var passivoNaoCirculante2019 = convertToInt($("#passivoNaoCirculante2019").val()) ;
    var passivoNaoCirculante2020 = convertToInt($("#passivoNaoCirculante2020").val()) ;
    var passivoNaoCirculante2021 = convertToInt($("#passivoNaoCirculante2021").val()) ;
    var passivoNaoCirculante2022 = convertToInt($("#passivoNaoCirculante2022").val()) ;
    var passivoNaoCirculante2023 = convertToInt($("#passivoNaoCirculante2023").val()) ; // Adicionar este

    var valores_passivoNaoCirculante = [passivoNaoCirculante2019, passivoNaoCirculante2020, passivoNaoCirculante2021, passivoNaoCirculante2022, passivoNaoCirculante2023];

    return ajustaValoresNaN(valores_passivoNaoCirculante);
}

function getPatrinonioLiquido(){
    var patrimonioLiquido2019 = convertToInt($("#patrimonioLiquido2019").val()) ;
    var patrimonioLiquido2020 = convertToInt($("#patrimonioLiquido2020").val()) ;
    var patrimonioLiquido2021 = convertToInt($("#patrimonioLiquido2021").val()) ;
    var patrimonioLiquido2022 = convertToInt($("#patrimonioLiquido2022").val()) ;
    var patrimonioLiquido2023 = convertToInt($("#patrimonioLiquido2023").val()) ; // Adicionar este

    var valores_patrimonioLiquido = [patrimonioLiquido2019, patrimonioLiquido2020, patrimonioLiquido2021, patrimonioLiquido2022, patrimonioLiquido2023];

    return ajustaValoresNaN(valores_patrimonioLiquido);
}

function getFaturamentoLiquido(){
    var faturamentoLiquido2019 = convertToInt($("#faturamentoLiquido2019").val()) ;
    var faturamentoLiquido2020 = convertToInt($("#faturamentoLiquido2020").val()) ;
    var faturamentoLiquido2021 = convertToInt($("#faturamentoLiquido2021").val()) ;
    var faturamentoLiquido2022 = convertToInt($("#faturamentoLiquido2022").val()) ;
    var faturamentoLiquido2023 = convertToInt($("#faturamentoLiquido2023").val()) ; // Adicionar este

    var valores_faturamentoLiquido = [faturamentoLiquido2019, faturamentoLiquido2020, faturamentoLiquido2021, faturamentoLiquido2022, faturamentoLiquido2023];

    return ajustaValoresNaN(valores_faturamentoLiquido);
}

function getCustosGerais(){
    var custosGerais2019 = convertToInt($("#custosGerais2019").val()) ;
    var custosGerais2020 = convertToInt($("#custosGerais2020").val()) ;
    var custosGerais2021 = convertToInt($("#custosGerais2021").val()) ;
    var custosGerais2022 = convertToInt($("#custosGerais2022").val()) ;
    var custosGerais2023 = convertToInt($("#custosGerais2023").val()) ; // Adicionar este

    var valores_custosGerais = [custosGerais2019, custosGerais2020, custosGerais2021, custosGerais2022, custosGerais2023];

    return ajustaValoresNaN(valores_custosGerais);
}

function getLucroLiquido(){
    var lucroLiquido2019 = convertToInt($("#lucroLiquido2019").val()) ;
    var lucroLiquido2020 = convertToInt($("#lucroLiquido2020").val()) ;
    var lucroLiquido2021 = convertToInt($("#lucroLiquido2021").val()) ;
    var lucroLiquido2022 = convertToInt($("#lucroLiquido2022").val()) ;
    var lucroLiquido2023 = convertToInt($("#lucroLiquido2023").val()) ; // Adicionar este

    var valores_lucroLiquido = [lucroLiquido2019, lucroLiquido2020, lucroLiquido2021, lucroLiquido2022, lucroLiquido2023];

    return ajustaValoresNaN(valores_lucroLiquido);
}

function getROE(){
    var ROE2019 = convertToInt($("#ROE2019").val()) ;
    var ROE2020 = convertToInt($("#ROE2020").val()) ;
    var ROE2021 = convertToInt($("#ROE2021").val()) ;
    var ROE2022 = convertToInt($("#ROE2022").val()) ;
    var ROE2023 = convertToInt($("#ROE2023").val()) ; // Adicionar este

    var valores_ROE = [ROE2019, ROE2020, ROE2021, ROE2022, ROE2023];

    return ajustaValoresNaN(valores_ROE);
}

function getDividaLiquida(){
    var dividaLiquida2019 = convertToInt($("#dividaLiquida2019").val()) ;
    var dividaLiquida2020 = convertToInt($("#dividaLiquida2020").val()) ;
    var dividaLiquida2021 = convertToInt($("#dividaLiquida2021").val()) ;
    var dividaLiquida2022 = convertToInt($("#dividaLiquida2022").val()) ;
    var dividaLiquida2023 = convertToInt($("#dividaLiquida2023").val()) ; // Adicionar este

    var valores_dividaLiquida = [dividaLiquida2019, dividaLiquida2020, dividaLiquida2021, dividaLiquida2022, dividaLiquida2023];

    return ajustaValoresNaN(valores_dividaLiquida);
}

function CalcularDadosChartCliente(AtivoTotal, PassivoCirculante, PassivoNaoCirculante, PatrimonioLiquido, FaturamentoLiquido, CustosGerais, LucroLiquido, ROE, DividaLiquida){

    //Patrimônio Líq.: Ativo Total -  Passivo Circulante - Passivo Não Circulante :1.000.000
    //Alavancagem: (Passivo Circ + Passivo Não Circ)/Patrimônio Líq.
    //Liquidez: Ativo Total / (Passivo Circulante + Passivo Não Circulante)
    //Margem Líquida: Lucro Líquido / Faturamento Líquido
    //Margem Operacional: (Faturamento Líquido - Custo de Produtos e Serviços Vendidos) / Faturamento Líquido


    var anos = [2019, 2020, 2021, 2022, 2023];

    var Alavancagem = [];
    var Liquidez = [];
    var MargemLiquida = [];
    var MargemOperacional = [];
    var EBITDA = [];
    var ReceitaLiquida = [];
    var Custos = [];
    var LucroL = [];
    var Roe = [];
    var DividaL = [];


    for (let i = 0; i < anos.length; i++) {

        var resultado = 0;

        //Alavancagem
        resultado = (AtivoTotal[i] - PassivoCirculante[i] - PassivoNaoCirculante[i]);
        resultado = (PassivoCirculante[i] + PassivoNaoCirculante[i]) / resultado;
        resultado = resultado * 100;
        Alavancagem.push( resultado );
        if(isNaN(Alavancagem[i])){ Alavancagem[i] = 0}

        //Liquidez
        resultado = AtivoTotal[i] / (PassivoCirculante[i] + PassivoNaoCirculante[i]);
        Liquidez.push( resultado );
        if(isNaN(Liquidez[i])){ Liquidez[i] = 0}

        //Margem Liquida
        resultado = ( LucroLiquido[i] / FaturamentoLiquido[i] );
        resultado = resultado * 100;
        MargemLiquida.push( resultado );
        if(isNaN(MargemLiquida[i])){ MargemLiquida[i] = 0}

        //Margem Operacional
        resultado = (FaturamentoLiquido[i] - CustosGerais[i]) / FaturamentoLiquido[i];
        resultado = resultado * 100;
        MargemOperacional.push( resultado );
        if(isNaN(MargemOperacional[i])){ MargemOperacional[i] = 0}
        //console.log((FaturamentoLiquido[i] - CustosGerais[i]) )

        //EBITDA (Corrigir)
        resultado = (FaturamentoLiquido[i] - CustosGerais[i]) / FaturamentoLiquido[i];
        resultado = resultado * 100;
        EBITDA.push( resultado );
        if(isNaN(EBITDA[i])){ EBITDA[i] = 0}

        //ReceitaLiquida
        resultado = (FaturamentoLiquido[i]);
        ReceitaLiquida.push( resultado );
        if(isNaN(ReceitaLiquida[i])){ ReceitaLiquida[i] = 0}

        //Custos
        resultado = (CustosGerais[i]);
        Custos.push( resultado );
        if(isNaN(Custos[i])){ Custos[i] = 0}

        //LucroLiquido
        resultado = (LucroLiquido[i]);
        LucroL.push( resultado );
        if(isNaN(LucroL[i])){ LucroL[i] = 0}

        // ROE
        resultado = (ROE[i]);
        Roe.push( resultado );
        if(isNaN(Roe[i])){ Roe[i] = 0}

        // Dívida Líquida
        resultado = (DividaLiquida[i]);
        DividaL.push( resultado );
        if(isNaN(DividaL[i])){ DividaL[i] = 0}

    }

    // console.log(Alavancagem);

    // console.log(Liquidez);

    // console.log(MargemLiquida);

    //console.log(MargemOperacional);

    criarGraficosCliente(anos, Alavancagem, 1);

    criarGraficosCliente(anos, Liquidez, 2);    

    criarGraficosCliente(anos, MargemOperacional, 3);

    criarGraficosCliente(anos, MargemLiquida, 4);

    criarGraficosCliente(anos, EBITDA, 5);

    criarGraficosCliente(anos, ReceitaLiquida, 6);    

    criarGraficosCliente(anos, Custos, 7);

    criarGraficosCliente(anos, LucroLiquido, 8);

    criarGraficosCliente(anos, ROE, 9);

    criarGraficosCliente(anos, DividaLiquida, 10);

}

function gerarGrafico(){

var AtivoCirculante = getAtivoCirculante();

var AtivoTotal = getAtivoTotal();

var PassivoCirculante = getPassivoCirculante();

var PassivoNaoCirculante = getPassivoNaoCirculante();

var PatrimonioLiquido = getPatrinonioLiquido();

var FaturamentoLiquido = getFaturamentoLiquido();

var CustosGerais = getCustosGerais();

var LucroLiquido = getLucroLiquido();

var ROE = getROE();

var DividaLiquida = getDividaLiquida();

CalcularDadosChartCliente(AtivoTotal, PassivoCirculante, PassivoNaoCirculante, PatrimonioLiquido, FaturamentoLiquido, CustosGerais, LucroLiquido, ROE, DividaLiquida);

var cliente_2019 = convertToInt($("#input-19").val()) ;
var cliente_2020 = parseFloat($("#input-20").val().replace('.','')) ;
var cliente_2021 = parseFloat($("#input-21").val().replace('.','')) ;
var cliente_2022 = parseFloat($("#input-22").val().replace('.','')) ;
var cliente_2023 = parseFloat($("#input-23").val().replace('.','')) ;

var valores_clientes = [cliente_2019, cliente_2020, cliente_2021, cliente_2022, cliente_2023];
//console.log(valores_clientes);
//console.log(EmpresasArray);
//drawChartCombo(valores_clientes)

$('.box-campos-cliente').hide("slow");

$('#msg-cliente').hide("slow");

}

function getSegmento(){

    var dpSegmentos = document.getElementById('segmentos');
    var vSegmentos = dpSegmentos.options[dpSegmentos.selectedIndex].text;
    return vSegmentos;
}

var colorChart = [
    {stroke: '#0058ED', fill: '#5191FF'},  // Alavancagem
    {stroke: '#328C00', fill: '#40B300'},  // Liquidez Corrente
    {stroke: '#EE9600', fill: '#FFB435'},  // Margem Operacional
    {stroke: '#0058ED', fill: '#5191FF'},  // Margem Líquida
    {stroke: '#328C00', fill: '#40B300'},  // EBITDA
    {stroke: '#EE9600', fill: '#FFB435'},  // Receita Líquida
    {stroke: '#0058ED', fill: '#5191FF'},  // Custos
    {stroke: '#328C00', fill: '#40B300'},  // Lucro Líquido
    {stroke: '#EE9600', fill: '#FFB435'},  // ROE
    {stroke: '#0058ED', fill: '#5191FF'},  // Dívida Líquida
    {stroke: '#328C00', fill: '#40B300'},  // Repetição padrão para os 3 gráficos
    {stroke: '#EE9600', fill: '#FFB435'},
    {stroke: '#0058ED', fill: '#5191FF'},
    {stroke: '#328C00', fill: '#40B300'},
    {stroke: '#EE9600', fill: '#FFB435'},
    {stroke: '#0058ED', fill: '#5191FF'},
    {stroke: '#328C00', fill: '#40B300'},
    {stroke: '#EE9600', fill: '#FFB435'},
    {stroke: '#0058ED', fill: '#5191FF'},
    {stroke: '#328C00', fill: '#40B300'},
    {stroke: '#EE9600', fill: '#FFB435'},
    {stroke: '#0058ED', fill: '#5191FF'},
    {stroke: '#328C00', fill: '#40B300'},
    {stroke: '#EE9600', fill: '#FFB435'},
    {stroke: '#0058ED', fill: '#5191FF'},  // Gráficos para ROE
    {stroke: '#328C00', fill: '#40B300'},
    {stroke: '#EE9600', fill: '#FFB435'},
    {stroke: '#0058ED', fill: '#5191FF'},  // Gráficos para Dívida Líquida
    {stroke: '#328C00', fill: '#40B300'},
    {stroke: '#EE9600', fill: '#FFB435'}
];


//alts
function GeraGrafico(chart, BoxEmpresaId, i) {
    var selectSegmento = document.getElementById('segmentos');
    var selectPorte = document.getElementById('porte');
    var selectRegiao = document.getElementById('regiao');
    var selectUF = document.getElementById('uf');

    var segmento = selectSegmento.options[selectSegmento.selectedIndex].text;
    var porte = selectPorte.options[selectPorte.selectedIndex].text;
    var regiao = selectRegiao.options[selectRegiao.selectedIndex].text;
    var uf = selectUF.options[selectUF.selectedIndex].text;

    var empresasFilho = banco.filter(x => {
        var matchSegmento = segmento === "Selecione um segmento" || x.Segmento === segmento;
        var matchPorte = porte === "Todos os Portes" || x.Porte === porte;
        var matchRegiao = regiao === "Todas as Regiões" || x.Região === regiao;
        var matchUF = uf === "Todas as UFs" || x.UF === uf;

        return matchSegmento && matchPorte && matchRegiao && matchUF;
    });

  var dpEmpresa = document.getElementById(BoxEmpresaId);
  var vEmpresa = dpEmpresa.options[dpEmpresa.selectedIndex].text;
  var EmpresaList = empresasFilho.filter(x => vEmpresa.includes(x.Empresa));
  EmpresaList = EmpresaList.sort((a, b) => a.Ano - b.Ano);

  criarGraficos(EmpresaList, vEmpresa, i, ALAVANCAGEM);
  criarGraficos(EmpresaList, vEmpresa, i + 3, LIQUIDEZ_CORRENTE);
  criarGraficos(EmpresaList, vEmpresa, i + 6, MARTEM_OPERACIONAL);
  criarGraficos(EmpresaList, vEmpresa, i + 9, MARGEM_LIQUIDA);
  criarGraficos(EmpresaList, vEmpresa, i + 12, EBITDA);
  criarGraficos(EmpresaList, vEmpresa, i + 15, RECEITA_LIQUIDA);
  criarGraficos(EmpresaList, vEmpresa, i + 18, CUSTOS);
  criarGraficos(EmpresaList, vEmpresa, i + 21, LUCRO_LIQUIDO);
  criarGraficos(EmpresaList, vEmpresa, i + 24, ROE);
  criarGraficos(EmpresaList, vEmpresa, i + 27, DIVIDA_LIQUIDA);
}
//Inutil
function drawChartCombo(valor) {

    var dpSegmentos = document.getElementById('segmentos');
    var vSegmentos = dpSegmentos.options[dpSegmentos.selectedIndex].text;

    var segmento = banco.filter(x=>x.Segmento == vSegmentos);

    var empresas = segmento.filter(x=> EmpresasArray.includes(x.Empresa));


    //console.log(empresas)

    //limpar div
    jQuery('#chart_div_As').html('');

    EmpresasArray.forEach((y, i) => {

        criarGraficoAlavancagem(empresas, y, i);

    });    


  }
function criarGraficos(empresas, nome, indice, colname) {
    var chartBuild = [];
    var Header = ['Anos', nome, { role: 'style' }];
    chartBuild.push(Header);

    var empresaAux = empresas.filter(x => nome.includes(x.Empresa)).sort((a, b) => a.Ano - b.Ano);

    for (let i = 0; i < empresaAux.length; i++) {
        var temp = [];
        temp.push(String(empresaAux[i].Ano));
        var valueToReplace = empresaAux[i][colname];
        if (valueToReplace != null) {
            temp.push(parseFloat(valueToReplace.toString().replace(',', '.'))); // Converter para float
        } else {
            temp.push(0); // Ou outro valor padrão
        }
        temp.push('stroke-color: ' + colorChart[indice - 1]['stroke'] + '; stroke-width: 1; fill-color: ' + colorChart[indice - 1].fill + '');
        chartBuild.push(temp);
    }

    var data = new google.visualization.arrayToDataTable(chartBuild);
    var view = new google.visualization.DataView(data);
    view.setColumns([0, 1, { calc: "stringify", sourceColumn: 1, type: "string", role: "annotation" }, 2]);

    var options = {
        width: 'auto',
        height: 100,
        seriesType: 'bars',
        bar: { groupWidth: "75%" },
        series: { 1: { type: 'line' } },
        vAxis: { gridlines: { color: 'transparent' }, textPosition: 'none' },
        legend: { position: 'none' },
        backgroundColor: 'transparent',
    };

    var chart = new google.visualization.ColumnChart(document.getElementById('indice' + indice));

    if (colname != LIQUIDEZ_CORRENTE && colname != EBITDA && colname != RECEITA_LIQUIDA && colname != CUSTOS && colname != LUCRO_LIQUIDO && colname != DIVIDA_LIQUIDA) {

        var formatter = new google.visualization.NumberFormat({
            decimalSymbol: ',',
            groupingSymbol: '.',
            negativeColor: 'red',
            negativeParens: true,
            fractionDigits: 1,
            suffix: '%'
        });
        formatter.format(data, 1);
    } else {
        var formatter = new google.visualization.NumberFormat({
            decimalSymbol: ',',
            groupingSymbol: '.',
            negativeColor: 'red',
            negativeParens: true,
            fractionDigits: 2
        });
        formatter.format(data, 1);
    }

    chart.draw(view, options);
}

//Remover
function criarGraficosCliente(anos, dadosChart, indice){

    var chartBuild=[];
    var Header= ['Anos', 'Valor', { role: 'style' }];

    chartBuild.push(Header);

    console.log(dadosChart);

    for (var i = 0; i < anos.length; i++) {

        var temp=[]; 

        temp.push(String(anos[i]));

        temp.push(parseFloat(String(dadosChart[i]).replace(',','.')));    

        temp.push('stroke-color: #FFC600; stroke-width: 1; fill-color: #FFC600');

        chartBuild.push(temp);

    }       

    //console.log(chartBuild);

var data = new google.visualization.arrayToDataTable(chartBuild);

var view = new google.visualization.DataView(data);
  view.setColumns([0, 1,
                   { calc: "stringify",
                     sourceColumn: 1,
                     type: "string",
                     role: "annotation" },
                   2]);

var options = {
    width: 'auto',
    height: 100,        
    seriesType: 'bars',
    bar: {groupWidth: "75%"},
    series: {1: {type: 'line'}},
    vAxis: { gridlines: { color: 'transparent' }, textPosition: 'none' },
    legend: {position: 'none'},
    backgroundColor: 'transparent',
};

var chart = new google.visualization.ColumnChart(document.getElementById('cliente'+indice));


if(indice != 2  && indice != 5   && indice != 6   && indice != 7   && indice != 8){

    var formatter = new google.visualization.NumberFormat({
        decimalSymbol: ',',
        groupingSymbol: '.',
        negativeColor: 'red',
        negativeParens: true,
        fractionDigits: 1,
        suffix: '%'
        });

        formatter.format(data, 1);

}    
else{
    var formatter = new google.visualization.NumberFormat({
        decimalSymbol: ',',
        groupingSymbol: '.',
        negativeColor: 'red',
        negativeParens: true,
        fractionDigits: 0
        });

        formatter.format(data, 1);
}   

chart.draw(view, options);

}


  function drawChartMargemOperacional() {
    var data = google.visualization.arrayToDataTable([
        ["Element", "valor", { role: "style" } ],
        ["2019", 6585478, 'stroke-color: #D2691E; stroke-width: 1; fill-color: #A52A2A'],
        ["2020", 7004141, 'stroke-color: #D2691E; stroke-width: 1; fill-color: #A52A2A'],
        ["2021", 7407023, 'stroke-color: #D2691E; stroke-width: 1; fill-color: #A52A2A'],
        ["2022", 7447858, 'stroke-color: #D2691E; stroke-width: 1; fill-color: #A52A2A'],
        ["2023", 7875241, 'stroke-color: #D2691E; stroke-width: 1; fill-color: #A52A2A'], //Observar funcionamento
    ]);

      

    var view = new google.visualization.DataView(data);
    view.setColumns([0, 1,
                    { calc: "stringify",
                        sourceColumn: 1,
                        type: "string",
                        role: "annotation" },
                    2]);

    var options = {
        title: "Selecione um segmento para gerar o gráfico!",
        width: 'auto',
        height: 400,
        bar: {groupWidth: "25%"},
        // legend: { position: "none" },
        seriesType: 'bars',
        series: {1: {type: 'line'}}
    };
    var chart = new google.visualization.ComboChart(document.getElementById("chart_div"));

    var formatter = new google.visualization.NumberFormat({
        decimalSymbol: ',',
        groupingSymbol: '.',
        negativeColor: 'red',
        negativeParens: true,
        prefix: 'R$ '
      });
      formatter.format(data, 1);

    chart.draw(data, options);

  }

  /* ------------------ Fim Geração Chart -------------------------*/

  /* ------------------ Fim Eventos Chart -------------------------*/