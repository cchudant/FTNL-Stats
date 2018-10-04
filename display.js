const plotly = require('plotly')(process.env.PLOTLY_API_USER, process.env.PLOTLY_API_KEY)

void async function() {
  const raw = require('./data_preprocessed.json')
  
  const x = raw.map(({ date }) => date)
  const y = raw.map(({ servers }) => servers)

  const data = [{ x, y, type: 'scatter' }]
  const layout = { filename: 'ftnl_servers', fileopt: 'overwrite' }
  plotly.plot(data, layout, (err, msg) => {
    err && console.error(err)
    console.log(msg)
  })
}()