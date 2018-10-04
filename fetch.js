const { Client } = require('discord.js')
const fs = require('fs')
const { promisify } = require('util')

const fsWriteFile = promisify(fs.writeFile)

const client = new Client()

client.login(process.env.DISCORD_TOKEN)
  .then(async () => {
    console.log('Connected')
    const channel = client.guilds.get('408947376041230346').channels.get('410937475683450880')

    let allMessages = []  
    let messages = []
    do {
      messages = (await channel.fetchMessages({ limit: 100, before: messages.length && messages[messages.length - 1].id })).array()

      allMessages = allMessages.concat(messages)
      console.log(`Fetched ${allMessages.length} messages`)
    } while (messages.length)

    allMessages = allMessages.map(({ embeds, ...fields }) => ({ embeds: embeds.length ? embeds : [{}], ...fields }))
    allMessages = allMessages.map(({
      id,
      createdTimestamp,
      embeds: [{ title, type, description }],
      content,
      author: { id: aid, username, tag }
    }) => ({
      id,
      createdTimestamp,
      embed: { title, type, description },
      content,
      author: { id: aid, username, tag }
    }))

    await fsWriteFile('data_all_messages.json', JSON.stringify(allMessages, null, 2))
    console.log('All done! :)')
  })
  .catch(console.error)
  .then(() => process.exit(0))