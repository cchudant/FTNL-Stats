const fs = require('fs')
const { promisify } = require('util')

const fsReadFile = promisify(fs.readFile)
const fsWriteFile = promisify(fs.writeFile)

void async function() {
  let data = JSON.parse(await fsReadFile('data_all_messages.json'))

  data = data.filter(({ author: { id }}) => id === '370665722780712960') //Filter messages sent by FTNL

  data = data.map(({
    id,
    createdTimestamp,
    embed: { title, type, description },
    content,
    author: { id: aid, username, tag }
  }) => {
    let res
    
    function handle(msg, regex, fn) {
      const test = msg && regex.exec(msg)
      if (test)
        res = fn(test)
    }

    //text join
    handle(
      content,
      /^FTNL join guild (.+). la Guild a (\d+) membres, son créateur est : <@(\d+)>$/,
      ([message, name, members, creator]) => ({
        action: "+",
        name,
        members: +members,
        creator,
        date: createdTimestamp,
        message
      })
    )
    
    //text leave
    handle(
      content,
      /^FTNL leave guild (.+), son créateur est : <@(\d+)>$/,
      ([message, name, creator]) => ({
        action: "-",
        name,
        creator,
        date: createdTimestamp,
        message
      })
    )
    
    //embed join
    handle(
      description,
      /^(.+) Viens d'ajouter FTNL a sa liste de bot !\nLa Guild a (\d+) membres\. \nSon créateur est : <@(\d+)> \((.+)\)$/,
      ([message, name, members, creator, creatorTag]) => ({
        action: "+",
        name,
        members: +members,
        creator,
        creatorTag,
        date: createdTimestamp,
        message
      })
    )
    
    //embed leave
    handle(
      description,
      /^(.+) Viens de retirer FTNL de sa liste de bot\.\.\.\nLa Guild a (\d+) membres\. \nSon créateur est : <@(\d+)> \((.+)\)$/,
      ([message, name, members, creator, creatorTag]) => ({
        action: "-",
        name,
        members: +members,
        creator,
        creatorTag,
        date: createdTimestamp,
        message
      })
    )
    
    //embed join 2
    handle(
      description,
      /^(.+) Viens d'ajouter FTNL a sa liste de bot !\nLa Guild a (\d+) membres\. \nSon créateur est : <@(\d+)> \((.+)$/,
      ([message, name, members, creator, creatorTag]) => ({
        action: "+",
        name,
        members: +members,
        creator,
        creatorTag,
        date: createdTimestamp,
        message
      })
    )
    
    //embed leave 2
    handle(
      description,
      /^(.+) Viens de retirer FTNL de sa liste de bot\.\.\.\nLa Guild a (\d+) membres\. \nSon créateur est : <@(\d+)> \((.+)$/,
      ([message, name, members, creator, creatorTag]) => ({
        action: "-",
        name,
        members: +members,
        creator,
        creatorTag,
        date: createdTimestamp,
        message
      })
    )

    if (!res)
      console.error('Cannot understand', {
        id,
        createdTimestamp,
        embeds: [{ title, type, description }],
        content,
        author: { id: aid, username, tag }
      })

    return res
  })

  await fsWriteFile('data_extr_messages.json', JSON.stringify(data, null, 2))
}()