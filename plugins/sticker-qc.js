//Correción de errores

import { sticker } from '../lib/sticker.js'
import axios from 'axios'

let handler = async (m, { conn, args }) => {
let who
if (m.isGroup) who = m.quoted ? m.quoted.sender : m.mentionedJid[0] ? m.mentionedJid[0] : m.sender
	else who = m.quoted ? m.quoted.sender : m.chat
let text
    if (args.length >= 1) {
        text = args.slice(0).join(" ")
    } else if (m.quoted && m.quoted.text) {
        text = m.quoted.text
    } else throw "> > ⓘ 𝙞𝙣𝙜𝙧𝙚𝙨𝙚 𝙪𝙣 𝙩𝙚𝙭𝙩𝙤 𝙥𝙖𝙧𝙖 𝙪𝙨𝙖𝙧 𝙚𝙨𝙩𝙚 𝙘𝙤𝙢𝙖𝙣𝙙𝙤."
   if (!text) return m.reply('> ⓘ 𝙏𝙚𝙭𝙩𝙤 𝙛𝙖𝙡𝙩𝙖𝙣𝙩𝙚...')
    await conn.sendMessage(m.chat, { react: { text: `👾`, key: m.key }});
    const mentionRegex = new RegExp(`@${who.split('@')[0].replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\s*`, 'g');
   if (text.length > 100) return m.reply('> 𝙨𝙤𝙡𝙤 𝙨𝙚 𝙖𝙙𝙢𝙞𝙩𝙚 100 𝙘𝙖𝙧𝙖𝙘𝙩𝙚𝙧𝙚𝙨.')
    let username = conn.getName(who)
    let pp = await conn.profilePictureUrl(who, 'image').catch(_ => 'https://telegra.ph/file/320b066dc81928b782c7b.png') // Imagen predeterminada (cambiar si es necesario)

   const obj = {
      "type": "quote",
      "format": "png",
      "backgroundColor": "#DCF8C6",
      "width": 512,
      "height": 768,
      "scale": 2,
      "messages": [{
         "entities": [],
         "avatar": true,
         "from": {
            "id": 1,
            "name": username,
            "photo": {
               "url": pp
            }
         },
         "text": text,
         "replyMessage": {}
      }]
   }
   const json = await axios.post('https://qc.botcahx.eu.org/generate', obj, {
      headers: {
         'Content-Type': 'application/json'
      }
   })
   const buffer = Buffer.from(json.data.result.image, 'base64')
   let stiker = await sticker(buffer, false, global.packname, global.author)
    if (stiker) return conn.sendFile(m.chat, stiker, 'Quotly.webp', '', m)
}

handler.help = ['qc'].map(v => v + ' <text & reply>')
handler.tags = ['sticker']
handler.command = /^(qc|quotely)$/i
handler.premium = false 
handler.limit = true

export default handler 
