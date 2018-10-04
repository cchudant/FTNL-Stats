//const { createObjectCsvWriter } = require('csv-writer')
const fs = require('fs')
const { promisify } = require('util')

const fsReadFile = promisify(fs.readFile)
const fsWriteFile = promisify(fs.writeFile)

/*const csvWriter = createObjectCsvWriter({
    path: 'data_preprocessed.csv',
    header: [
        { id: 'date', title: 'DATE' },
        { id: 'servers', title: 'SERVERS' }
    ]
})*/

void async function() {
  let data = JSON.parse(await fsReadFile('data_extr_messages.json'))

  data.reverse()

  let cumSum = 0
  data = data.map(({ date, action }) => {
    cumSum += action == '+' || -1
    return { date: new Date(date), servers: cumSum }
  })

  //await csvWriter.writeRecords(data)
  await fsWriteFile('data_preprocessed.json', JSON.stringify(data, null, 2))
}()