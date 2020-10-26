const express = require('express')
const cors = require('cors')

const axios = require('axios')

const app = express()

app.use(cors(
  // {
  //   origin: 'https://www.sunsetweb.com.br'
  // }
))

app.options('*', cors())

var config = {
  url: function (nomeLoteria) {
    var token = ''
    switch (nomeLoteria) {
      case 'megasena':
        token = '04_Sj9CPykssy0xPLMnMz0vMAfGjzOLNDH0MPAzcDbwMPI0sDBxNXAOMwrzCjA0sjIEKIoEKnN0dPUzMfQwMDEwsjAw8XZw8XMwtfQ0MPM2I02-AAzgaENIfrh-FqsQ9wNnUwNHfxcnSwBgIDUyhCvA5EawAjxsKckMjDDI9FQE-F4ca/dl5/d5/L2dBISEvZ0FBIS9nQSEh/pw/Z7_HGK818G0KO6H80AU71KG7J0072'
        break
      case 'quina':
        token = 'jc69DoIwAATgZ_EJepS2wFgoaUswsojYxXQyTfgbjM9vNS4Oordd8l1yxJGBuNnfw9XfwjL78dmduIikhYFGA0tzSFZ3tG_6FCmP4BxBpaVhWQuA5RRWlUZlxR6w4r89vkTi1_5E3CfRXcUhD6osEAHA32Dr4gtsfFin44Bgdw9WWSwj/dl5/d5/L2dBISEvZ0FBIS9nQSEh/pw/Z7_61L0H0G0J0VSC0AC4GLFAD20G6'
        break
      case 'lotofacil':
        token = '04_Sj9CPykssy0xPLMnMz0vMAfGjzOLNDH0MPAzcDbz8vTxNDRy9_Y2NQ13CDA0sTIEKIoEKnN0dPUzMfQwMDEwsjAw8XZw8XMwtfQ0MPM2I02-AAzgaENIfrh-FqsQ9wBmoxN_FydLAGAgNTKEK8DkRrACPGwpyQyMMMj0VAcySpRM!/dl5/d5/L2dBISEvZ0FBIS9nQSEh/pw/Z7_61L0H0G0J0VSC0AC4GLFAD2003'
        break
      case 'lotomania':
        token = '04_Sj9CPykssy0xPLMnMz0vMAfGjzOLNDH0MPAzcDbz8vTxNDRy9_Y2NQ13CDA38jYEKIoEKnN0dPUzMfQwMDEwsjAw8XZw8XMwtfQ0MPM2I02-AAzgaENIfrh-FqsQ9wBmoxN_FydLAGAgNTKEK8DkRrACPGwpyQyMMMj0VAajYsZo!/dl5/d5/L2dBISEvZ0FBIS9nQSEh/pw/Z7_61L0H0G0JGJVA0AKLR5T3K00V0'
        break
      case 'timemania':
        token = '04_Sj9CPykssy0xPLMnMz0vMAfGjzOLNDH0MPAzcDbz8vTxNDRy9_Y2NQ13CDA1MzIEKIoEKnN0dPUzMfQwMDEwsjAw8XZw8XMwtfQ0MPM2I02-AAzgaENIfrh-FqsQ9wBmoxN_FydLAGAgNTKEK8DkRrACPGwpyQyMMMj0VASrq9qk!/dl5/d5/L2dBISEvZ0FBIS9nQSEh/pw/Z7_61L0H0G0JGJVA0AKLR5T3K00M4'
        break
      case 'duplasena':
        token = '04_Sj9CPykssy0xPLMnMz0vMAfGjzOLNDH0MPAzcDbwMPI0sDBxNXAOMwrzCjA2cDIAKIoEKnN0dPUzMfQwMDEwsjAw8XZw8XMwtfQ0MPM2I02-AAzgaENIfrh-FqsQ9wNnUwNHfxcnSwBgIDUyhCvA5EawAjxsKckMjDDI9FQGgnyPS/dl5/d5/L2dBISEvZ0FBIS9nQSEh/pw/Z7_61L0H0G0J0I280A4EP2VJV30N4'
        break
      case 'federal':
        token = '04_Sj9CPykssy0xPLMnMz0vMAfGjzOLNDH0MPAzcDbz8vTxNDRy9_Y2NQ13CDA0MzIAKIoEKnN0dPUzMfQwMDEwsjAw8XZw8XMwtfQ0MPM2I02-AAzgaENIfrh-FqsQ9wBmoxN_FydLAGAgNTKEK8DkRrACPGwpyQyMMMj0VAYe29yM!/dl5/d5/L2dBISEvZ0FBIS9nQSEh/pw/Z7_HGK818G0K0L710QUKB6OH80004'
        break
    }
    return `http://loterias.caixa.gov.br/wps/portal/loterias/landing/${nomeLoteria}/!ut/p/a1/${token}/res/id=buscaResultado/c=cacheLevelPage/=/?timestampAjax=${new Date().getTime()}`
  },
  headers: {
    cookie: 'DigestTracker=AAABcU_hCgw; security=true; _ga=GA1.4.601044749.1585600231; _fbp=fb.2.1585600230831.932021635; _gid=GA1.4.1356919843.1586171223; JSESSIONID=00005vgBGXhXjZ722KhEndNhJnQ:18l92nc6m; ai_user=RBTox|2020-04-07T14:04:03.413Z; _pk_id.4.968f=330592cd157c5af5.1585600231.12.1586344201.1586344201.'
  }
}

