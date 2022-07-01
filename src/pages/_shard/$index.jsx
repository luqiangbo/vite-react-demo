import { useEffect } from 'react'
import { useSetState } from 'ahooks'
import { Button, Upload } from 'antd'
import SparkMD5 from 'spark-md5'
import axios from 'axios'

import { to } from '@/utils/request'
import './index.less'

function Index() {
  const [state, setState] = useSetState({
    fileList: [],
    fileMd5: '',
    fileName: '',
  })

  const beforeUpload = async (file) => {
    console.log('beforeUpload', file)
    const fileName = file.name
    setState({
      fileList: [file],
      fileName,
    })
    // 第一步 获取md5
    const [errMd5, resMd5] = await to(md5File(file))
    console.log('md5', { resMd5 })
    setState({
      fileMd5: resMd5,
    })
    // 第二步 校验文件的md5
    // const [errHas, resHas] = await fetchHasFile({ name: file.name, md5: res })
    // if(resHas){
    //   console.log('文件已存在')
    // }

    // 第三步 检查并上传md5
    const [errChunk, resChunk] = await to(checkAndUploadChunk({ file, resMd5, list: [] }))
    console.log({ errChunk, resChunk })
    if (errChunk) {
      console.log('上传失败')
    }
    setTimeout(() => {
      fetchMegerChunk(resMd5, fileName)
    }, 500)

    return false
  }

  const propsUpload = {
    onRemove: (file) => {
      const index = state.fileList.indexOf(file)
      const newFileList = state.fileList.slice()
      newFileList.splice(index, 1)
      setState({
        fileList: newFileList,
      })
    },
    beforeUpload,
    fileList: state.fileList,
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
      let chunkSize = 1024 * 1024 * 1
      let chunks = Math.ceil(fileSize / chunkSize)
      let hasUploaded = list.length
      for (let i = 0; i < chunks; i++) {
        let exit = list.indexOf(i + '') > -1
        if (!exit) {
          fetchUpload({ i, resMd5, chunks, file, chunkSize })
        }
      }
      resolve(true)
    })
  }

  const fetchUpload = async ({ i, resMd5, chunks, chunkSize, file }) => {
    return new Promise((resolve, reject) => {
      let start = i * chunkSize
      let end = (i + 1) * chunkSize >= file.size ? file.size : (i + 1) * chunkSize
      let form = new FormData()
      let fileSlice = file.slice(start, end)
      form.append('file', fileSlice)
      form.append('file_hash', resMd5)
      form.append('total', chunks + '')
      form.append('index', i + '')
      const url = 'http://localhost:8080/upload_chunk'
      axios({
        url,
        method: 'post',
        data: form,
      })
        .then((res) => {
          resolve(true)
        })
        .catch((err) => {
          reject(err)
        })

      // axios.post(url, form)
      // const option = {
      //   method: 'post',
      //   mode: 'cors',
      //   headers: {},
      //   body: form,
      // }
      // fetch(url, option)
    })
  }

  const fetchMegerChunk = (hash, file_name) => {
    console.log('合并 fetchMegerChunk', { state, hash, file_name })
    let url = 'http://localhost:8080/merge_chunk'
    axios({
      url,
      method: 'get',
      params: {
        hash,
        file_name,
      },
    }).then((res) => {})
  }
  return (
    <div className='page-shard'>
      <Upload {...propsUpload}>
        <Button>选择文件</Button>
      </Upload>
      <Button
        onClick={() => {
          fetchMegerChunk(state.fileMd5, state.fileName)
        }}
      >
        手动合并
      </Button>
      <div>{state.fileList.length}</div>
      <div> fileMd5 : {state.fileMd5}</div>
      <div> fileName : {state.fileName}</div>
    </div>
  )
}

export default Index
