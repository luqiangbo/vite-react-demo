import { useState, useEffect } from 'react'
import { Button } from 'antd'
import * as mqtt from 'mqtt/dist/mqtt.min'

import './index.less'

function App() {
  const [client, setClient] = useState(null)
  const mqttConnect = (host, mqttOption) => {
    setClient(mqtt.connect(host, mqttOption))
  }
  useEffect(() => {
    if (client) {
      console.log(client)
      client.on('connect', () => {
        console.log('1-connect')
      })
      client.on('error', (err) => {
        console.error('2-error: ', err)
        client.end()
      })
      client.on('reconnect', () => {
        console.log('3-reconnect')
      })
      client.on('message', (topic, message) => {
        const payload = { topic, message: message.toString() }
        console.log('4-message', { payload })
      })
    }
  }, [client])

  // 订阅
  const mqttSub = (data) => {
    if (client) {
      client.subscribe('res/123', data, (error) => {
        if (error) {
          console.log('订阅失败 Subscribe to topics error', error)
          return
        }
        console.log('订阅成功')
      })
    }
  }

  // 发布
  const mqttPublish = (context) => {
    if (client) {
      client.publish('req/123', context, (error) => {
        if (error) {
          console.log('Publish error: ', error)
        }
        console.log('发布成功')
      })
    }
  }

  return (
    <div className='c-mqtt'>
      <Button
        type='primary'
        onClick={() => {
          mqttConnect('ws://cooog.com:8083/mqtt', {
            rejectUnauthorized: false,
          })
        }}
      >
        开始
      </Button>
      <Button
        type='primary'
        onClick={() => {
          mqttSub({
            name: '小明',
          })
        }}
      >
        订阅
      </Button>

      <Button
        type='primary'
        onClick={() => {
          mqttPublish('小明啊')
        }}
      >
        发布
      </Button>
    </div>
  )
}

export default App