var nomesLoterias = ['mega-sena', 'quina']

// function formatClass (className) {
//   var classNameArray = className.split('-')
//   var classNameNew = []
//   for (const className of classNameArray) {
//     classNameNew.push(className.charAt(0).toUpperCase() + className.slice(1))
//   }

//   return classNameNew.join('')
// }

function alterarDados (nomeLoteria, dados) {
  var resultado, ganhadores, concurso, dataStr, valor, sorteioAcumulado
  if (dados.resultadoOrdenado) {
    resultado = dados.resultadoOrdenado.split('-')
  } else if (dados.resultado) {
    resultado = dados.resultado.split('-')
  } else if (dados.resultadoOrdenadoSorteio1 || dados.resultadoOrdenadoSorteio2) {
    resultado = [dados.resultadoOrdenadoSorteio1.split('-'), dados.resultadoOrdenadoSorteio2.split('-')]
  } else {
    resultado = dados.resultado
  }

  listaGanhadores = dados.listaRateioPremio[0]

  ganhadores = parseInt(dados.ganhadores || dados.qt_ganhador_faixa1 || dados.qtGanhadoresFaixa1 || dados.qt_GANHADOR_FAIXA_1 || dados.ganhadores_sena1 || dados.numeroDeGanhadores)

  concurso = dados.concurso || dados.nu_concurso || dados.nu_CONCURSO

  dataStr = dados.dataStr || dados.dt_apuracaoStr || dados.dt_APURACAOStr || dados.data

  valor = dados.valor_acumulado || dados.vrAcumulado || dados.valor || dados.vr_rateio_faixa1 || dados.vrRateioFaixa1 || dados.vr_ACUMULADO_FAIXA_1 || dados.vr_RATEIO_FAIXA_1 || dados.valor_sena1 || dados.valor_acumulado_sena1 || dados.vr_acumulado_especial || dados.valorEstimadoProximoConcurso

  if (dados.valorEstimadoProximoConcurso) {
    valor = typeof (dados.valorEstimadoProximoConcurso) === 'string' ? parseFloat(dados.valorEstimadoProximoConcurso.replace(/\./g, '').replace(',', '.')) : dados.valorEstimadoProximoConcurso
  }

  sorteioAcumulado = dados.sorteioAcumulado || dados.acumulado

  return { nomeLoteria: nomeLoteria.replace('_', ' '), ...dados, sorteioAcumulado, resultado, ganhadores, concurso, dataStr, valor, listaGanhadores }
}

async function todos () {
  var loterias = []
  for (const nomeLoteria of nomesLoterias) {
    try {
      const { data } = await axios.get(config.url(nomeLoteria.replace('-', '')), { headers: config.headers })
      const newData = alterarDados(nomeLoteria, data)
      loterias.push(newData)
    } catch (err) {
      throw new Error('Erro ao buscar informações')
    }
  }
  return loterias
}

app.get('/mega_sena', CaixaController)

app.get('/quina', CaixaController)

app.get('/lotofacil', CaixaController)

app.get('/lotomania', CaixaController)

app.get('/timemania', CaixaController)

app.get('/dupla_sena', CaixaController)

app.get('/federal', CaixaController)

app.get('/todos', async (req, res) => {
  try {
    const loterias = await todos()
    return res.json(loterias)
  } catch (err) {
    return res.status(500).json('Falha ao buscar')
  }
})

app.get('/teste', async (req, res) => {
  try {
    const response = await axios.get('https://personalvidrosecoberturas.com.br/')
    console.log(response)
  } catch (err) {
    console.error(err)
  }
  return 'oi'
})

async function CaixaController (req, res) {
  const { query: params } = req

  try {
    const nomeLoteria = req.route.path.replace('/', '')

    const { data } = await axios.get(config.url(nomeLoteria.replace('_', '')), { headers: config.headers, params })
    const newData = alterarDados(nomeLoteria, data)
    if (newData.mensagens && newData.mensagens.length) return res.status(404).json('Este concurso não existe')
    return res.json(newData)
  } catch (err) {
    console.log(err)
    return res.status(500).json('Falha ao buscar')
  }
}

app.listen(process.env.PORT || 3000, () => console.log('servidor rodando'))
