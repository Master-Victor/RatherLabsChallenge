import { Button } from 'antd'
import React from 'react'
import { store } from '../store/store'
import { types, getSnapshot } from "mobx-state-tree";

const test = () => {
  console.log(getSnapshot(store))
  return (
    <div>
        <Button type='primary' >test ant desing</Button>
    </div>
  )
}

export default test