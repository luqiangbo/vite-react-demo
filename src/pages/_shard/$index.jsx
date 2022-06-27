import { useState } from 'react'
import { Button, Upload } from 'antd'
import SparkMD5 from 'spark-md5'
import axios from 'axios'

import { to } from '@/utils/request'
import './index.less'

function Index() {
  const [fileList, setFileList] = useState([])

  const beforeUpload = async (file) => {
    console.log('beforeUpload', file)
    setFileList([file])
    // 第一步 获取md5
    const [errMd5, resMd5] = await to(md5File(file))
    // 第二步 校验文件的md5
    // const [errHas, resHas] = await fetchHasFile({ name: file.name, md5: res })
    // if(resHas){
    //   console.log('文件已存在')
    // }

    // 第三步 检查并上传md5
    checkAndUploadChunk({ file, resMd5, list: [] })

    return false
  }

  const propsUpload = {
    onRemove: (file) => {
      const index = fileList.indexOf(file)
      const newFileList = fileList.slice()
      newFileList.splice(index, 1)
      setFileList(newFileList)
    },
    beforeUpload,
    fileList,
  }

  // 修改时间+文件名名称+最后修改时间-->md5
  const md5File = (file) => {
    return new Promise((resolve, reject) => {
      let blobSlice = File.prototype.slice || File.prototype.mozSlice || File.prototype.webkitSlice
      let chunks = 10
      let chunkSize = file.size / chunks
      let currentChunk = 0
      let spark = new SparkMD5.ArrayBuffer()
      let fileReader = new FileReader()

      fileReader.onload = function (e) {
        spark.append(e.target.result)
        currentChunk++
        if (currentChunk < chunks) {
          loadNext()
        } else {
          let result = spark.end()
          resolve(result)
        }
      }

      fileReader.onerror = function (err) {
        console.warn('oops, something went wrong.')
        reject(err)
      }

      const loadNext = () => {
        let start = currentChunk * chunkSize
        let end = start + chunkSize >= file.size ? file.size : start + chunkSize
        fileReader.readAsArrayBuffer(blobSlice.call(file, start, end))
      }
      loadNext()
    })
  }

  // 分片上传
  const checkAndUploadChunk = ({ file, resMd5, list }) => {
    return new Promise((resolve, reject) => {
      let fileSize = file.size
      let chunkSize = 1024 * 1024 * 2
      let chunks = Math.ceil(fileSize / chunkSize)
      let hasUploaded = list.length
      for (let i = 0; i < chunks; i++) {
        let exit = list.indexOf(i + '') > -1
        if (!exit) {
          fetchUpload({ i, resMd5, chunks, file, chunkSize })
        }
      }
      console.log({ file, hasUploaded, resMd5, list, chunks })
    })
  }

  const fetchUpload = async ({ i, resMd5, chunks, chunkSize, file }) => {
    return new Promise((resolve, reject) => {
      let start = i * chunkSize
      let end = (i + 1) * chunkSize >= file.size ? file.size : (i + 1) * chunkSize
      let form = new FormData()
      let data = file.slice(start, end)
      // form.append('data', data)
      form.append('total', chunks)
      form.append('index', i)
      form.append('md5', resMd5)
      axios({
        method: 'post',
        url: '/user/upload',
        data,
      }).then((res) => {
        console.log('res', res)
      })
    })
  }

  return (
    <div className='page-shard'>
      <Upload {...propsUpload}>
        <Button>选择文件</Button>
      </Upload>
      <div>{setFileList.length}</div>
    </div>
  )
}

export default Index
