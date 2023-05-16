const WebSocket = require('ws')

const wss = new WebSocket.Server({ port: 2333 })

// 用于保存所有连接的 WebSocket 实例和对应的标识符
const clients = new Map()

wss.on('connection', function connection (ws) {
  console.log('WebSocket连接已建立')

  // 为当前连接分配一个唯一的标识符
  const clientId = generateClientId()

  // 将 WebSocket 实例和标识符保存到 clients Map 中
  clients.set(ws, clientId)

  // 发送标识符给客户端
  ws.send(JSON.stringify({ clientId }))

  ws.on('message', function incoming (message) {
    // 将消息数据转换为字符串
    const messageString = message.toString()

    try {
      // 解析 JSON 字符串为对象
      const receivedMessage = JSON.parse(messageString)

      // 在这里处理接收到的消息，并根据需要更新UI或执行其他操作
      console.log('Received message:', receivedMessage, 1)

      if (receivedMessage.type === 'image' && receivedMessage.content) {
        // 处理接收到的图片数据
        const imageData = receivedMessage.content
        // TODO: 在这里执行处理图片的操作，比如保存到文件或进行其他处理
        console.log('Received image data:', imageData, 2)
        const replyIMG = {
          content: imageData,
          isMine: false,
          type: "image"
        }
        // 将图片消息发送给所有客户端
        wss.clients.forEach(client => {
          if (client !== ws && client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(replyIMG))
          }
        })
      } else {
        // 非图片类型的消息
        const replyMessage = {
          content: receivedMessage.content,
          isMine: false,
          type: "text"
        }

        // 将回复消息发送给所有客户端
        wss.clients.forEach(client => {
          if (client !== ws && client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(replyMessage))
          }
        })
      }
    } catch (error) {
      console.error('解析消息失败:', error)
    }
  })

  ws.on('close', function close () {
    console.log('WebSocket连接已关闭')

    // 从 clients Map 中移除断开连接的 WebSocket 实例
    clients.delete(ws)
  })

  ws.on('error', function error (err) {
    console.error('WebSocket发生错误:', err)
  })
})

console.log('WebSocket服务器已启动')

// 生成唯一标识符的函数（示例）
function generateClientId () {
  return 'client-' + Date.now()
}
