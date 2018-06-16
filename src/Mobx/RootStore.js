import { observable, computed, action } from 'mobx'
import oneStore from './OneStore'
import twoStore from './TwoStore'

/**
 * 根store
 * OneStore OneView数据
 * TwoStore TwoStore数据
 */
class RootStore {

    constructor() {
        this.OneStore = new OneStore(oneStore,this)
        this.TwoStore = new TwoStore(twoStore,this)
    }
}
// One
class OneStore {
    @observable
    allDatas = []
    constructor(data,rootStore) {
        this.allDatas = data
        this.rootStore = rootStore
    }
}

// Two
class TwoStore {
    @observable
    allDatas = {}
    constructor(data,rootStore) {
        this.allDatas = data
        this.rootStore = rootStore
    }
}


export default new RootStore()